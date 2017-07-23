import * as React from 'react';
import styledComponents, { keyframes } from 'styled-components';
import * as _ from 'lodash';
const styled = styledComponents;

const rotate = keyframes`
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
`;

interface IStyledSpinner {
  size: string;
  thickness: string;
  color: string;
}

const StyledSpinner: any = styled.div`
  width: ${(props: IStyledSpinner) => props.size};
  height: ${(props: IStyledSpinner) => props.size};
  animation: ${rotate} 700ms infinite linear;
  border-style: solid;
  border-right-color: transparent !important;
  border-width: ${(props: IStyledSpinner) => props.thickness};
  border-color: ${(props: IStyledSpinner) => props.color};
  border-radius: 50%;
`;

const Spinner: React.SFC<ISpinner> = ({ size, thickness, color }) => {
  size = (size || '26px');
  thickness = (thickness || '3px');
  color = (color || '#fff');

  return (<StyledSpinner size={size} thickness={thickness} color={color} />);
};

interface ISpinner {
  size?: string;
  thickness?: string;
  color?: string;
}

export default Spinner;
