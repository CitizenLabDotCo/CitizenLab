import React, { PureComponent, ComponentClass } from 'react';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { currentTenantStream } from 'services/tenant';
// tslint:disable-next-line:no-vanilla-formatted-messages
import { injectIntl as originalInjectIntl, ComponentConstructor, InjectedIntlProps, InjectIntlConfig } from 'react-intl';
import { localeStream } from 'services/locale';
import { getLocalized } from 'utils/i18n';

type State = {
  orgName: string | null;
  orgType: string | null;
  loaded: boolean;
};

function buildComponent<P>(Component: ComponentConstructor<P & InjectedIntlProps>) {
  return class NewFormatMessageComponent extends PureComponent<P & InjectedIntlProps, State> {
    subscriptions: Subscription[];

    constructor(props: P) {
      super(props as any);
      this.state = {
        orgName: null,
        orgType: null,
        loaded: false
      };
      this.subscriptions = [];
    }

    componentDidMount() {
      const locale$ = localeStream().observable;
      const currentTenant$ = currentTenantStream().observable;

      this.subscriptions = [
        combineLatest(
          locale$,
          currentTenant$
        ).subscribe(([locale, tenant]) => {
          const tenantLocales = tenant.data.attributes.settings.core.locales;
          const orgName = getLocalized(tenant.data.attributes.settings.core.organization_name, locale, tenantLocales);
          const orgType = tenant.data.attributes.settings.core.organization_type;
          this.setState({ orgName, orgType, loaded: true });
        })
      ];
    }

    componentWillUnmount() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    formatMessageReplacement = (messageDescriptor: ReactIntl.FormattedMessage.MessageDescriptor, values?: {
      [key: string]: string | number | boolean | Date;
    } | undefined): string => {
      return this.props.intl.formatMessage(messageDescriptor, { orgName: this.state.orgName, orgType: this.state.orgType, ...values || {} });
    }

    render() {
      const { loaded } = this.state;

      if (loaded) {
        const intlReplacement = {
          ...(this.props.intl as object),
          formatMessage: this.formatMessageReplacement
        };

        return <Component {...this.props} intl={intlReplacement} />;
      }

      return null;
    }
  };
}

export default function injectIntl<P>(component: ComponentConstructor<P & InjectedIntlProps>, options?: InjectIntlConfig):
  ComponentClass<P> & { WrappedComponent: ComponentConstructor<P & InjectedIntlProps> } {
  return originalInjectIntl(buildComponent<P>(component), options);
}
