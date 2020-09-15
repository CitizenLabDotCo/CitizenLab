import React from 'react';
import SharingButton from 'components/SharingButton';
import { isNilOrError } from 'utils/helperUtils';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../messages';

import useIdea from 'hooks/useIdea';
import useLocalize from 'hooks/useLocalize';
import useAuthUser from 'hooks/useAuthUser';

interface Props {
  ideaId: string;
  buttonComponent: JSX.Element;
}

const Component = ({
  ideaId,
  buttonComponent,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const idea = useIdea({ ideaId });
  const authUser = useAuthUser();
  const localize = useLocalize();

  if (!isNilOrError(idea)) {
    const ideaUrl = location.href;
    const titleMultiloc = idea.attributes.title_multiloc;
    const ideaTitle = localize(titleMultiloc);

    const utmParams = !isNilOrError(authUser)
      ? {
          source: 'share_idea',
          campaign: 'share_content',
          content: authUser.data.id,
        }
      : {
          source: 'share_idea',
          campaign: 'share_content',
        };

    return (
      <SharingButton
        url={ideaUrl}
        twitterMessage={formatMessage(messages.twitterMessage, {
          ideaTitle,
        })}
        emailSubject={formatMessage(messages.emailSharingSubject, {
          ideaTitle,
        })}
        emailBody={formatMessage(messages.emailSharingBody, {
          ideaUrl,
          ideaTitle,
        })}
        utmParams={utmParams}
        buttonComponent={buttonComponent}
      />
    );
  }

  return null;
};

export default injectIntl(Component);
