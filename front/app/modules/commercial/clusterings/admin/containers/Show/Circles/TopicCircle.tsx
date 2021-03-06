import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GetTopic, { GetTopicChildProps } from 'resources/GetTopic';
import { isNilOrError } from 'utils/helperUtils';
import { isNil } from 'lodash-es';
import { D3Node } from './';

const borderColor = 'purple';

const StyledCircle: any = styled.circle`
  position: relative;
  fill: green;
  fill-opacity: 0.2;
  cursor: pointer;

  &:hover {
    stroke: ${borderColor};
    stroke-width: 2px;
  }

  ${(props) =>
    !isNil((props as any).selectionIndex) &&
    `
    stroke: black;
    stroke-width: 2px;
    fill: ${props.theme.comparisonColors[(props as any).selectionIndex]};
  `}
`;

interface InputProps {
  node: D3Node;
  topicId: string;
  selectionIndex: number | null;
  hovered: boolean;
  onClick: (node: D3Node, event: MouseEvent) => void;
  onMouseEnter: (node: D3Node, event: MouseEvent) => void;
  onMouseLeave: (node: D3Node, event: MouseEvent) => void;
}

interface DataProps {
  topic: GetTopicChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class TopicCircle extends PureComponent<Props, State> {
  handleOnClick = (event: MouseEvent) => {
    const { node } = this.props;
    this.props.onClick && this.props.onClick(node, event);
  };

  handleOnMouseEnter = (event: MouseEvent) => {
    const { node } = this.props;
    this.props.onMouseEnter && this.props.onMouseEnter(node, event);
  };

  handleOnMouseLeave = (event: MouseEvent) => {
    const { node } = this.props;
    this.props.onMouseLeave && this.props.onMouseLeave(node, event);
  };

  render() {
    const { node, selectionIndex, hovered, topic } = this.props;

    if (isNilOrError(topic)) return null;

    return (
      <StyledCircle
        transform={`translate(${node.x},${node.y})`}
        r={node.r}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        selectionIndex={selectionIndex}
        hovered={hovered}
      />
    );
  }
}

export default (inputProps: InputProps) => (
  <GetTopic id={inputProps.topicId}>
    {(topic) => <TopicCircle {...inputProps} topic={topic} />}
  </GetTopic>
);
