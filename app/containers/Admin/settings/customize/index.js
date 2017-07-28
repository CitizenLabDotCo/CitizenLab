import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { injectTFunc } from 'containers/T/utils';
import { FormattedMessage } from 'react-intl';
import Label from 'components/UI/Label';
import Button from 'components/UI/Button';
import Upload from 'components/UI/Upload';
import ColorPickerInput from 'components/UI/ColorPickerInput';
// import { makeSelectCurrentTenant } from '../selectors';
import { makeSelectCurrentTenantImm } from 'utils/tenant/selectors';
import { saveSettings } from '../actions';
import messages from '../messages';


class SettingsCustomizeTab extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      changedAttributes: fromJS({}),
      temp_logo: [],
      temp_header_bg: [],
    };
  }

  changeAttribute(path, value) {
    this.setState({
      changedAttributes: this.state.changedAttributes.setIn(path, value),
    });
  }

  changeImage(name, value) {
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = () => {
      this.setState({
        changedAttributes: this.state.changedAttributes.set(name, reader.result),
        [`temp_${name}`]: [value],
      });
    };
  }

  removeImage(name) {
    this.setState({
      changedAttributes: this.state.changedAttributes.set(name, null),
      [`temp_${name}`]: [],
    });
  }

  save = (e) => {
    e.preventDefault();
    this.props.saveSettings(this.props.tenant.get('id'), this.state.changedAttributes.toJS());
  }

  render() {
    const updatedTenant = this.props.tenant.update('attributes', (t) => {
      return t.mergeDeep(this.state.changedAttributes);
    });
    const settings = updatedTenant.getIn(['attributes', 'settings']);
    return (
      <div>


        <h1><FormattedMessage {...messages.titleBranding} /></h1>
        <p><FormattedMessage {...messages.subTitleBranding} /></p>

        <div>
          <Label><FormattedMessage {...messages.mainColor} /></Label>
          <ColorPickerInput
            value={settings.getIn(['core', 'color_main'])}
            onChange={(value) => this.changeAttribute(['settings', 'core', 'color_main'], value)}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.menuBgColor} /></Label>
          <ColorPickerInput
            value={settings.getIn(['core', 'color_menu_bg'])}
            onChange={(value) => this.changeAttribute(['settings', 'core', 'color_menu_bg'], value)}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.logo} /></Label>
          <Upload
            accept="image/*"
            maxItems={1}
            items={this.state.temp_logo}
            onAdd={(value) => this.changeImage('logo', value)}
            onRemove={() => this.removeImage('logo')}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.headerBg} /></Label>
          <Upload
            accept="image/*"
            maxItems={1}
            items={this.state.temp_header_bg}
            onAdd={(value) => this.changeImage('header_bg', value)}
            onRemove={() => this.removeImage('header_bg')}
          />
        </div>

        <h1><FormattedMessage {...messages.titleSignupFields} /></h1>
        <p><FormattedMessage {...messages.subTitleSignupFields} /></p>


        <div>
          <Label><FormattedMessage {...messages.gender} /></Label>
          <Checkbox
            slider
            checked={settings.getIn(['demographic_fields', 'gender'])}
            onChange={(event, value) => this.changeAttribute(['settings', 'demographic_fields', 'gender'], value.checked)}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.domicile} /></Label>
          <Checkbox
            slider
            checked={settings.getIn(['demographic_fields', 'domicile'])}
            onChange={(event, value) => this.changeAttribute(['settings', 'demographic_fields', 'domicile'], value.checked)}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.birthyear} /></Label>
          <Checkbox
            slider
            checked={settings.getIn(['demographic_fields', 'birthyear'])}
            onChange={(event, value) => this.changeAttribute(['settings', 'demographic_fields', 'birthyear'], value.checked)}
          />
        </div>

        <div>
          <Label><FormattedMessage {...messages.education} /></Label>
          <Checkbox
            slider
            checked={settings.getIn(['demographic_fields', 'education'])}
            onChange={(event, value) => this.changeAttribute(['settings', 'demographic_fields', 'education'], value.checked)}
          />
        </div>

        <Button onClick={this.save}>
          <FormattedMessage {...messages.save} />
        </Button>

      </div>
    );
  }
}

SettingsCustomizeTab.propTypes = {
  tenant: ImmutablePropTypes.map.isRequired,
  saveSettings: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tenant: makeSelectCurrentTenantImm(),
});

const mapDispatchToProps = {
  saveSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectTFunc(SettingsCustomizeTab));
