import * as React from 'react';
import styled from 'styled-components';
import { updateCampaign, ICampaignData } from 'services/campaigns';
import { API } from 'typings';
import clHistory from 'utils/cl-router/history';

import GoBackButton from 'components/UI/GoBackButton';
import PageWrapper from 'components/admin/PageWrapper';
import CampaignForm, { FormValues, validateCampaignForm } from '../CampaignForm';
import { Formik } from 'formik';

import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';
import { withRouter, WithRouterProps } from 'react-router';
import GetCampaign from 'resources/GetCampaign';
import { isNilOrError } from 'utils/helperUtils';

const PageTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
  margin: 1rem 0 3rem 0;
`;

interface InputProps {}

interface DataProps {
  campaign: ICampaignData;
}

interface Props extends InputProps, DataProps, WithRouterProps { }

class Edit extends React.Component<Props> {

  handleSubmit = (values: FormValues, { setErrors, setSubmitting }) => {
    updateCampaign(this.props.campaign.id, {
      ...values
    })
      .then(() => {
        clHistory.push(`/admin/campaigns/${this.props.campaign.id}`);
      })
      .catch((errorResponse) => {
        const apiErrors = (errorResponse as API.ErrorResponse).json.errors;
        setErrors(apiErrors);
        setSubmitting(false);
      });
  }

  initialValues = () => {
    const { campaign } = this.props;
    return {
      sender: campaign.attributes.sender,
      reply_to: campaign.attributes.reply_to,
      subject_multiloc: campaign.attributes.subject_multiloc,
      body_multiloc: campaign.attributes.body_multiloc,
    };
  }

  renderFn = (props) => (
    <CampaignForm
      {...props}
      mode="edit"
    />
  )

  goBack = () => {
    clHistory.push('/admin/campaigns');
  }

  render() {
    return (
      <div>
        <GoBackButton onClick={this.goBack} />
        <PageTitle>
          <FormattedMessage {...messages.editCampaignTitle} />
        </PageTitle>
        <PageWrapper>
          <Formik
            initialValues={this.initialValues()}
            onSubmit={this.handleSubmit}
            render={this.renderFn}
            validate={validateCampaignForm}
          />
        </PageWrapper>
      </div>
    );
  }
}

const EditWithHOCs = withRouter(Edit);

export default (inputProps: InputProps & WithRouterProps) => (
  <GetCampaign id={inputProps.params.campaignId}>
    {campaign => isNilOrError(campaign) ? null : <EditWithHOCs {...inputProps} campaign={campaign} />}
  </GetCampaign>
);
