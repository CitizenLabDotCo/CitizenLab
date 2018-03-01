import * as React from 'react';
import Icon from 'components/UI/Icon';
import styled from 'styled-components';

const Container: any = styled.div`
  flex: 0 0 ${(props: any) => props.size};
  width: ${(props: any) => props.size};
  height: ${(props: any) => props.size};
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: solid 1px #aaa;
  border-radius: 3px;
  background: #fff;
  background: ${(props: any) => props.checked ? props.theme.colors.success : '#fff'};
  border-color: ${(props: any) => props.checked ? props.theme.colors.success : '#aaa'};
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.15);

  &:hover {
    border-color: ${(props: any) => props.checked ? props.theme.colors.success : '#333'};
  }
`;

const CheckmarkIcon = styled(Icon)`
  fill: #fff;
  height: 55%;
`;

type Props = {
  size: string;
  checked: boolean;
  toggle: (event: React.FormEvent<MouseEvent>) => void;
};

type State = {};

export default class Checkbox extends React.PureComponent<Props, State> {
  handleOnClick = (event: React.FormEvent<MouseEvent>) => {
    event.preventDefault();
    this.props.toggle(event);
  }

  render() {
    const className = this.props['className'];
    const { size, checked } = this.props;

    return (
      <Container className={className} checked={checked} size={size} onClick={this.handleOnClick}>
        {checked && <CheckmarkIcon name="checkmark" />}
      </Container>
    );
  }
}
