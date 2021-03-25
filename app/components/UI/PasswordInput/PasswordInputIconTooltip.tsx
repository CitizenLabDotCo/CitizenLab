import React from 'react';
import { IconTooltip } from 'cl2-component-library';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

interface Props {
  className?: string;
}

const PasswordInputIconTooltip = ({
  intl: { formatMessage },
  className,
}: Props & InjectedIntlProps) => {
  return (
    <IconTooltip
      className={className}
      content={
        <>
          <p>{formatMessage(messages.passwordStrengthTooltip1)}</p>
          <ul>
            <li>{formatMessage(messages.passwordStrengthTooltip2)}</li>
            <li>{formatMessage(messages.passwordStrengthTooltip3)}</li>
            <li>{formatMessage(messages.passwordStrengthTooltip4)}</li>
          </ul>
        </>
      }
    />
  );
};

export default injectIntl(PasswordInputIconTooltip);
