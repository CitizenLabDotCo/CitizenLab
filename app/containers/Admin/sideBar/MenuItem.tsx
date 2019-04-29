import React from 'react';
import styled from 'styled-components';
import Link from 'utils/cl-router/Link';
import { NavItem } from '.';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import Icon from 'components/UI/Icon';
import CountBadge from 'components/UI/CountBadge';
import HasPermission from 'components/HasPermission';

const Text = styled.div`
  flex: 1;
  color: ${colors.adminLightText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 19px;
  margin-left: 10px;
  display: flex;
  align-items: center;

  ${media.smallerThan1200px`
    display: none;
  `}
`;

const MenuItemLink: any = styled(Link) `
  flex: 0 0 auto;
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 15px;
  padding-bottom: 1px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${(props: any) => props.theme.borderRadius};

  &:hover {
    ${Text} {
      color: #fff;
    };

    .cl-icon {
      .cl-icon-primary {
        fill: ${colors.clIconAccent}
      }
      .cl-icon-accent {
        fill: ${colors.clIconPrimary}
      }
    };
  }

  &.selected {
    background: rgba(0, 0, 0, 0.25);

    ${Text} {
      color: #fff;
    };

    .cl-icon {
      .cl-icon-primary {
        fill: ${colors.clIconAccent}
      }
      .cl-icon-accent {
        fill: ${colors.clIconPrimary}
      }
    };
  }
  ${media.smallerThan1200px`
    width: 70px;
  `}
`;

const IconWrapper = styled.div`
  flex: 0 0 auto;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  route: NavItem;
};

export default ({ route }: Props) => {
  const pathname = location.pathname;
  return (
    <HasPermission action="access" item={{ type: 'route', path: route.link }}>
      <MenuItemLink activeClassName="active" className={`${route.isActive(pathname) ? 'selected' : ''}`} to={route.link}>
        <IconWrapper><Icon name={route.iconName} /></IconWrapper>
        <Text>
          <FormattedMessage {...messages[route.message]} />
          {!!route.count && <CountBadge count={route.count} />}
        </Text>
        {route.isActive(pathname) && <Icon name="arrowLeft" />}
      </MenuItemLink>
    </HasPermission>
  );
};
