import React, { memo, useState, useCallback, useEffect } from 'react';
import { isFunction } from 'lodash-es';

// components
import Modal from 'components/UI/Modal';
import SignUpIn, { ISignUpInMetaData } from 'components/SignUpIn';
import { TSignUpSteps } from 'components/SignUpIn/SignUp';

// services
import { completeRegistration } from 'services/users';

// hooks
import useIsMounted from 'hooks/useIsMounted';
import useAuthUser from 'hooks/useAuthUser';
import useParticipationConditions from 'hooks/useParticipationConditions';
import useUserCustomFieldsSchema from 'hooks/useUserCustomFieldsSchema';

// utils
import { isNilOrError } from 'utils/helperUtils';
import { isProjectContext } from 'components/Verification/VerificationSteps';

// events
import { openSignUpInModal$, closeSignUpInModal$, signUpActiveStepChange$ } from 'components/SignUpIn/events';

// style
import styled from 'styled-components';

const Container = styled.div``;

interface Props {
  className?: string;
  onMounted?: () => void;
}

const SignUpInModal = memo<Props>(({ className, onMounted }) => {

  const isMounted = useIsMounted();
  const [metaData, setMetaData] = useState<ISignUpInMetaData | undefined>(undefined);
  const [signUpActiveStep, setSignUpActiveStep] = useState<TSignUpSteps | null| undefined>(undefined);

  const authUser = useAuthUser();
  const participationConditions = useParticipationConditions(metaData?.verificationContext && isProjectContext(metaData?.verificationContext) ? metaData?.verificationContext : null);
  const customFieldsSchema = useUserCustomFieldsSchema();

  const opened = !!metaData;
  const hasParticipationConditions = !isNilOrError(participationConditions) && participationConditions.length > 0;
  const modalWidth = !!(signUpActiveStep === 'verification' && hasParticipationConditions) ? 820 : 550;
  const modalNoClose = !!((signUpActiveStep === 'verification' || signUpActiveStep === 'custom-fields') && !isNilOrError(customFieldsSchema) && customFieldsSchema?.hasRequiredFields);

  useEffect(() => {
    if (isMounted()) {
      onMounted?.();
    }
  }, [onMounted]);

  useEffect(() => {
    const subscriptions = [
      openSignUpInModal$.subscribe(({ eventValue: metaData }) => {
        !authUser && setMetaData(metaData);
      }),
      closeSignUpInModal$.subscribe(() => {
        setMetaData(undefined);
      }),
      signUpActiveStepChange$.subscribe(({ eventValue: activeStep }) => {
        setSignUpActiveStep(activeStep);
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [authUser]);

  const onClose = useCallback(() => {
    // if the user presses the close button (x) in the modal top right corner when the cusom-fields step is shown and
    // when this step -does not- have required fields, then this action is the equivalent of pressing the 'skip this step' button
    // and therefore should trigger completeRegistration() in order for the user to have a valid account.
    // If completeRegistration(), the user will be logged in but will not be able to perform any actions (e.g. voting)
    if (
      signUpActiveStep === 'custom-fields' &&
      !isNilOrError(authUser) &&
      !isNilOrError(customFieldsSchema) &&
      !customFieldsSchema?.hasRequiredFields
    ) {
      completeRegistration({});
    }

    setMetaData(undefined);
  }, [signUpActiveStep, customFieldsSchema, authUser]);

  const onSignUpInCompleted = useCallback(() => {
    const hasAction = isFunction(metaData?.action);
    const requiresVerification = !!metaData?.verification;
    const authUserIsVerified = !isNilOrError(authUser) && authUser.data.attributes.verified;

    if (hasAction && (!requiresVerification || authUserIsVerified)) {
      metaData?.action?.();
    }

    setMetaData(undefined);
  }, [metaData, authUser]);

  return (
    <Modal
      width={modalWidth}
      padding="0px"
      opened={opened}
      close={onClose}
      closeOnClickOutside={!modalNoClose}
      noClose={modalNoClose}
    >
      <Container id="e2e-sign-up-in-modal" className={className}>
        {opened && metaData &&
          <SignUpIn
            metaData={metaData}
            onSignUpInCompleted={onSignUpInCompleted}
          />
        }
      </Container>
    </Modal>
  );
});

export default SignUpInModal;
