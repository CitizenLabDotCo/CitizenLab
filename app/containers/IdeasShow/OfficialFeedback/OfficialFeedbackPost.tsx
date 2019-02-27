import React from 'react';
import styled from 'styled-components';

// components
import OfficialFeedbackEdit from './Form/OfficialFeedbackEdit';
import MoreActionsMenu, { IAction } from 'components/UI/MoreActionsMenu';
import T from 'components/T';

// styles
import { colors, fontSizes } from 'utils/styleUtils';

// i18n
import messages from './messages';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { FormattedDate, InjectedIntlProps } from 'react-intl';

// services
import { IOfficialFeedbackData, deleteOfficialfeedback } from 'services/officialFeedback';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  color: ${colors.text};
  font-size: ${fontSizes.base}px;
  padding: 17px 34px 27px 34px;
  margin-bottom: 10px;
`;

const PostContainer = Container.extend`
  background-color: rgba(236, 90, 36, 0.06);
`;

const EditFormContainer = Container.extend`
  background-color: ${colors.adminBackground};
`;

const Body = styled.div`
  line-height: 23px;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Author = styled.span`
  font-weight: 600;
`;

const DatePosted = styled.span`
  color: ${colors.label};
`;

const StyledMoreActionsMenu = styled(MoreActionsMenu)`
  align-self: flex-end;
  margin-bottom: 10px;
`;

interface Props {
  editingAllowed: boolean | null;
  officialFeedbackPost: IOfficialFeedbackData;
}

interface State {
  showEditForm: boolean;
}

class OfficialFeedbackPost extends React.PureComponent<Props & InjectedIntlProps, State> {
  constructor(props: Props) {
    super(props as any);
    this.state = {
      showEditForm: false
    };
  }

  showEditForm = () => {
    this.setState({ showEditForm: true });
  }

  closeEditForm = () => {
    this.setState({ showEditForm: false });
  }

  deletePost = (postId: string) => () => {
    if (window.confirm(this.props.intl.formatMessage(messages.deletionConfirmation))) {
      deleteOfficialfeedback(postId);
    }
  }

  getActions = (postId: string) => [
    {
      label: <FormattedMessage {...messages.editOfficialFeedbackPost} />,
      handler: this.showEditForm,
    },
    {
      label: <FormattedMessage {...messages.deleteOfficialFeedbackPost} />,
      handler: this.deletePost(postId),
    }] as IAction[]

  render() {
    const { editingAllowed, officialFeedbackPost } = this.props;
    const { showEditForm } = this.state;
    const bodyTextMultiloc = officialFeedbackPost.attributes.body_multiloc;
    const authorNameMultiloc = officialFeedbackPost.attributes.author_multiloc;

    if (showEditForm) {
      return (
        <EditFormContainer key={officialFeedbackPost.id}>
          <OfficialFeedbackEdit
            feedback={officialFeedbackPost}
            closeForm={this.closeEditForm}
          />
        </EditFormContainer>
      );
    }

    return (
      <PostContainer key={officialFeedbackPost.id}>
        {editingAllowed &&
          <StyledMoreActionsMenu ariaLabel={this.props.intl.formatMessage(messages.showMoreActions)} actions={this.getActions(officialFeedbackPost.id)} />
        }

        <>
          <Body>
            <T value={bodyTextMultiloc} supportHtml />
          </Body>
          <Footer>
            <Author>
              <T value={authorNameMultiloc} />
            </Author>
            <DatePosted><FormattedDate value={officialFeedbackPost.attributes.created_at} /></DatePosted>
          </Footer>
        </>
      </PostContainer>
    );
  }
}

const OfficialFeedbackPostWithIntl = injectIntl<Props>(OfficialFeedbackPost);

export default OfficialFeedbackPostWithIntl;
