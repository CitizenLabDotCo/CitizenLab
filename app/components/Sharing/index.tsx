import React, { memo } from 'react';

// libraries
import { FacebookButton, TwitterButton } from 'react-social';

// components
import { Icon } from 'cl2-component-library';

// resources
import useTenant from 'hooks/useTenant';

// i18n
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { media, fontSizes, colors } from 'utils/styleUtils';
import { darken } from 'polished';

// utils
import { isNilOrError } from 'utils/helperUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3<{ isInModal?: boolean }>`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.large}px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 12px;
  padding: 0;
  justify-content: ${({ isInModal }) => (isInModal ? 'center' : 'start')};
`;

const StyledIcon = styled(Icon)`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  fill: #fff;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;

  &.layout2 {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
  }

  .sharingButton {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    border-radius: ${(props: any) => props.theme.borderRadius};
    cursor: pointer;
    transition: all 100ms ease-out;

    &.layout1 {
      margin-right: 5px;

      &.last {
        margin-right: 0px;
      }

      ${media.largePhone`
        flex-basis: calc(50% - 2.5px);

        &:nth-child(odd) {
          margin-right: 5px;

          &.last {
            margin-right: 0px;
          }
        }

        &:nth-child(-n+2) {
          margin-bottom: 5px;
        }

        &:nth-child(even) {
          margin-right: 0;
        }
      `}
    }

    &.layout2 {
      margin-bottom: 12px;

      &.last {
        margin-bottom: 0px;
      }
    }

    &.twitter {
      background: ${colors.twitter};
      color: #fff;

      &:hover {
        background: ${darken(0.15, colors.twitter)};
      }
    }

    &.whatsapp {
      background: #455a64;
      color: #fff;

      &:hover {
        background: ${darken(0.15, '#455A64')};
      }
    }

    &.messenger {
      background: ${colors.facebookMessenger};
      color: #fff;

      &:hover {
        background: ${darken(0.15, colors.facebookMessenger)};
      }

      ${media.biggerThanMaxTablet`
        display: none;
      `}
    }

    &.facebook {
      background: ${colors.facebook};
      color: #fff;

      &:hover {
        background: ${darken(0.15, colors.facebook)};
      }
    }

    &.email {
      color: #fff;
      background: ${(props: any) => props.theme.colorMain};

      ${StyledIcon} {
        fill: #fff;
      }

      &:hover {
        background: ${(props: any) => darken(0.1, props.theme.colorMain)};
      }
    }
  }
`;

export type UtmParams = {
  source: string;
  campaign: string;
  content?: string;
};

type Medium = 'facebook' | 'twitter' | 'messenger' | 'whatsapp' | 'email';

interface Props {
  context: 'idea' | 'project' | 'initiative' | 'folder';
  isInModal?: boolean;
  className?: string;
  url: string;
  twitterMessage: string;
  whatsAppMessage: string;
  emailSubject?: string;
  emailBody?: string;
  utmParams: UtmParams;
  id?: string;
  layout?: 1 | 2;
}

const Sharing = memo(
  ({
    context,
    twitterMessage,
    whatsAppMessage,
    emailSubject,
    emailBody,
    className,
    intl: { formatMessage },
    isInModal,
    id,
    url,
    utmParams,
    layout,
  }: Props & InjectedIntlProps) => {
    const tenant = useTenant();

    const getUrlWithUtm = (medium: string) => {
      let resUrl = url;

      resUrl += `?utm_source=${utmParams.source}&utm_campaign=${utmParams.campaign}&utm_medium=${medium}`;

      if (utmParams.content) {
        resUrl += `&utm_content=${utmParams.content}`;
      }

      return resUrl;
    };

    const handleClick = (medium: Medium, href?: string) => (
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

      trackClick(medium);
    };

    const trackClick = (medium: Medium) => {
      const properties = isInModal
        ? { modal: 'true', network: medium }
        : { network: medium };

      trackEventByName(tracks.shareButtonClicked.name, properties);
    };

    if (!isNilOrError(tenant)) {
      const facebookAppId =
        tenant.data.attributes.settings.facebook_login?.app_id || null;
      const layoutClassName = layout === 2 ? 'layout2' : 'layout1';

      const facebook = facebookAppId ? (
        <FacebookButton
          appId={facebookAppId}
          url={getUrlWithUtm('facebook')}
          className="sharingButton facebook first"
          sharer={true}
          onClick={handleClick('facebook')}
          aria-label={formatMessage(messages.shareOnFacebook)}
        >
          <StyledIcon ariaHidden name="facebook" />
        </FacebookButton>
      ) : null;

      const messenger = facebookAppId ? (
        <button
          className="sharingButton messenger"
          onClick={handleClick(
            'messenger',
            `fb-messenger://share/?link=${encodeURIComponent(
              getUrlWithUtm('messenger')
            )}&app_id=${facebookAppId}`
          )}
          aria-label={formatMessage(messages.shareViaMessenger)}
        >
          <StyledIcon ariaHidden name="messenger" />
        </button>
      ) : null;

      const whatsapp = (
        <button
          className="sharingButton whatsapp"
          onClick={handleClick(
            'whatsapp',
            `https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(
              whatsAppMessage
            )}`
          )}
          aria-label={formatMessage(messages.shareViaWhatsApp)}
        >
          <StyledIcon ariaHidden name="whatsapp" />
        </button>
      );

      const twitter = (
        <TwitterButton
          message={twitterMessage}
          url={getUrlWithUtm('twitter')}
          className={`sharingButton twitter ${
            !emailSubject || !emailBody ? 'last' : ''
          } ${layoutClassName}`}
          sharer={true}
          onClick={handleClick('twitter')}
          aria-label={formatMessage(messages.shareOnTwitter)}
        >
          <StyledIcon ariaHidden name="twitter" />
        </TwitterButton>
      );

      const email =
        emailSubject && emailBody ? (
          <button
            className="sharingButton last email"
            onClick={handleClick(
              'email',
              `mailto:?subject=${emailSubject}&body=${emailBody}`
            )}
            aria-label={formatMessage(messages.shareByEmail)}
          >
            <StyledIcon ariaHidden name="email" />
          </button>
        ) : null;

      return (
        <Container id={id || ''} className={className || ''}>
          {layout !== 2 && (
            <Title isInModal={isInModal}>
              {context === 'idea' && (
                <FormattedMessage {...messages.shareIdea} />
              )}
              {context === 'project' && (
                <FormattedMessage {...messages.share} />
              )}
              {context === 'initiative' && (
                <FormattedMessage {...messages.shareThisInitiative} />
              )}
              {context === 'folder' && (
                <FormattedMessage {...messages.shareThisFolder} />
              )}
            </Title>
          )}
          <Buttons className={layoutClassName}>
            {facebook}
            {messenger}
            {whatsapp}
            {twitter}
            {email}
          </Buttons>
        </Container>
      );
    }

    return null;
  }
);

export default injectIntl(Sharing);
