import React, { PureComponent } from 'react';
import { EDITABLE_LEGAL_PAGES } from 'services/pages';
import PageEditor from './PageEditor';
import { SectionTitle, SectionDescription } from 'components/admin/Section';

// intl
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

export default class AdminSettingsPages extends PureComponent {
  render() {
    return (
      <>
        <SectionTitle>
          <FormattedMessage {...messages.titlePages} />
        </SectionTitle>
        <SectionDescription>
          <FormattedMessage {...messages.subtitlePages} />
        </SectionDescription>
        {EDITABLE_LEGAL_PAGES.map((slug) => (
          <PageEditor key={slug} slug={slug} />
        ))}
      </>
    );
  }
}
