// must be at the top, before other imports!
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// Libraries
import React, { PureComponent, FormEvent } from 'react';
import { Subscription, BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import moment, { Moment } from 'moment';
import { get, isEmpty } from 'lodash-es';

// Services
import { projectByIdStream, IProject } from 'services/projects';
import { phaseStream, updatePhase, addPhase, IPhase, IUpdatedPhaseProperties } from 'services/phases';
import eventEmitter from 'utils/eventEmitter';

// Utils
import getSubmitState from 'utils/getSubmitState';
import shallowCompare from 'utils/shallowCompare';

// Components
import Label from 'components/UI/Label';
import InputMultiloc from 'components/UI/InputMultiloc';
import QuillMultiloc from 'components/UI/QuillEditor/QuillMultiloc';
import Error from 'components/UI/Error';
import { DateRangePicker } from 'react-dates';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import { Section, SectionTitle, SectionField } from 'components/admin/Section';
import ParticipationContext, { IParticipationContextConfig } from '../participationContext';

// i18n
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

// Styling
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

// Typings
import { CLError, Multiloc } from 'typings';

const PhaseForm = styled.form`
  .DateRangePickerInput {
    border-radius: 5px;

    svg {
      z-index: 3;
    }

    .DateInput,
    .DateInput_input {
      color: inherit;
      font-size: ${fontSizes.base}px;
      font-weight: 400;
      background: transparent;
    }
  }

  .DateRangePicker_picker {
    z-index: 2;
  }

  .CalendarMonth_caption {
    color: inherit;
  }
`;

interface IParams {
  projectId: string | null;
  id: string | null;
}

type Props = {
  params: IParams
};

interface State {
  phase: IPhase | null;
  project: IProject | null;
  presentationMode: 'map' | 'card';
  attributeDiff: IUpdatedPhaseProperties;
  errors: { [fieldName: string]: CLError[] } | null;
  saving: boolean;
  focusedInput: 'startDate' | 'endDate' | null;
  saved: boolean;
  loaded: boolean;
}

class AdminProjectTimelineEdit extends PureComponent<Props & InjectedIntlProps, State> {
  params$: BehaviorSubject<IParams | null>;
  subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      phase: null,
      project: null,
      presentationMode: 'card',
      attributeDiff: {},
      errors: null,
      saving: false,
      focusedInput: null,
      saved: false,
      loaded: false
    };
    this.subscriptions = [];
    this.params$ = new BehaviorSubject(null);
  }

  componentDidMount() {
    const { projectId, id } = this.props.params;

    this.params$.next({ projectId, id });

    this.subscriptions = [
      this.params$.pipe(
        distinctUntilChanged(shallowCompare),
        switchMap((params: IParams) => {
          const { projectId, id } = params;
          const project$ = (projectId ? projectByIdStream(projectId).observable : of(null));
          const phase$ = (id ? phaseStream(id).observable : of(null));
          return combineLatest(project$, phase$);
        })
      ).subscribe(([project, phase]) => {
        this.setState({
          project,
          phase,
          loaded: true
        });
      })
    ];
  }

  componentDidUpdate() {
    const { projectId, id } = this.props.params;
    this.params$.next({ projectId, id });
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleTitleMultilocOnChange = (title_multiloc: Multiloc) => {
    this.setState(({ attributeDiff }) => ({
      attributeDiff: {
        ...attributeDiff,
        title_multiloc,
      }
    }));
  }

  handleEditorOnChange = (description_multiloc: Multiloc) => {
    this.setState(({ attributeDiff }) => ({
      attributeDiff: {
        ...attributeDiff,
        description_multiloc
      }
    }));
  }

  handleIdeasDisplayChange = (presentationMode: 'map' | 'card') => {
    this.setState(({ attributeDiff }) => ({
      presentationMode,
      attributeDiff: {
        ...attributeDiff,
        presentation_mode: presentationMode
      }
    }));
  }

  handleDateUpdate = ({ startDate, endDate }: { startDate: Moment, endDate: Moment }) => {
    this.setState(({ attributeDiff }) => ({
      attributeDiff: {
        ...attributeDiff,
        start_at: startDate ? startDate.format('YYYY-MM-DD') : '',
        end_at: endDate ? endDate.format('YYYY-MM-DD') : ''
      }
    }));
  }

  handleDateFocusChange = (focusedInput: 'startDate' | 'endDate') => {
    this.setState({ focusedInput });
  }

  isOutsideRange = () => {
    return false;
  }

  handleOnSubmit = async (event: FormEvent<any>) => {
    event.preventDefault();
    eventEmitter.emit('AdminProjectTimelineEdit', 'getParticipationContext', null);
  }

  getAttributeDiff = (participationContextConfig: IParticipationContextConfig) => {
    const attributeDiff: IUpdatedPhaseProperties = {
      ...this.state.attributeDiff,
      ...participationContextConfig
    };

    return attributeDiff;
  }

  handleParticipationContextOnChange = (participationContextConfig: IParticipationContextConfig) => {
    this.setState({
      attributeDiff: this.getAttributeDiff(participationContextConfig)
    });
  }

  handleParcticipationContextOnSubmit = (participationContextConfig: IParticipationContextConfig) => {
    const { phase, project } = this.state;
    const { projectId } = this.props.params;
    const attributeDiff = this.getAttributeDiff(participationContextConfig);
    this.save(projectId, project, phase, attributeDiff);
  }

  save = async (projectId: string | null, project: IProject | null, phase: IPhase | null, attributeDiff: IUpdatedPhaseProperties) => {
    if (!isEmpty(attributeDiff)) {
      try {
        let savedPhase = phase;

        if (phase) {
          savedPhase = await updatePhase(phase.data.id, { max_budget: 980 });
        } else if (project && projectId) {
          savedPhase = await addPhase(project.data.id, attributeDiff);
        }

        this.setState({
          attributeDiff: {},
          saving: false,
          saved: true,
          phase: savedPhase,
          errors: null
        });
      } catch (errors) {
        this.setState({
          errors: get(errors, 'json.errors', null),
          saving: false,
          saved: false
        });
      }
    }
  }

  render() {
    if (this.state.loaded) {
      const { formatMessage } = this.props.intl;
      const { errors, saved, phase, attributeDiff, saving } = this.state;
      const phaseAttrs = (phase ? { ...phase.data.attributes, ...attributeDiff } : { ...attributeDiff });
      const submitState = getSubmitState({ errors, saved, diff: attributeDiff });
      const startDate = (phaseAttrs.start_at ? moment(phaseAttrs.start_at) : null);
      const endDate = (phaseAttrs.end_at ? moment(phaseAttrs.end_at) : null);

      return (
        <>
          <SectionTitle>
            {phase && <FormattedMessage {...messages.editPhaseTitle} />}
            {!phase && <FormattedMessage {...messages.newPhaseTitle} />}
          </SectionTitle>

          <PhaseForm onSubmit={this.handleOnSubmit}>
            <Section>
              <SectionField>
                <InputMultiloc
                  id="title"
                  label={<FormattedMessage {...messages.titleLabel} />}
                  type="text"
                  valueMultiloc={phaseAttrs.title_multiloc}
                  onChange={this.handleTitleMultilocOnChange}
                />
                <Error apiErrors={errors && errors.title_multiloc} />
              </SectionField>

              <SectionField>
                <ParticipationContext
                  phaseId={(phase ? phase.data.id : null)}
                  onSubmit={this.handleParcticipationContextOnSubmit}
                  onChange={this.handleParticipationContextOnChange}
                />
              </SectionField>

              <SectionField>
                <Label><FormattedMessage {...messages.datesLabel} /></Label>
                <DateRangePicker
                  startDateId={'startDate'}
                  endDateId={'endDate'}
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={this.handleDateUpdate}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={this.handleDateFocusChange}
                  isOutsideRange={this.isOutsideRange}
                  firstDayOfWeek={1}
                  displayFormat="DD/MM/YYYY"
                  startDatePlaceholderText={formatMessage(messages.startDatePlaceholder)}
                  endDatePlaceholderText={formatMessage(messages.endDatePlaceholder)}
                />
                <Error apiErrors={errors && errors.start_at} />
                <Error apiErrors={errors && errors.end_at} />
              </SectionField>

              <SectionField className="fullWidth">
                <QuillMultiloc
                  id="description"
                  inAdmin
                  label={<FormattedMessage {...messages.descriptionLabel} />}
                  valueMultiloc={phaseAttrs.description_multiloc}
                  onChangeMultiloc={this.handleEditorOnChange}
                />
                <Error apiErrors={errors && errors.description_multiloc} />
              </SectionField>

              {errors && errors.project &&
                <SectionField>
                  <Error apiErrors={errors.project} />
                </SectionField>
              }
              {errors && errors.base &&
                <SectionField>
                  <Error apiErrors={errors.base} />
                </SectionField>
              }
            </Section>

            <SubmitWrapper
              loading={saving}
              status={submitState}
              messages={{
                buttonSave: messages.saveLabel,
                buttonSuccess: messages.saveSuccessLabel,
                messageError: messages.saveErrorMessage,
                messageSuccess: messages.saveSuccessMessage,
              }}
            />
          </PhaseForm>
        </>
      );
    }

    return null;
  }
}

export default injectIntl(AdminProjectTimelineEdit);
