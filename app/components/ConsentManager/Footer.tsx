import React, { FormEvent } from 'react';
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';
import Button from 'components/UI/Button';
import { ButtonContainer } from './Container';
import { colors } from 'utils/styleUtils';
import { darken } from 'polished';
import styled from 'styled-components';

const CancelButton = styled(Button)`
  margin-right: 4px;
`;

interface Props {
    validate: () => boolean;
    handleCancelBack: () => void;
    handleCancelConfirm: () => void;
    handleCancel: () => void;
    handleSave: (e: FormEvent<any>) => void;
    mode: 'preferenceForm' | 'noDestinations' | 'cancelling';
}

const Footer = ({ validate, mode, handleCancelBack, handleCancelConfirm, handleCancel, handleSave }: Props) => {
  const isValid = validate();
  return (
    mode === 'cancelling' ? (
      <ButtonContainer>
        <CancelButton
          onClick={handleCancelBack}
          style="primary-inverse"
          textColor={colors.adminTextColor}
          textHoverColor={colors.adminTextColor}
        >
          <FormattedMessage {...messages.back} />
        </CancelButton>
        <Button
          onClick={handleCancelConfirm}
          style="primary"
          bgColor={colors.adminTextColor}
          bgHoverColor={darken(0.1, colors.adminTextColor)}
        >
          <FormattedMessage {...messages.confirm} />
        </Button>
      </ButtonContainer>
    ) : mode === 'preferenceForm' ? (
      <ButtonContainer>
        <CancelButton
          onClick={handleCancel}
          className="integration-cancel"
          style="primary-inverse"
          textColor={colors.adminTextColor}
          textHoverColor={colors.adminTextColor}
        >
          <FormattedMessage {...messages.cancel} />
        </CancelButton>
        <Button
          onClick={handleSave}
          style="primary"
          bgColor={colors.adminTextColor}
          bgHoverColor={darken(0.1, colors.adminTextColor)}
          className="integration-save"
          disabled={!isValid}
        >
          <FormattedMessage  {...messages.save} />
        </Button>
      </ButtonContainer>
    ) : (
    <Button onClick={handleCancel} style="primary" bgColor={colors.adminTextColor} bgHoverColor={darken(0.1, colors.adminTextColor)}>
      <FormattedMessage {...messages.close} />
    </Button>
  ));
};

export default Footer;
