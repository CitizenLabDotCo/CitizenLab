import * as React from 'react';
import { get, map, merge, set } from 'lodash';
import * as Rx from 'rxjs/Rx';

// typings
import { API, Multiloc, IOption } from 'typings';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import { appLocalePairs } from 'i18n';
import messages from '../messages';

// components
import InputMultiloc from 'components/UI/InputMultiloc';
import Input from 'components/UI/Input';
import Label from 'components/UI/Label';
import TextAreaMultiloc from 'components/UI/TextAreaMultiloc';
import MultipleSelect from 'components/UI/MultipleSelect';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import { Section, SectionTitle, SectionField } from 'components/admin/Section';

// services
import {
  currentTenantStream,
  updateTenant,
  IUpdatedTenantProperties,
  ITenantData
} from 'services/tenant';

// Utils
import getSubmitState from 'utils/getSubmitState';

interface Props {}

interface State {
  loading: boolean;
  saved: boolean;
  attributesDiff: IUpdatedTenantProperties;
  tenant: ITenantData | null;
  errors: {
    [fieldName: string]: API.Error[]
  };
  hasUrlError: boolean;
}

export default class SettingsGeneralTab extends React.PureComponent<Props, State> {
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      attributesDiff: {},
      tenant: null,
      loading: false,
      errors: {},
      hasUrlError: false,
      saved: false,
    };
  }

  componentDidMount() {
    const currentTenant$ = currentTenantStream().observable;

    this.subscriptions = [
      currentTenant$.subscribe((currentTenant) => {
        this.setState({ tenant: currentTenant.data });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  handleCoreMultilocSettingOnChange = (propertyName: string) => (multiloc: Multiloc) => {
    this.setState((state) => ({
      attributesDiff: {
        ...state.attributesDiff,
        settings: {
          ...get(state.attributesDiff, 'settings', {}),
          core: {
            ...get(state.attributesDiff, 'settings.core', {}),
            [propertyName]: multiloc
          }
        }
      }
    }));
  }

  handleLocalesOnChange = (selectedLocaleOptions: IOption[]) => {
    this.setState((state) => ({
      attributesDiff: {
        ...state.attributesDiff,
        settings: {
          ...get(state.attributesDiff, 'settings', {}),
          core: {
            ...get(state.attributesDiff, 'settings.core', {}),
            locales: selectedLocaleOptions.map(option => option.value)
          }
        }
      }
    }));
  }

  handleUrlOnChange = (url) => {
    this.setState((state) => ({
      hasUrlError: false,
      attributesDiff: {
        ...state.attributesDiff,
        settings: {
          ...get(state.attributesDiff, 'settings', {}),
          core: {
            ...get(state.attributesDiff, 'settings.core', {}),
            organization_site: url
          }
        }
      }
    }));
  }

  save = (event: React.FormEvent<any>) => {
    event.preventDefault();

    const { tenant, attributesDiff } = this.state;

    if (tenant) {
      this.setState({ loading: true, saved: false, hasUrlError: false, errors: {} });

      updateTenant(tenant.id, attributesDiff).then(() => {
        this.setState({ saved: true, attributesDiff: {}, loading: false });
      }).catch((e) => {
        const errors = e.json.errors;
        this.setState({ errors, loading: false });
        // This error check uses an undocumented API from the backend.
        // Needs to be reimplemented to use frontend validation when converted to a Formik form.
        if (errors.settings && errors.settings.length > 0) {
          const foundUrlError = !!errors.settings.find((error) => error.error.fragment === '#/core/organization_site');
          if (foundUrlError) {
            this.setState({ hasUrlError: true });
          }
        }

      });
    }
  }

  localeOptions = () => {
    return map(appLocalePairs, (label, locale) => ({
      label,
      value: locale,
    }));
  }

  localesToOptions = (locales) => {
    return locales.map((locale) => ({
      value: locale,
      label: appLocalePairs[locale],
    }));
  }

  render() {
    const { tenant } = this.state;

    if (tenant) {
      const { errors, saved, attributesDiff, hasUrlError } = this.state;
      const updatedLocales = get(attributesDiff, 'settings.core.locales');

      let tenantAttrs = (tenant ? merge({}, tenant.attributes, attributesDiff) : merge({}, attributesDiff));

      // Prevent merging the arrays of locales
      if (updatedLocales) {
        tenantAttrs = set(tenantAttrs, 'settings.core.locales', updatedLocales);
      }

      const tenantLocales: string[] | null = get(tenantAttrs, 'settings.core.locales', null);
      const organizationType: string | null = get(tenantAttrs, 'settings.core.organization_type', null);
      const tenantSite: string | null = get(tenantAttrs, 'settings.core.organization_site', null);
      const organizationNameMultiloc: Multiloc | null = get(tenantAttrs, 'settings.core.organization_name', null);
      const metaTitleMultiloc: Multiloc | null = get(tenantAttrs, 'settings.core.meta_title', null);
      const metaDescriptionMultiloc: Multiloc | null = get(tenantAttrs, 'settings.core.meta_description', null);
      const localeOptions = this.localeOptions();
      const selectedLocaleOptions = this.localesToOptions(tenantLocales);

      return (
        <form onSubmit={this.save}>
          <Section>
            <SectionTitle>
              <FormattedMessage {...messages.titleBasic} />
            </SectionTitle>

            <SectionField>
              <InputMultiloc
                type="text"
                id="organization_name"
                label={<FormattedMessage {...messages.organizationName} values={{ type: organizationType }} />}
                valueMultiloc={organizationNameMultiloc}
                onChange={this.handleCoreMultilocSettingOnChange('organization_name')}
              />
            </SectionField>

            <SectionField>
              <Label>
                <FormattedMessage {...messages.languages} />
              </Label>
              <MultipleSelect
                placeholder=""
                value={selectedLocaleOptions}
                onChange={this.handleLocalesOnChange}
                options={localeOptions}
              />
            </SectionField>

            <SectionField>
              <InputMultiloc
                type="text"
                id="meta_title"
                label={<FormattedMessage {...messages.metaTitle} />}
                valueMultiloc={metaTitleMultiloc}
                onChange={this.handleCoreMultilocSettingOnChange('meta_title')}
              />
            </SectionField>

            <SectionField>
              <TextAreaMultiloc
                label={<FormattedMessage {...messages.metaDescription} />}
                name="meta_description"
                rows={5}
                valueMultiloc={metaDescriptionMultiloc}
                onChange={this.handleCoreMultilocSettingOnChange('meta_description')}
              />
            </SectionField>

            <SectionField>
              <Label>
                <FormattedMessage {...messages.urlTitle} />
              </Label>
              <Input
                type="text"
                placeholder="https://..."
                onChange={this.handleUrlOnChange}
                value={tenantSite}
                error={hasUrlError ? <FormattedMessage {...messages.urlError} /> : null}
              />
            </SectionField>

            <SubmitWrapper
              loading={this.state.loading}
              status={getSubmitState({ errors, saved, diff: attributesDiff })}
              messages={{
                buttonSave: messages.save,
                buttonSuccess: messages.saveSuccess,
                messageError: messages.saveErrorMessage,
                messageSuccess: messages.saveSuccessMessage,
              }}
            />
          </Section>
        </form>
      );
    }

    return null;
  }
}
