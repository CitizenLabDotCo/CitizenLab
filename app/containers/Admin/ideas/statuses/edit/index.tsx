import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { CLErrorsJSON } from 'typings';
import clHistory from 'utils/cl-router/history';
import { isNilOrError } from 'utils/helperUtils';

import useIdeaStatus from 'hooks/useIdeaStatus';
import GoBackButton from 'components/UI/GoBackButton';
import IdeaStatusForm, { FormValues } from '../IdeaStatusForm';
import { Formik } from 'formik';
import { updateIdeaStatus } from 'services/ideaStatuses';

import { FormattedMessage } from 'utils/cl-intl';
import messages from '../../messages';
import { isCLErrorJSON } from 'utils/errorUtils';

const FormHeader = styled.div`
  width: 100%;
  margin: 0 0 3rem;
`;

const FormTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
  margin: 1rem 0 3rem 0;
`;

const Edit = ({ params }) => {
  const { id: statusId } = params;
  const ideaStatus = useIdeaStatus({ statusId });

  function handleSubmit(
    values: FormValues,
    { setErrors, setSubmitting, setStatus }
  ) {
    const { ...params } = values;

    updateIdeaStatus(statusId, params)
      .then((_response) => {
        goBack();
      })
      .catch((errorResponse) => {
        if (isCLErrorJSON(errorResponse)) {
          const apiErrors = (errorResponse as CLErrorsJSON).json.errors;
          setErrors(apiErrors);
        } else {
          setStatus('error');
        }
        setSubmitting(false);
      });
  }

  function renderFn(props) {
    return <IdeaStatusForm {...props} mode="new" builtInField={false} />;
  }

  function goBack() {
    clHistory.push('/admin/ideas/statuses');
  }

  return isNilOrError(ideaStatus) ? (
    <></>
  ) : (
    <div>
      <FormHeader>
        <GoBackButton onClick={goBack} />
        <FormTitle>
          <FormattedMessage {...messages.addIdeaStatus} />
        </FormTitle>
      </FormHeader>
      <Formik
        initialValues={ideaStatus.attributes}
        onSubmit={handleSubmit}
        render={renderFn}
        validate={IdeaStatusForm['validate']}
      />
    </div>
  );
};

export default withRouter(Edit);
