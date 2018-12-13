import React, { PureComponent } from 'react';
import { isString, isEmpty } from 'lodash-es';

// components
import Icon from 'components/UI/Icon';
import Input from 'components/UI/Input';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import Label from 'components/UI/Label';

const SearchForm = styled.form`
  flex: 1 0 auto;
  width: 200px;
  display: flex;
  align-items: center;
  align-self: stretch;
  margin: 0;
  padding: 0;
  position: relative;
`;

const StyledInput = styled(Input)`
  width: 100%;

  input {
    width: 100%;
    padding-right: 45px;
  }
`;

const StyledIcon = styled(Icon)`
  fill: #84939E;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 21px;
  height: 21px;
  margin: 0 0 0 -36px;
  margin-top: -1px;
  z-index: 2;

  &.clear {
    cursor: pointer;

    ${StyledIcon} {
      height: 13px;
    }

    &:hover {
      ${StyledIcon} {
        fill: #000;
      }
    }
  }
`;

interface Props {
  value: string;
  onChange: (arg: string) => void;
  onFocus?: () => void;
  className?: string;
}

type State = {};

class SearchInput extends PureComponent<Props & InjectedIntlProps, State> {
  handleOnChange = (value: string) => {
    this.props.onChange(value);
  }

  handleOnClick = (event) => {
    event.preventDefault();

    const { value } = this.props;

    if (isString(value) && !isEmpty(value)) {
      this.props.onChange('');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const className = this.props['className'];
    const { value, onFocus } = this.props;
    const { formatMessage } = this.props.intl;
    const iconName = (isString(value) && !isEmpty(value) ? 'close2' : 'search');
    const canClear = (isString(value) && !isEmpty(value));
    const placeholder = formatMessage(messages.searchPlaceholder);

    return (
      <SearchForm className={className} onSubmit={this.handleSubmit}>
        <Label htmlFor="e2e-ideas-search" hidden value={placeholder} />
        <StyledInput
          id="e2e-ideas-search"
          value={value}
          type="text"
          placeholder={placeholder}
          onChange={this.handleOnChange}
          onFocus={onFocus}
        />
        <IconWrapper onClick={this.handleOnClick} className={canClear ? 'clear' : ''}>
          <StyledIcon name={iconName} />
        </IconWrapper>
      </SearchForm>
    );
  }
}

export default injectIntl<Props>(SearchInput);
