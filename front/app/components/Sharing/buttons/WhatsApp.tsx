import React from 'react';
import { clickSocialSharingLink } from '../utils';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../messages';

interface Props {
  className?: string;
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
  whatsAppMessage: string;
  url: string;
}

const WhatsApp = ({
  children,
  onClick,
  className,
  whatsAppMessage,
  url,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const handleClick = (href: string) => () => {
    clickSocialSharingLink(href);
    onClick();
  };

  const whatsAppSharingText = encodeURIComponent(whatsAppMessage).concat(
    ' ',
    url
  );
  const whatsAppHref = `https://api.whatsapp.com/send?phone=&text=${whatsAppSharingText}`;

  return (
    <button
      className={className}
      onClick={handleClick(whatsAppHref)}
      aria-label={formatMessage(messages.shareViaWhatsApp)}
    >
      {children}
    </button>
  );
};

export default injectIntl(WhatsApp);
