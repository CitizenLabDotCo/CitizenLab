import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { appenDableName } from './utils';

class MultiSelect extends React.PureComponent {
  constructor(props) {
    super();
    const { name } = props;
    const { formatMessage } = props.intl;

    const toAppendName = appenDableName(name);
    const placeholder = formatMessage(messages[`placeholder${toAppendName}`]);
    const label = formatMessage(messages[`label${toAppendName}`]);
    const noResult = formatMessage(messages.noResultsMultiSelect);
    this.text = { placeholder, label, noResult };
  }

  handleChange = (event, { value }) => {
    const { name } = this.props;
    this.props.action(name, value);
  };

  render() {
    const { name, options, value } = this.props;
    const { label, placeholder, noResult } = this.text;

    return (
      <Form.Field>
        <label htmlFor={name}>{label}</label>
        <Dropdown
          closeOnChange
          multiple
          scrolling
          search
          selection
          fluid
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          options={options}
          noResultsMessage={noResult}
        />
      </Form.Field>
    );
  }
}

MultiSelect.propTypes = {
  value: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  text: PropTypes.string,
  intl: intlShape.isRequired,
};

MultiSelect.defaultProps = {
  value: [],
};

export default injectIntl(MultiSelect);
