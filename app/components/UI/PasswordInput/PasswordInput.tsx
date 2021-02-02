import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Icon } from 'cl2-component-library';
import useLocale from 'hooks/useLocale';
import useTenant from 'hooks/useTenant';
import { isNilOrError } from 'utils/helperUtils';
import { ScreenReaderOnly } from 'utils/a11y';

import { Props as WrapperProps } from './';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

const Container = styled.div`
  position: relative;
  display: flex;
`;

const StyledInput = styled(Input)``;

const EyeIcon = styled(Icon)`
  width: 22px;
  height: 15px;
`;

const EyeClosedIcon = styled(Icon)`
  width: 22px;
  height: 19px;
  margin-bottom: -1px;
`;

const ShowPasswordButton = styled(Button)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
`;

interface Props extends WrapperProps {
  minimumPasswordLength: number;
}

const PasswordInputComponent = ({
  id,
  value,
  autocomplete,
  placeholder,
  onChange,
  onBlur,
  setRef,
  minimumPasswordLength,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const locale = useLocale();
  const tenant = useTenant();
  const [showPassword, setShowPassword] = useState(false);
  const minimumPasswordLengthError = minimumPasswordLength
    ? formatMessage(messages.minimumPasswordLengthErrorMessage, {
        minimumPasswordLength,
      })
    : null;
  const handleOnChange = (password: string) => {
    onChange(password);
  };
  const handleOnBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };
  const handleOnClick = () => {
    setShowPassword(!showPassword);
  };

  if (!isNilOrError(locale) && !isNilOrError(tenant)) {
    return (
      <Container>
        <StyledInput
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          error={minimumPasswordLengthError}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          autocomplete={autocomplete}
          placeholder={placeholder}
          setRef={setRef}
        />
        <ShowPasswordButton
          locale={locale}
          onClick={handleOnClick}
          buttonStyle="text"
          height={'100%'}
        >
          {showPassword ? (
            <EyeIcon name="eye" title={formatMessage(messages.hidePassword)} />
          ) : (
            <EyeClosedIcon
              name="eyeClosed"
              title={formatMessage(messages.showPassword)}
            />
          )}
        </ShowPasswordButton>
        <ScreenReaderOnly aria-live="polite">
          {formatMessage(
            showPassword
              ? messages.a11y_passwordVisible
              : messages.a11y_passwordHidden
          )}
        </ScreenReaderOnly>
      </Container>
    );
  }

  return null;
};

export default injectIntl(PasswordInputComponent);
