import React, { PureComponent } from 'react';
import { TRule, ruleTypeConstraints } from '../rules';

type Props = {
  rule: TRule,
  value: any,
  onChange: (value: any) => void;
};

type State = {};

class ValueSelector extends PureComponent<Props, State> {

  ruleToValueSelector = (rule: TRule) => {
    if (rule.ruleType) {
      const ruleType = rule.ruleType;

      if (rule.predicate) {
        return ruleTypeConstraints[ruleType][rule.predicate];
      }
    }
  }

  render() {
    const ValueComponent = this.ruleToValueSelector(this.props.rule);

    return ValueComponent && (
      <ValueComponent
        {...this.props}
      />
    );
  }
}

export default ValueSelector;
