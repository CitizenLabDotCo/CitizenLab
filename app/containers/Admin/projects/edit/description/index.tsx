// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import { get, set, isEmpty } from 'lodash';

import { EditorState } from 'draft-js';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// Services
import { projectBySlugStream, updateProject,  IProjectData, IUpdatedProjectProperties } from 'services/projects';
import { localeStream } from 'services/locale';

// Utils
import getSubmitState from 'utils/getSubmitState';
import { getEditorStateFromHtmlString, getHtmlStringFromEditorState } from 'utils/editorTools';

// Components
import Label from 'components/UI/Label';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import Error from 'components/UI/Error';
import Editor from 'components/UI/Editor';
import { Section, SectionField } from 'components/admin/Section';
import TextArea from 'components/UI/TextArea';

// Typing
import { API, Locale } from 'typings';

interface Props {
  params: {
    slug: string | null;
  };
}

interface State {
  loading: boolean;
  data: IProjectData | { id: null, attributes: {}, relationships: { areas: {data} }};
  diff: IUpdatedProjectProperties;
  errors: {
    [fieldName: string]: API.Error[]
  };
  saved: boolean;
  locale: Locale;
  editorState: EditorState;
}


class ProjectDescription extends React.Component<Props, State> {
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);

    this.state = {
      loading: false,
      saved: false,
      data: { id: null, attributes: {}, relationships: { areas: { data: [] } } },
      diff: {},
      errors: {},
      locale: 'en',
      editorState: EditorState.createEmpty(),
    };

    this.subscriptions = [];
  }

  componentDidMount () {
    if (this.props.params.slug) {
      const locale$ = localeStream().observable;
      const project$ = projectBySlugStream(this.props.params.slug).observable;

      this.setState({ loading: true });

      this.subscriptions.push(
        Rx.Observable.combineLatest(
          locale$,
          project$
        )
        .subscribe(([locale, project]) => {
          const { description_multiloc } = project.data.attributes;
          let editorState;

          if (description_multiloc && description_multiloc[locale] !== undefined) {
            editorState = getEditorStateFromHtmlString(description_multiloc[locale] || null);
          }

          this.setState((state) => ({
            locale,
            editorState: (editorState ? editorState : state.editorState),
            data: project.data,
            loading: false,
            diff: {},
          }));
        })
      );
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  updatePreview = (value) => {
    this.setState({ diff: { ...this.state.diff, description_preview_multiloc: { [this.state.locale]: value } } });
  }

  changeDesc = (editorState: EditorState): void => {
    const { diff, locale } = this.state;
    const htmlDescription = getHtmlStringFromEditorState(editorState);

    set(diff, `description_multiloc.${locale}`, htmlDescription);

    this.setState({
      editorState,
      diff,
    });
  }

  handleSaveErrors = (errors) => {
    this.setState({ errors: errors.json.errors });
  }

  saveProject = (event) => {
    event.preventDefault();
    const { diff, data } = this.state;

    if (!isEmpty(diff) && data.id) {
      this.setState({ loading: true, saved: true });
      updateProject(data.id, diff)
      .catch(this.handleSaveErrors)
      .then(() => {
        this.setState({ loading: false, saved: true });
      });
    }
  }

  render () {
    const { data, diff, editorState, loading, saved, errors, locale } = this.state;
    const projectAttrs = { ...data.attributes, ...diff } as IUpdatedProjectProperties;
    const submitState = getSubmitState({ errors, saved, diff });
    const previewValue = get(projectAttrs, `description_preview_multiloc.${locale}`, '');

    return (
      <form className="e2e-project-description-form" onSubmit={this.saveProject}>
        <Section>
          <SectionField>
            <Label>
              <FormattedMessage {...messages.descriptionPreviewLabel} />
            </Label>
            <TextArea
              name="meta_description"
              rows={5}
              value={previewValue}
              onChange={this.updatePreview}
              maxLength={280}
            />
            <Error fieldName="description_preview_multiloc" apiErrors={this.state.errors.description_preview_multiloc} />
          </SectionField>
          <SectionField>
            <Label htmlFor="project-description">
              <FormattedMessage {...messages.descriptionLabel} />
            </Label>
            <Editor
              id="project-description"
              placeholder=""
              value={editorState}
              error=""
              onChange={this.changeDesc}
              toolbarConfig={{
                options: ['inline', 'list', 'link', 'blockType'],
                inline: {
                  options: ['bold', 'italic'],
                },
                list: {
                  options: ['unordered', 'ordered'],
                },
                blockType: {
                  inDropdown: false,
                  options: ['Normal', 'H1'],
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                }
              }}
            />
            <Error fieldName="description_multiloc" apiErrors={this.state.errors.description_multiloc} />
          </SectionField>

          <SubmitWrapper
            loading={loading}
            status={submitState}
            messages={{
              buttonSave: messages.saveButtonLabel,
              buttonError: messages.saveErrorLabel,
              buttonSuccess: messages.saveSuccessLabel,
              messageError: messages.saveErrorMessage,
              messageSuccess: messages.saveSuccessMessage,
            }}
          />
        </Section>
      </form>
    );
  }
}

export default ProjectDescription;
