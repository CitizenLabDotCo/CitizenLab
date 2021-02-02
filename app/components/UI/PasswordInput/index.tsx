import React from 'react';
import { isNilOrError } from 'utils/helperUtils';

// hooks
import useTenant from 'hooks/useTenant';

// components
import PasswordInputComponent from './PasswordInput';

export interface Props {
  id: string;
  value: string | null;
  error?: string | null;
  onChange: (password: string) => void;
  onBlur?: () => void;
  setRef?: (element: HTMLInputElement) => void;
  autocomplete?: 'current-password' | 'new-password';
  placeholder?: string;
}

const PasswordInput = (props: Props) => {
  const tenant = useTenant();

  if (!isNilOrError(tenant)) {
    const minimumPasswordLength =
      tenant.data.attributes.settings.password_login?.minimum_length || 8;

    return (
      <PasswordInputComponent
        minimumPasswordLength={minimumPasswordLength}
        {...props}
      />
    );
  }

  return null;
};

export default PasswordInput;
