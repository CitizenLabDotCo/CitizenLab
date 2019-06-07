import React, { memo, useCallback } from 'react';

// components
import Icon from 'components/UI/Icon';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// utils
import eventEmitter from 'utils/eventEmitter';

// styling
import styled from 'styled-components';
import { media, colors } from 'utils/styleUtils';
import { lighten } from 'polished';

const Container = styled.div`
  height: ${props => props.theme.mobileTopBarHeight}px;
  background: #fff;
  border-bottom: solid 1px ${colors.separation};
`;

const TopBarInner = styled.div`
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.biggerThanMinTablet`
    padding-left: 30px;
    padding-right: 30px;
  `}
`;

const Left = styled.div`
  height: 48px;
  align-items: center;
  display: flex;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div``;

const CloseIcon = styled(Icon)`
  height: 14px;
  fill: ${colors.label};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: fill 100ms ease-out;
`;

const CloseButton = styled.button`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-right: 6px;
  margin-left: -2px;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  border: solid 1px ${lighten(0.4, colors.label)};
  transition: all 100ms ease-out;

  &:hover {
    border-color: #000;

    ${CloseIcon} {
      fill: #000;
    }
  }
`;

interface Props {
  className?: string;
}

const TopBar = memo<Props>(({ className }) => {

  const onClose = useCallback(() => {
    eventEmitter.emit('IdeaFiltersTopBar', 'closeIdeaFilters', null);
  }, []);

  const onClear = useCallback(() => {
    eventEmitter.emit('IdeaFiltersTopBar', 'clearIdeaFilters', null);
  }, []);

  return (
    <Container className={className}>
      <TopBarInner>
        <Left>
          <CloseButton onClick={onClose}>
            <CloseIcon name="close3" />
          </CloseButton>
        </Left>
        <Center>
          <FormattedMessage {...messages.filters} />
        </Center>
        <Right>
          <button onClick={onClear}>
            <FormattedMessage {...messages.clearAll} />
          </button>
        </Right>
      </TopBarInner>
    </Container>
  );
});

export default TopBar;
