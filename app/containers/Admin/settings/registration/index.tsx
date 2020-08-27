import React, { PureComponent } from 'react';
import AllCustomFields from './CustomFields/All';
import messages from '../messages';
import {
  Section,
  SectionTitle,
  SectionDescription,
} from 'components/admin/Section';
import { FormattedMessage } from 'utils/cl-intl';

type Props = {};

type State = {};

class SettingsRegistrationTab extends PureComponent<Props, State> {
  render() {
    return (
      <Section key={'signup_fields'}>
        <SectionTitle>
          <FormattedMessage {...messages.titleRegistrationFields} />
        </SectionTitle>
        <SectionDescription>
          <FormattedMessage {...messages.subtitleRegistrationFields} />
        </SectionDescription>
        <AllCustomFields />
      </Section>
    );
  }
}

export default SettingsRegistrationTab;
