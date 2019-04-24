import React, { PureComponent } from 'react';
import { Subscription, combineLatest } from 'rxjs';

// components
import FilterSelector from 'components/FilterSelector';

// services
import { currentTenantStream, ITenant } from 'services/tenant';
import { localeStream } from 'services/locale';
import { areasStream, IAreas } from 'services/areas';

// i18n
import { getLocalized } from 'utils/i18n';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// typings
import { Locale } from 'typings';

type Props = {
  selectedAreas: string[];
  onChange: (value: any) => void;
};

type State = {
  currentTenant: ITenant | null;
  locale: Locale | null;
  areas: IAreas | null;
};

class SelectAreas extends PureComponent<Props, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      currentTenant: null,
      locale: null,
      areas: null
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    const currentTenant$ = currentTenantStream().observable;
    const locale$ = localeStream().observable;
    const areas$ = areasStream().observable;

    this.subscriptions = [
      combineLatest(
        currentTenant$,
        locale$,
        areas$
      ).subscribe(([currentTenant, locale, areas]) => {
        this.setState({
          currentTenant,
          locale,
          areas
        });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnChange = (selectedAreas: string[]) => {
    this.props.onChange((selectedAreas || []));
  }

  render() {
    const { currentTenant, locale, areas } = this.state;
    const { selectedAreas } =  this.props;
    let options: {
      text: string,
      value: string
    }[] = [];

    if (currentTenant && locale && areas && areas.data) {
      const currentTenantLocales = currentTenant.data.attributes.settings.core.locales;

      options = areas.data.map((area) => ({
        text: getLocalized(area.attributes.title_multiloc, locale, currentTenantLocales),
        value: area.id
      }));

      if (options && options.length > 1) {
        return (
          <FilterSelector
            title={<FormattedMessage {...messages.areasTitle} />}
            name="areas"
            selected={selectedAreas}
            values={options}
            onChange={this.handleOnChange}
            multiple={true}
            right="-5px"
            mobileLeft="-5px"
          />
        );
      }
    }

    return null;
  }
}

export default SelectAreas;
