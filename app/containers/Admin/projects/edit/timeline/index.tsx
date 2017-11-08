// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import * as _ from 'lodash';

// Services
import { projectBySlugStream } from 'services/projects';
import { phasesStream, IPhaseData, deletePhase } from 'services/phases';

// Components
import { Link } from 'react-router';
import T from 'components/T';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import { List, Row, HeadRow } from 'components/admin/ResourceList';

// Utils
import unsubscribe from 'utils/unsubscribe';

// Styles
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddButton = styled(Button)`
  align-self: flex-end;
  flex-grow: 0;
`;

const OrderHeader = styled.div`
  flex: 0 0 3rem;
`;

const OrderLabel = styled.div`
  border-radius: 50%;
  color: white;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  width: 3rem;
  flex: 0 0 3rem;

  &.current {
    background: #32B67A;
  }

  &.past {
    background: #E5E5E5;
  }

  &.future {
    background: #636363;
  }
`;

const InfoCell = styled.div`
  h1 {
    font-weight: normal;
    margin-bottom: 0;
  }
`;

// Component typing
type Props = {
  intl: ReactIntl.InjectedIntl,
  params: {
    slug: string | null,
  },
};

type State = {
  phases: IPhaseData[],
  loading: boolean,
};

class AdminProjectTimelineIndex extends React.Component<Props, State> {
  subscription: Rx.Subscription;
  constructor () {
    super();

    this.state = {
      phases: [],
      loading: false,
    };
  }

  componentDidMount () {
    this.setState({ loading: true });

    if (_.isString(this.props.params.slug)) {
      this.subscription = projectBySlugStream(this.props.params.slug).observable.switchMap((project) => {
        return phasesStream(project.data.id).observable.map((phases) => (phases.data));
      }).subscribe((phases) => {
        this.setState({ phases, loading: false });
      });
    }
  }

  componentWillUnmount() {
    unsubscribe(this.subscription);
  }

  createDeleteClickHandler = (phaseId) => {
    return (event) => {
      event.preventDefault();
      if (window.confirm(this.props.intl.formatMessage(messages.deletePhaseConfirmation))) {
        deletePhase(phaseId).then((response) => {
          this.setState({ phases: _.reject(this.state.phases, { id: phaseId }) });
        });
      }
    };
  }

  phaseTiming = ({ start_at, end_at }): 'past' | 'current' | 'future' => {
    const start = new Date(start_at);
    const end = new Date(end_at);
    const now = new Date();

    if (end < now) {
      return 'past';
    } else if (start > now) {
      return 'future';
    } else {
      return 'current';
    }
  }

  render() {
    const { phases, loading } = this.state;
    const { intl: { formatDate }, params: { slug } } = this.props;

    return (
      <ListWrapper>
        <AddButton className="e2e-add-phase-button" style="cl-blue" circularCorners={false} linkTo={`/admin/projects/${slug}/timeline/new`}>
          <FormattedMessage {...messages.addPhaseButton} />
        </AddButton>

        {!loading && phases.length > 0 &&
          <List className="e2e-phases-table">
            <HeadRow>
              <OrderHeader><FormattedMessage {...messages.orderColumnTitle} /></OrderHeader>
              <div className="expand"><FormattedMessage {...messages.nameColumnTitle} /></div>
            </HeadRow>
              {phases.map((phase, index) => (
                <Row className="e2e-phase-line" id={`e2e-phase_${phase.id}`} key={phase.id}>
                  <OrderLabel className={this.phaseTiming({ start_at: phase.attributes.start_at, end_at: phase.attributes.end_at })}>
                    {index + 1}
                  </OrderLabel>
                <InfoCell className="expand">
                  <h1><T value={phase.attributes.title_multiloc} /></h1>
                  <p>{formatDate(phase.attributes.start_at)} - {formatDate(phase.attributes.end_at)}</p>
                </InfoCell>
                  <Button className="e2e-delete-phase" icon="delete" style="text" onClick={this.createDeleteClickHandler(phase.id)}>
                    <FormattedMessage {...messages.deletePhaseButton} />
                  </Button>
                  <Button className="e2e-edit-phase" icon="edit" style="secondary" linkTo={`/admin/projects/${slug}/timeline/${phase.id}`}>
                    <FormattedMessage {...messages.editPhaseButton} />
                  </Button>
                </Row>
              ))}
          </List>
        }
      </ListWrapper>
    );
  }
}

export default injectIntl(AdminProjectTimelineIndex);
