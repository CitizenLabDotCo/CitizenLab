// Libraries
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// Components
import { Input, LocaleSwitcher } from 'cl2-component-library';
import { TextCell, Row } from 'components/admin/ResourceList';
import Button from 'components/UI/Button';

// Resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';

// Typings
import { Multiloc, Locale } from 'typings';

// Services
import { addPollOption, updatePollOption } from 'services/pollOptions';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

/*
* edit mode : titleMultiloc and optionId defined, question Id not used
* new mode : question Id defined, titleMultiloc and optionId not used
*/
interface InputProps {
  titleMultiloc?: Multiloc;
  mode: 'new' | 'edit';
  questionId?: string;
  closeRow: () => void;
  optionId?: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
}

interface Props extends DataProps, InputProps { }

interface State {
  selectedLocale: Locale | null;
  titleMultiloc: Multiloc;
}

class FormOptionRow extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedLocale: !isNilOrError(props.locale) ? props.locale : null,
      titleMultiloc: props.titleMultiloc || {}
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { optionId, titleMultiloc, locale } = this.props;

    if (prevProps.optionId !== optionId) {
      this.setState({ titleMultiloc: titleMultiloc || {} });
    }

    if (prevProps.locale !== locale && !isNilOrError(locale)) {
      this.setState({ selectedLocale: locale });
    }
  }

  onSelectedLocaleChange = (selectedLocale: Locale) => {
    this.setState({ selectedLocale });
  }

  onChangeTitle = (value: string, locale: Locale | undefined) => {
    if (locale) {
      this.setState((state) => ({
        titleMultiloc: {
          ...state.titleMultiloc,
          [locale]: value
        }
      }));
    }
  }

  onSave = () => {
    const { mode, questionId, closeRow, optionId } = this.props;
    const { titleMultiloc } = this.state;

    if (mode === 'new' && questionId) {
      addPollOption(questionId, titleMultiloc).then(() => {
        closeRow();
      });
    }

    if (mode === 'edit' && optionId) {
      updatePollOption(optionId, titleMultiloc).then(() => {
        closeRow();
      });
    }
  }

  render() {
    const { selectedLocale, titleMultiloc } = this.state;
    const { closeRow, tenantLocales } = this.props;

    return (
      <Row className="e2e-form-option-row">
        <TextCell>
          {selectedLocale &&
            <LocaleSwitcher
              onSelectedLocaleChange={this.onSelectedLocaleChange}
              locales={!isNilOrError(tenantLocales) ? tenantLocales : []}
              selectedLocale={selectedLocale}
              values={{ titleMultiloc }}
            />
          }
        </TextCell>

        <TextCell className="expand">
          {selectedLocale &&
            <Input
              autoFocus
              value={titleMultiloc?.[selectedLocale]}
              locale={selectedLocale}
              type="text"
              onChange={this.onChangeTitle}
            />
          }
        </TextCell>

        <Button
          className="e2e-form-option-save"
          buttonStyle="secondary"
          onClick={this.onSave}
        >
          <FormattedMessage {...messages.saveOption} />
        </Button>

        <Button
          className="e2e-form-option-cancel"
          buttonStyle="secondary"
          onClick={closeRow}
        >
          <FormattedMessage {...messages.cancelOption} />
        </Button>
      </Row>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />
});

const FormOptionRowWithData = (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <FormOptionRow {...dataProps} {...inputProps} />}
  </Data>
);

export default FormOptionRowWithData;
