import React, { memo } from 'react';

// components
import StatusLabel from 'components/UI/StatusLabel';

// styles
import { colors } from 'utils/styleUtils';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// types
import { PublicationStatus } from 'resources/GetProjects';

interface Props {
  publicationStatus: PublicationStatus;
}

const PublicationStatusLabel = memo<Props>(({ publicationStatus }) => {
  if (publicationStatus !== 'published') {
    const publicationStatusColor = {
      draft: 'orangered',
      archived: colors.clRedError,
    }[publicationStatus];

    return (
      <StatusLabel
        text={<FormattedMessage {...messages[publicationStatus]} />}
        color={publicationStatusColor}
      />
    );
  }

  return null;
});

export default PublicationStatusLabel;
