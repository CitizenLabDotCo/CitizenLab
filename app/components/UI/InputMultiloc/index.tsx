import React from 'react';
import { Subscription, combineLatest } from 'rxjs';
import { get } from 'lodash-es';

// components
import Input from 'components/UI/Input';
import Label from 'components/UI/Label';

// services
import { localeStream } from 'services/locale';
import { currentTenantStream, ITenant } from 'services/tenant';

// style
import styled from 'styled-components';

// typings
import { Locale, Multiloc } from 'typings';

const Container = styled.div``;

const InputWrapper = styled.div`
  &:not(.last) {
    margin-bottom: 10px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
`;

const LanguageExtension = styled(Label)`
  font-weight: 500;
`;

export type Props = {
  id?: string | undefined;
  valueMultiloc: Multiloc | null | undefined;
  label?: string | JSX.Element | null | undefined;
  labelTooltip?: JSX.Element;
  onChange?: (arg: Multiloc, locale: Locale) => void;
  onBlur?: (arg: React.FormEvent<HTMLInputElement>) => void;
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string | null | undefined;
  errorMultiloc?: Multiloc | null;
  maxCharCount?: number | undefined;
  disabled?: boolean;
  shownLocale?: Locale;
  ariaLabel?: string;
};

type State = {
  locale: Locale | null;
  currentTenant: ITenant | null;
};

export default class InputMultiloc extends React.PureComponent<Props, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      locale: null,
      currentTenant: null
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
      ).subscribe(([locale, currentTenant]) => {
        this.setState({ locale, currentTenant });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnChange = (locale: Locale) => (value: string) => {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.valueMultiloc,
        [locale]: value
      }, locale);
    }
  }

  render() {
    const { locale, currentTenant } = this.state;
    const { shownLocale, label, placeholder, valueMultiloc, errorMultiloc, ariaLabel } = this.props;

    if (locale && currentTenant) {
      const currentTenantLocales = currentTenant.data.attributes.settings.core.locales;

      if (shownLocale) {
        const value = get(valueMultiloc, [shownLocale], null);
        const error = get(errorMultiloc, [shownLocale], null);
        const id = this.props.id && `${this.props.id}-${shownLocale}`;
        return (
          <InputWrapper>
            {label &&
              <LabelWrapper>
                <Label htmlFor={id}>{label}</Label>
              </LabelWrapper>
            }

            <Input
              id={id}
              value={value}
              type={this.props.type}
              placeholder={placeholder}
              error={error}
              onChange={this.handleOnChange(shownLocale)}
              onBlur={this.props.onBlur}
              maxCharCount={this.props.maxCharCount}
              disabled={this.props.disabled}
              ariaLabel={ariaLabel}
            />
          </InputWrapper>
        );
      } else {
        return (
          <Container id={this.props.id} className={`${this.props['className']} e2e-multiloc-input`} >
            {currentTenantLocales.map((currentTenantLocale, index) => {
              const value = get(valueMultiloc, [currentTenantLocale], null);
              const error = get(errorMultiloc, [currentTenantLocale], null);
              const id = this.props.id && `${this.props.id}-${currentTenantLocale}`;

              return (
                <InputWrapper key={currentTenantLocale} className={`${index === currentTenantLocales.length - 1 && 'last'}`}>
                  {label &&
                    <LabelWrapper>
                      <Label htmlFor={id}>{label}</Label>
                      {currentTenantLocales.length > 1 &&
                        <LanguageExtension>{currentTenantLocale.toUpperCase()}</LanguageExtension>
                      }
                    </LabelWrapper>
                  }

                  <Input
                    id={id}
                    value={value}
                    type={this.props.type}
                    placeholder={placeholder}
                    error={error}
                    onChange={this.handleOnChange(currentTenantLocale)}
                    onBlur={this.props.onBlur}
                    maxCharCount={this.props.maxCharCount}
                    disabled={this.props.disabled}
                    ariaLabel={ariaLabel}
                  />
                </InputWrapper>
              );
            })}
        </Container>
        );
      }
    }

    return null;
  }
}
