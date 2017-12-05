import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// components
import FilterSelector from 'components/FilterSelector';

// services
import { currentTenantStream, ITenant } from 'services/tenant';
import { localeStream } from 'services/locale';
import { topicsStream, ITopics } from 'services/topics';

// i18n
import { getLocalized } from 'utils/i18n';
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

type Props = {
  id?: string | undefined;
  onChange: (value: any) => void;
};

type State = {
  currentTenant: ITenant | null;
  locale: string | null;
  topics: ITopics | null;
  selectedValues: string[];
};

class SelectTopic extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      currentTenant: null,
      locale: null,
      topics: null,
      selectedValues: []
    };
  }

  componentWillMount() {
    const currentTenant$ = currentTenantStream().observable;
    const locale$ = localeStream().observable;
    const topics$ = topicsStream().observable;

    this.subscriptions = [
      Rx.Observable.combineLatest(
        currentTenant$,
        locale$,
        topics$
      ).subscribe(([currentTenant, locale, topics]) => {
        this.setState({ currentTenant, locale, topics });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnChange = (selectedValues) => {
    this.setState({ selectedValues });
    this.props.onChange(selectedValues);
  }

  render() {
    const { currentTenant, locale, topics, selectedValues } = this.state;
    const { formatMessage } = this.props.intl;
    let options: any = [];

    if (currentTenant && locale && topics && topics.data && topics.data.length > 0) {
      const currentTenantLocales = currentTenant.data.attributes.settings.core.locales;

      options = topics.data.map((topic) => {
        return {
          text: getLocalized(topic.attributes.title_multiloc, locale, currentTenantLocales),
          value: topic.id
        };
      });
    }

    return (
      <FilterSelector
        title={formatMessage(messages.topicsTitle)}
        name="topics"
        selected={selectedValues}
        values={options}
        onChange={this.handleOnChange}
        multiple={true}
      />
    );
  }
}

export default injectIntl<Props>(SelectTopic);
