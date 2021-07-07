import { useEffect } from 'react';
import { InsertConfigurationOptions } from 'typings';

// i18n
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { ITabItem } from 'components/UI/Tabs';

declare module 'modules/commercial/moderation/admin/containers/index' {
  export interface ITabNamesMap {
    warnings: 'warnings';
  }
}

interface Props {
  onData: (data: InsertConfigurationOptions<ITabItem>) => void;
}

const ActivityWarningsTab = ({
  onData,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  useEffect(
    () =>
      onData({
        configuration: {
          name: 'warnings',
          label: formatMessage(messages.warnings),
        },
        insertAfterName: 'read',
      }),
    []
  );
  return null;
};

export default injectIntl(ActivityWarningsTab);