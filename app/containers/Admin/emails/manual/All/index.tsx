import React from 'react';
import { isNilOrError } from 'utils/helperUtils';
import styled from 'styled-components';

import GetCampaigns, { GetCampaignsChildProps } from 'resources/GetCampaigns';
import { isDraft } from 'services/campaigns';

import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

import { List } from 'components/admin/ResourceList';
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';
import Warning from 'components/UI/Warning';
import Pagination from 'components/admin/Pagination';
import { ButtonWrapper } from 'components/admin/PageWrapper';
import DraftCampaignRow from './DraftCampaignRow';
import SentCampaignRow from './SentCampaignRow';

import messages from '../../messages';

import { fontSizes, colors } from 'utils/styleUtils';

const NoCampaignsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 100px;;
`;

const NoCampaignsHeader = styled.h2`
  font-size: ${fontSizes.xl}px;
  font-weight: bold;
  margin-bottom: 0;
`;

const NoCampaignsDescription = styled.p`
  color: ${colors.adminSecondaryTextColor};
  font-weight: 400;
  font-size: ${fontSizes.base}px;
  margin-bottom: 30px;
`;

interface InputProps { }

interface DataProps extends GetCampaignsChildProps {}

interface Props extends InputProps, DataProps { }

interface State { }

class Campaigns extends React.Component<Props & InjectedIntlProps, State> {

  render() {
    const { campaigns, currentPage, lastPage } = this.props;

    if (isNilOrError(campaigns)) return null;

    if (campaigns.length === 0) {
      return (
      <>
        <NoCampaignsWrapper>
          <Icon name="mailBig" />
          <NoCampaignsHeader>
            <FormattedMessage {...messages.noCampaignsHeader} />
          </NoCampaignsHeader>
          <NoCampaignsDescription>
            <FormattedMessage {...messages.noCampaignsDescription} />
          </NoCampaignsDescription>
          <Button
            style="cl-blue"
            circularCorners={false}
            icon="plus-circle"
            linkTo="/admin/emails/manual/new"
          >
            <FormattedMessage {...messages.addCampaignButton} />
          </Button>
        </NoCampaignsWrapper>
      </>);
    } else {
      return (
        <>
          <Warning
            text={<FormattedMessage {...messages.customEmailCampaignsInfo} />}
          />
          <ButtonWrapper>
            <Button
              style="cl-blue"
              circularCorners={false}
              icon="plus-circle"
              linkTo="/admin/emails/manual/new"
            >
              <FormattedMessage {...messages.addCampaignButton} />
            </Button>
          </ButtonWrapper>
          <List key={campaigns.map(c => c.id).join()}>
            {campaigns.map((campaign) => (
              isDraft(campaign) ?
                <DraftCampaignRow key={campaign.id} campaign={campaign} />
              :
                <SentCampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </List>
          <Pagination
            currentPage={currentPage}
            totalPages={lastPage}
            loadPage={this.props.onChangePage}
          />
        </>
      );
    }
  }
}

const CampaignsWithInjectedIntl = injectIntl<Props>(Campaigns);

export default (inputProps: Props) => (
  <GetCampaigns campaignNames={['manual']} pageSize={10}>
    {campaigns => <CampaignsWithInjectedIntl {...inputProps} {...campaigns} />}
  </GetCampaigns>
);
