import React from 'react';
import { deleteIdea } from 'services/ideas';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';
import { browserHistory } from 'react-router';
import eventEmitter from 'utils/eventEmitter';
import { IModalInfo } from 'containers/App';
import T from 'components/T';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../../messages';

interface InputProps {
  ideaId: string;
}

interface DataProps {
  idea: GetIdeaChildProps['idea'];
}

interface Props extends InputProps, DataProps {}

class InfoSidebarSingle extends React.PureComponent<Props & InjectedIntlProps> {

  handleClickDelete = () => {
    const message = this.props.intl.formatMessage(messages.deleteIdeaConfirmation);

    if (window.confirm(message) && this.props.idea) {
      deleteIdea(this.props.idea.id);
    }
  }

  handleClickEdit = () => {
    if (this.props.idea) {
      browserHistory.push(`/ideas/edit/${this.props.idea.id}`);
    }
  }

  handleClickShow = () => {
    const { idea } = this.props;

    if (idea) {
      eventEmitter.emit<IModalInfo>('adminIdeas', 'cardClick', {
        type: 'idea',
        id: idea.id,
        url: `/ideas/${idea.attributes.slug}`
      });
    }
  }

  render() {
    const { idea } = this.props;

    if (!idea) return null;

    return (
      <>
        <Button.Group attached="top" size="small">
          <Button onClick={this.handleClickShow}>
            <Icon name="external" />
          </Button>
          <Button onClick={this.handleClickEdit}>
            <Icon name="edit" />
            <FormattedMessage {...messages.edit} />
          </Button>
          <Button negative={true} basic={true} onClick={this.handleClickDelete}>
            <Icon name="trash" />
            <FormattedMessage {...messages.delete} />
          </Button>
        </Button.Group>
        <Segment attached="bottom">
          <Header as="h5">
            <T value={idea.attributes.title_multiloc} />
          </Header>
          <p>
            <T value={idea.attributes.body_multiloc} />
          </p>
        </Segment>
      </>
    );
  }
}

const InfoSidebarSingleWithInjectedIntl = injectIntl<Props>(InfoSidebarSingle);

export default (inputProps: InputProps) => (
  <GetIdea id={inputProps.ideaId}>
    {({ idea }) =>  <InfoSidebarSingleWithInjectedIntl {...inputProps} idea={idea} />}
  </GetIdea>
);
