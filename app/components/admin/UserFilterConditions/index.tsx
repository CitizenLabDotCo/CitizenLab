import React from 'react';
import { clone } from 'lodash';
import styled from 'styled-components';

import { TRule } from './rules';
import Rule from './Rule';

import Button from 'components/UI/Button';

import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// tracking
import { injectTracks } from 'utils/analytics';
import tracks from 'containers/Admin/users/tracks';

// styling
import { colors } from 'utils/styleUtils';

const Container = styled.div`
  width: 560px;
`;

const RulesList = styled.div`
  margin: 0 -5px;
`;

const AddButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  margin: 0;
  margin-top: 15px;
  padding: 0;

  &:hover {
    .buttonIcon {
      fill: ${colors.clBlue2Darkest};
    }
  }

  .button {
    padding: 0;
  }

  .buttonIcon {
    fill: ${colors.clBlueDark};
  }

  .buttonText {
    color: ${colors.clBlue2Darkest};
  }
`;

type Props = {
  rules: TRule[];
  onChange: (rules: TRule[]) => void;
};

type State = {};

interface Tracks {
  trackConditionAdd: Function;
}

class UserFilterConditions extends React.PureComponent<Props & Tracks, State> {

  handleOnChangeRule = (index) => (rule: TRule) => {
    const newRules = clone(this.props.rules);
    newRules.splice(index, 1, rule);
    this.props.onChange(newRules);
  }

  handleOnRemoveRule = (index) => () => {
    const newRules = clone(this.props.rules);
    newRules.splice(index, 1);
    this.props.onChange(newRules);
  }

  handleOnAddRule = () => {
    this.props.trackConditionAdd();
    const newRules = clone(this.props.rules);
    newRules.push({});
    this.props.onChange(newRules);
  }

  render() {
    const { rules } = this.props;
    return (
      <Container>
        <RulesList>
          {rules.map((rule, index) => (
            <Rule
              key={index}
              rule={rule}
              onChange={this.handleOnChangeRule(index)}
              onRemove={this.handleOnRemoveRule(index)}
              showLabels={index === 0}
            />
          ))}
        </RulesList>
        <AddButton
          className="e2e-add-condition-button"
          onClick={this.handleOnAddRule}
          icon="plus-circle"
          style="text"
          justify="left"
        >
          <FormattedMessage {...messages.addCondition} />
        </AddButton>
      </Container>
    );
  }
}

const UserFilterConditionsWithHoc = injectTracks<Props>({
  trackConditionAdd: tracks.conditionAdd,
})(UserFilterConditions);

export default UserFilterConditionsWithHoc;

import { FieldProps } from 'formik';

export class FormikUserFilterConditions extends React.Component<Props & FieldProps> {
  handleOnChange = (newValue) => {
    this.props.form.setFieldValue(this.props.field.name, newValue);
  }

  render() {
    const { value } = this.props.field;
    return (
      <UserFilterConditionsWithHoc
        {...this.props}
        onChange={this.handleOnChange}
        rules={value}
      />
    );
  }
}
