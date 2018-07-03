import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Icon from 'components/UI/Icon';
import { colors } from 'utils/styleUtils';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 5px;
  background: ${colors.clBlueDarkBg};
`;

const StyledIcon = styled(Icon)`
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  fill: ${colors.clBlueDark};
  padding: 0px;
  margin: 0px;
  margin-right: 12px;
`;

const Text = styled.div`
  color: ${colors.clBlueDark};
  font-size: 16px;
  line-height: 21px;
  font-weight: 400;

  a {
    color: ${colors.clBlueDark};
    font-weight: 400;
    text-decoration: underline;

    &:hover {
      color: ${darken(0.15, colors.clBlueDark)};
    }
  }

  strong {
    font-weight: 600;
  }
`;

interface Props {
  text?: string | JSX.Element;
  children?: string | JSX.Element;
}

export default class Warning extends PureComponent<Props> {
  render() {
    const className = this.props['className'];
    const { text, children } = this.props;

    return (
      <Container className={className}>
        <StyledIcon name="info" />
        <Text>
          {text || children}
        </Text>
      </Container>
    );
  }
}
