import React, { memo, useState, useCallback, useEffect } from 'react';

// components
import Modal from 'components/UI/Modal';
import SignUpIn, { ISignUpInMetaData } from 'components/SignUpIn';
import { TSignUpSteps } from 'components/SignUpIn/SignUp';

// services
import { completeRegistration } from 'services/users';

// hooks
import useIsMounted from 'hooks/useIsMounted';
import useParticipationConditions from 'hooks/useParticipationConditions';
import useCustomFieldsSchema from 'hooks/useCustomFieldsSchema';

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

  const participationConditions = useParticipationConditions(metaData?.verificationContext && isProjectContext(metaData?.verificationContext) ? metaData?.verificationContext : null);
  const customFieldsSchema = useCustomFieldsSchema();

  const opened = !!metaData;
  const hasParticipationConditions = !isNilOrError(participationConditions) && participationConditions.length > 0;
  const modalWidth = !!(signUpActiveStep === 'verification' && hasParticipationConditions) ? 820 : 550;
  const modalNoClose = !!((signUpActiveStep === 'verification' || signUpActiveStep === 'custom-fields') && !isNilOrError(customFieldsSchema) && customFieldsSchema?.hasRequiredFields);

  useEffect(() => {
    if (isMounted() && onMounted) {
      onMounted();
    }
  }, [onMounted]);

  useEffect(() => {
    const subscriptions = [
      openSignUpInModal$.subscribe(({ eventValue: metaData }) => {
        setMetaData(metaData);
      }),
      closeSignUpInModal$.subscribe(() => {
        setMetaData(undefined);
      }),
      signUpActiveStepChange$.subscribe(({ eventValue: activeStep }) => {
        setSignUpActiveStep(activeStep);
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  const onClose = useCallback(() => {
    // if the user presses the close button (x) in the modal top right corner when the cusom-fields step is shown and
    // when this step -does not- have required fields, then this action is the equivalent of pressing the 'skip this step' button
    // and therefore should trigger completeRegistration() in order for the user to have a valid account.
    // If completeRegistration(), the user will be logged in but will not be able to perform any actions (e.g. voting)
    if (signUpActiveStep === 'custom-fields' && !isNilOrError(customFieldsSchema) && !customFieldsSchema?.hasRequiredFields) {
      completeRegistration({});
    }

    setMetaData(undefined);
  }, [signUpActiveStep, customFieldsSchema]);

  const onSignUpInCompleted = useCallback(() => {
    metaData?.action?.();
    setMetaData(undefined);
  }, [metaData]);

  return (
    <Modal
      width={modalWidth}
      noPadding={true}
      opened={opened}
      close={onClose}
      closeOnClickOutside={false}
      noClose={modalNoClose}
    >
      <Container className={className}>
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
