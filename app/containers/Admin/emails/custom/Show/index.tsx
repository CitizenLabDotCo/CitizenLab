import * as React from 'react';
import styled from 'styled-components';
import clHistory from 'utils/cl-router/history';
import { withRouter, WithRouterProps } from 'react-router';
import { adopt } from 'react-adopt';

// services & resources
import { sendCampaign, sendCampaignPreview, ICampaignData, isDraft } from 'services/campaigns';
import GetCampaign from 'resources/GetCampaign';
import GetGroup from 'resources/GetGroup';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import messages from '../../messages';
import localize, { InjectedLocalized } from 'utils/localize';

// components
import Button from 'components/UI/Button';
import StatusLabel from 'components/UI/StatusLabel';
import DraftCampaignDetails from './DraftCampaignDetails';
import SentCampaignDetails from './SentCampaignDetails';
import T from 'components/T';

// utils
import { isNilOrError } from 'utils/helperUtils';

// styling
import { fontSizes } from 'utils/styleUtils';
import InfoTooltip from 'components/admin/InfoTooltip';

const Stamp = require('./stamp.svg');

const PageHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CampaignHeader = styled.div`
  display: flex;
  padding: 20px 0;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 20px;
`;

const StampIcon = styled(Stamp)`
  margin-right: 20px;
`;

const FromTo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: ${fontSizes.base}px;
  margin-right: auto;
`;

const FromToHeader = styled.span`
  font-weight: bold;
`;

const SendTestEmailButton = styled.button`
  text-decoration: underline;
  font-size: ${fontSizes.base}px;
  cursor: pointer;
`;
const StyledButtonContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const PageTitle = styled.h1`
  margin-bottom: 0;
  margin-right: 1rem;
  font-weight: 600;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  & > * {
    padding: 0 10px;
  }
`;

const GroupLink = styled.a`
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface InputProps { }

interface DataProps {
  campaign: ICampaignData;
  user: GetAuthUserChildProps;
  tenant: GetTenantChildProps;
}

interface Props extends InputProps, DataProps, WithRouterProps, InjectedIntlProps, InjectedLocalized { }

interface State { }

class Show extends React.Component<Props, State> {

  handleSendNow = () => {
    sendCampaign(this.props.campaign.id)
      .then(() => {
      })
      .catch(() => {
      });
  }

  handleSendTestEmail = () => {
    sendCampaignPreview(this.props.campaign.id)
      .then(() => {
        const previewSentConfirmation = this.props.intl.formatMessage(messages.previewSentConfirmation);
        window.alert(previewSentConfirmation);
      });
  }

  handleGroupLinkClick = (groupId?: string) => (event: React.FormEvent<any>) => {
    event.preventDefault();
    if (groupId) {
      clHistory.push(`/admin/users/${groupId}`);
    } else {
      clHistory.push('/admin/users');
    }
  }

  getSenderName = (senderType: string) => {
    const { user, tenant, localize } = this.props;
    let senderName: string | null = null;

    if (senderType === 'author' && !isNilOrError(user)) {
      senderName = `${user.attributes.first_name} ${user.attributes.last_name}`;
    } else if (senderType === 'organization' && !isNilOrError(tenant)) {
      senderName = localize(tenant.attributes.settings.core.organization_name);
    }

    return senderName;
  }

  render() {
    const { campaign } = this.props;

    if (campaign) {
      const groupIds: string[] = campaign.relationships.groups.data.map(group => group.id);
      const senderType = campaign.attributes.sender;
      const senderName = this.getSenderName(senderType);

      return (
        <div>
          <PageHeader>
            <PageTitleWrapper>
              <PageTitle>
                <T value={campaign.attributes.subject_multiloc} />
              </PageTitle>
              {isDraft(campaign) ?
                <StatusLabel color="draftYellow" text={<FormattedMessage {...messages.draft} />} />
                :
                <StatusLabel color="clGreenSuccess" text={<FormattedMessage {...messages.sent} />} />
              }
            </PageTitleWrapper>
            {isDraft(campaign) &&
              <Buttons>
                <Button linkTo={`/admin/emails/custom/${campaign.id}/edit`} style="secondary">
                  <FormattedMessage {...messages.editButtonLabel} />
                </Button>
                <Button
                  style="admin-dark"
                  icon="send"
                  iconPos="right"
                  onClick={this.handleSendNow}
                >
                  <FormattedMessage {...messages.sendNowButton} />
                </Button>
              </Buttons>
            }
          </PageHeader>
          <CampaignHeader>
            <StampIcon name="stamp" />
            <FromTo>
              <div>
                <FromToHeader>
                  <FormattedMessage {...messages.campaignFrom} />
                  &nbsp;
                </FromToHeader>
                <span>{senderName}</span>
              </div>
              <div>
                <FromToHeader>
                  <FormattedMessage {...messages.campaignTo} />
                  &nbsp;
                </FromToHeader>
                {groupIds.length === 0 && <GroupLink onClick={this.handleGroupLinkClick()}>
                  {this.props.intl.formatMessage(messages.allUsers)}
                </GroupLink>}
                {groupIds.map((groupId, index) => (
                  <GetGroup key={groupId} id={groupId}>
                    {group => {
                      if (index < groupIds.length - 1) {
                        return <GroupLink onClick={this.handleGroupLinkClick(groupId)}>{!isNilOrError(group) && this.props.localize(group.attributes.title_multiloc)}, </GroupLink>;
                      }
                      return <GroupLink onClick={this.handleGroupLinkClick(groupId)}>{!isNilOrError(group) && this.props.localize(group.attributes.title_multiloc)}</GroupLink>;
                    }}
                  </GetGroup>
                ))}
              </div>
            </FromTo>
            {isDraft(campaign) &&
              <StyledButtonContainer>
                <SendTestEmailButton
                  onClick={this.handleSendTestEmail}
                >
                  <FormattedMessage {...messages.sendTestEmailButton} />
                </SendTestEmailButton>
                &nbsp;
                <InfoTooltip {...messages.sendTestEmailTooltip} position="bottom-left" />
              </StyledButtonContainer>
            }
          </CampaignHeader>

          {isDraft(campaign) ?
            <DraftCampaignDetails campaignId={campaign.id} />
            :
            <SentCampaignDetails campaignId={campaign.id} />
          }
        </div>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  campaign: ({ params, render }) => <GetCampaign id={params.campaignId}>{render}</GetCampaign>,
  user: ({ render }) => <GetAuthUser>{render}</GetAuthUser>,
  tenant: ({ render }) => <GetTenant>{render}</GetTenant>
});

const ShowWithHOCs = injectIntl(localize(Show));

export default withRouter((inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <ShowWithHOCs {...inputProps} {...dataProps} />}
  </Data>
));
