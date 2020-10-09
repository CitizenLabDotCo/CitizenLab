import React from 'react';
import { UtmParams, Medium, addUtmToUrl } from './utils';
import { isNilOrError } from 'utils/helperUtils';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { fontSizes, colors, media } from 'utils/styleUtils';
import { darken } from 'polished';

// components
import { FacebookButton, TwitterButton } from 'react-social';
import { Icon } from 'cl2-component-library';

// hooks
import useTenant from 'hooks/useTenant';

// tracking
import { trackEventByName } from 'utils/analytics';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .sharingButton {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: ${(props: any) => props.theme.borderRadius};
    cursor: pointer;
    transition: all 100ms ease-out;
    text-align: left;
    color: ${colors.label};
    font-size: ${fontSizes.base}px;

    &:hover {
      background-color: ${darken(0.06, 'white')};
    }

    &.messenger {
      ${media.biggerThanMaxTablet`
        display: none;
      `}
    }
  }
`;

const FacebookIcon = styled(Icon)`
  width: 22px;
  height: 18px;
  margin-right: 10px;
  fill: #3c5a99;
`;

const MessengerIcon = styled(Icon)`
  width: 22px;
  height: 18px;
  margin-right: 10px;
  fill: rgba(0, 120, 255, 1);
`;

const WhatsAppIcon = styled(Icon)`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const TwitterIcon = styled(Icon)`
  margin-right: 10px;
  width: 22px;
  height: 17px;
  fill: #1da1f2;
`;

const EmailIcon = styled(Icon)`
  margin-right: 10px;
  width: 22px;
  height: 17px;
  fill: ${colors.secondaryText};
`;

interface Props {
  className?: string;
  url: string;
  twitterMessage: string;
  whatsAppMessage: string;
  emailSubject?: string;
  emailBody?: string;
  utmParams?: UtmParams;
  id?: string;
}

const SharingDropdownContent = ({
  id,
  url,
  className,
  utmParams,
  emailBody,
  emailSubject,
  twitterMessage,
  whatsAppMessage,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const tenant = useTenant();

  const onClick = (medium: Medium, href?: string) => (
    _event: React.FormEvent
  ) => {
    if (href) {
      // https://stackoverflow.com/a/8944769
      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
    }

    trackEventByName(tracks.clickShare.name, { network: medium });
  };

  const getUrl = (medium: Medium) => () => {
    return utmParams ? addUtmToUrl(medium, url, utmParams) : url;
  };

  if (!isNilOrError(tenant)) {
    const facebookAppId =
      tenant.data.attributes.settings.facebook_login?.app_id;

    const facebook = facebookAppId ? (
      <FacebookButton
        appId={facebookAppId}
        url={getUrl('facebook')}
        className="sharingButton facebook first"
        sharer={true}
        onClick={trackEventByName(tracks.clickShare.name, {
          network: 'facebook',
        })}
        aria-label={formatMessage(messages.shareOnFacebook)}
      >
        <FacebookIcon ariaHidden name="facebook" />
        <span aria-hidden>{'Facebook'}</span>
      </FacebookButton>
    ) : null;

    const messenger = facebookAppId ? (
      <button
        className="sharingButton messenger"
        onClick={onClick(
          'messenger',
          `fb-messenger://share/?link=${encodeURIComponent(
            getUrl('messenger')()
          )}&app_id=${facebookAppId}`
        )}
        aria-label={formatMessage(messages.shareViaMessenger)}
      >
        <MessengerIcon ariaHidden name="messenger" />
        <span aria-hidden>{'Messenger'}</span>
      </button>
    ) : null;

    const whatsapp = (
      <button
        className="sharingButton whatsapp"
        onClick={onClick(
          'whatsapp',
          `https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(
            whatsAppMessage
          )}`
        )}
        aria-label={formatMessage(messages.shareViaWhatsApp)}
      >
        <WhatsAppIcon ariaHidden name="whatsapp" />
        <span aria-hidden>{'WhatsApp'}</span>
      </button>
    );

    const twitter = (
      <TwitterButton
        message={twitterMessage}
        url={getUrl('twitter')}
        className={`sharingButton twitter ${
          !emailSubject || !emailBody ? 'last' : ''
        }`}
        sharer={true}
        onClick={trackEventByName(tracks.clickShare.name, {
          network: 'twitter',
        })}
        aria-label={formatMessage(messages.shareOnTwitter)}
      >
        <TwitterIcon ariaHidden name="twitter" />
        <span aria-hidden>{'Twitter'}</span>
      </TwitterButton>
    );

    const email =
      emailSubject && emailBody ? (
        <button
          className="sharingButton last email"
          onClick={onClick(
            'email',
            `mailto:?subject=${emailSubject}&body=${emailBody}`
          )}
          aria-label={formatMessage(messages.shareByEmail)}
        >
          <EmailIcon ariaHidden name="email" />
          <span aria-hidden>{'Email'}</span>
        </button>
      ) : null;

    return (
      <Container id={id || ''} className={className || ''}>
        {facebook}
        {messenger}
        {whatsapp}
        {twitter}
        {email}
      </Container>
    );
  }

  return null;
};

export default injectIntl(SharingDropdownContent);
