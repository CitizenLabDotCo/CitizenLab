import * as React from 'react';
import * as Rx from 'rxjs';
import * as _ from 'lodash';
import { currentTenantStream } from 'services/tenant';
// tslint:disable-next-line:no-vanilla-formatted-messages
import { injectIntl as originalInjectIntl, ComponentConstructor, InjectedIntlProps, InjectIntlConfig } from 'react-intl';
import { localeStream } from 'services/locale';
import { getLocalized } from 'utils/i18n';

type State = {
  orgName: string;
  orgType: string,
};

function buildComponent<P>(Component: ComponentConstructor<P & InjectedIntlProps>) {
  return class NewFormatMessageComponent extends React.PureComponent<P & InjectedIntlProps, State> {

    subscriptions: Rx.Subscription[];

    componentWillMount() {
      const locale$ = localeStream().observable;
      const currentTenant$ = currentTenantStream().observable;

      this.subscriptions = [
        Rx.Observable.combineLatest(
          locale$,
          currentTenant$
        ).subscribe(([locale, tenant]) => {
          const tenantLocales = tenant.data.attributes.settings.core.locales;
          const orgName = getLocalized(tenant.data.attributes.settings.core.organization_name, locale, tenantLocales);
          this.setState({
            orgName,
            orgType: tenant.data.attributes.settings.core.organization_type,
          });
        })
      ];
    }

    formatMessageReplacement = (messageDescriptor: ReactIntl.FormattedMessage.MessageDescriptor, values?: {
      [key: string]: string | number | boolean | Date;
    } | undefined): string => {
      return this.props.intl.formatMessage(messageDescriptor, { orgName: this.state.orgName, orgType: this.state.orgType, ...values || {} });
    }

    render() {
      const intlReplacement = _.clone(this.props.intl);
      intlReplacement.formatMessage = this.formatMessageReplacement;

      return (
        <Component {...this.props} intl={intlReplacement} />
      );
    }

  };
}

export default function injectIntl<P>(component: ComponentConstructor<P & InjectedIntlProps>, options?: InjectIntlConfig):
  React.ComponentClass<P> & { WrappedComponent: ComponentConstructor<P & InjectedIntlProps> } {
  return originalInjectIntl(buildComponent<P>(component), options);
}
