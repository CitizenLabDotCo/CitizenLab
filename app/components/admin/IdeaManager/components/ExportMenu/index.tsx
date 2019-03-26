import React, { PureComponent } from 'react';

// components
import Dropdown from 'components/UI/Dropdown';
import Icon from 'components/UI/Icon';
import ExportButtons from '../ExportButtons';

// style
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { darken } from 'polished';

// typings
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../../messages';

const DropdownButton = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const DropdownButtonText = styled.div`
  color: ${colors.adminTextColor};
  font-size: ${fontSizes.small}px;
  font-weight: 500;
  line-height: ${fontSizes.base}px;
  transition: all 100ms ease-out;
  margin-right: 10px;
`;

const DropdownButtonIcon = styled(Icon)`
  width: 14px;
  height: 18px;
  color: ${colors.clIconSecondary};
  transition: all 100ms ease-out;
  margin-top: 1px;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover,
  &:focus {
    ${DropdownButtonText} {
      color: ${({ theme }) => theme.navbarTextColor ? darken(0.2, theme.navbarTextColor) : colors.text};
    }

    ${DropdownButtonIcon} {
      fill: ${({ theme }) => theme.navbarTextColor ? darken(0.2, theme.navbarTextColor) : colors.text};
    }
  }
`;

interface Props {
  exportType: 'selected_ideas' | 'project' | 'all';
  exportQueryParameter: 'all' | string | string[];
  className?: string;
}

type State = {
  dropdownOpened: boolean;
};

export default class ExportMenu extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpened: false
    };
  }

  removeFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  toggleDropdown = (event: React.FormEvent<any>) => {
    event.preventDefault();
    this.setState(({ dropdownOpened }) => ({ dropdownOpened: !dropdownOpened }));
  }

  render() {
    const { exportQueryParameter, exportType, className } = this.props;
    const { dropdownOpened } = this.state;

      return (
        <Container className={className} onMouseDown={this.removeFocus} onClick={this.toggleDropdown}>
          <DropdownButton>
            <DropdownButtonText>
              <FormattedMessage {...messages.exports} />
            </DropdownButtonText>
            <DropdownButtonIcon name="download" />
          </DropdownButton>

          <Dropdown
            width="100%"
            top="30px"
            right="-5px"
            mobileRight="-5px"
            opened={dropdownOpened}
            onClickOutside={this.toggleDropdown}
            content={(
              <ExportButtons
                exportQueryParameter={exportQueryParameter}
                exportType={exportType}
              />
            )}
          />
        </Container>
      );
  }
}
