import React, { memo, useCallback, useState } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// hooks
import useTenant from 'hooks/useTenant';
import useWindowSize from 'hooks/useWindowSize';

// component
import SignUp from 'components/SignUpIn/SignUp';
import SignIn from 'components/SignUpIn/SignIn';

// styling
import styled from 'styled-components';
import { ContextShape } from 'components/Verification/VerificationModal';

// typings

const Container = styled.div``;

export type ISignUpInActionType = 'upvote' | 'downvote' | 'comment' | 'post';

export type ISignUpInActionContextType =
  | 'idea'
  | 'initiative'
  | 'project'
  | 'phase';

export type TSignUpInFlow = 'signup' | 'signin';

export interface ISignUpInMetaData {
  flow: TSignUpInFlow;
  pathname: string;
  verification?: boolean;
  verificationContext?: ContextShape;
  error?: boolean;
  isInvitation?: boolean;
  token?: string;
  inModal?: boolean;
  action?: () => void;
}

interface Props {
  metaData: ISignUpInMetaData;
  onSignUpInCompleted: (flow: TSignUpInFlow) => void;
  className?: string;
}

const SignUpIn = memo<Props>(({ metaData, onSignUpInCompleted, className }) => {
  const tenant = useTenant();
  const { windowHeight } = useWindowSize();

  const [selectedFlow, setSelectedFlow] = useState(metaData.flow || 'signup');

  const metaDataWithCurrentFlow = { ...metaData, flow: selectedFlow };

  const onSignUpCompleted = useCallback(() => {
    onSignUpInCompleted('signup');
  }, [onSignUpInCompleted]);

  const onSignInCompleted = useCallback(() => {
    onSignUpInCompleted('signin');
  }, [onSignUpInCompleted]);

  const onToggleSelectedMethod = useCallback(() => {
    setSelectedFlow((prevSelectedFlow) =>
      prevSelectedFlow === 'signup' ? 'signin' : 'signup'
    );
  }, []);

  if (!isNilOrError(tenant)) {
    return (
      <Container className={className}>
        {selectedFlow === 'signup' ? (
          <SignUp
            metaData={metaDataWithCurrentFlow}
            windowHeight={windowHeight}
            onSignUpCompleted={onSignUpCompleted}
            onGoToSignIn={onToggleSelectedMethod}
          />
        ) : (
          <SignIn
            metaData={metaDataWithCurrentFlow}
            windowHeight={windowHeight}
            onSignInCompleted={onSignInCompleted}
            onGoToSignUp={onToggleSelectedMethod}
          />
        )}
      </Container>
    );
  }

  return null;
});

export default SignUpIn;
