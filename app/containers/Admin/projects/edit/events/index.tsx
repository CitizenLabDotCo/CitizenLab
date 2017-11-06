// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import * as _ from 'lodash';

// Services
import { projectBySlugStream } from 'services/projects';
import { eventsStream, IEventData, deleteEvent } from 'services/events';

// Components
import { Link } from 'react-router';
import T from 'components/T';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import { List, Row, HeadRow } from 'components/admin/ResourceList';

// Utils
import subscribedComponent from 'utils/subscriptionsDecorator';

// Styles
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddButton = styled(Button)`
  align-self: flex-end;
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
  events: IEventData[],
  loading: boolean,
};

@subscribedComponent
class AdminProjectTimelineIndex extends React.Component<Props, State> {
  subscription: Rx.Subscription;

  constructor () {
    super();
    this.state = {
      events: [],
      loading: false,
    };
  }

  componentDidMount () {
    this.setState({ loading: true });

    if (_.isString(this.props.params.slug)) {
      this.subscription = projectBySlugStream(this.props.params.slug).observable.switchMap((project) => {
        return eventsStream(project.data.id).observable.map((events) => (events.data));
      }).subscribe((events) => {
        this.setState({ events, loading: false });
      });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createDeleteClickHandler = (eventId) => {
    return (event) => {
      event.preventDefault();
      if (window.confirm(this.props.intl.formatMessage(messages.deleteConfirmationModal))) {
        deleteEvent(eventId).then((response) => {
          this.setState({ events: _.reject(this.state.events, { id: eventId }) });
        });
      }
    };
  }

  eventTiming = ({ start_at, end_at }): 'past' | 'current' | 'future' => {
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
    const { events, loading } = this.state;
    const { intl: { formatDate, formatTime }, params: { slug } } = this.props;

    return (
      <ListWrapper>
        <AddButton style="cl-blue" linkTo={`/admin/projects/${slug}/events/new`}>
          <FormattedMessage {...messages.addEventButton} />
        </AddButton>

        {!loading && events.length > 0 &&
          <List>
            <HeadRow>
              <div className="expand"><FormattedMessage {...messages.titleColumnHeader} /></div>
            </HeadRow>
            {events.map((event, index) => (
              <Row key={event.id}>
                <InfoCell className="expand">
                  <h1><T value={event.attributes.title_multiloc} /></h1>
                  <p><T value={event.attributes.location_multiloc} /></p>
                  <p>
                    {`${formatDate(event.attributes.start_at)} ${formatTime(event.attributes.start_at)}`}
                    &nbsp;-&nbsp;
                    {`${formatDate(event.attributes.end_at)} ${formatTime(event.attributes.end_at)}`}</p>
                </InfoCell>
                <Button style="text" icon="delete" onClick={this.createDeleteClickHandler(event.id)}>
                  <FormattedMessage {...messages.deleteButtonLabel} />
                </Button>
                <Button style="secondary" icon="edit" linkTo={`/admin/projects/${slug}/events/${event.id}`}>
                  <FormattedMessage {...messages.editButtonLabel} />
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
