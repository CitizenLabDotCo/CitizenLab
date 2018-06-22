import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { mix } from 'polished';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';
import T from 'components/T';
import { isNilOrError } from 'utils/helperUtils';

const StyledCircle: any = styled.circle`
  fill: ${props => mix((props as any).upvoteRatio, 'green', 'red')};
  opacity: 0.75;

  ${props => (props as any).hovered && `
    stroke: grey;
    stroke-width: 3px;
  `}

  ${props => (props as any).selected && `
    stroke: black;
    stroke-width: 2px;
    fill: ${props.theme.selectionColor};
  `}
`;

const StyledText: any = styled.text`
  display: ${props => (props as any).show ? 'inline' : 'none' };
`;

const TextBackground: any = styled.rect`
  fill: #ffffff;
  opacity: 0.4;
  display: ${props => (props as any).show ? 'inline' : 'none' };
`;

type Props = {
  node: any;
  idea: GetIdeaChildProps;
  selected: boolean;
  hovered: boolean;
  onClick?: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

type State = {

};

class IdeaCircle extends PureComponent<Props, State> {

  upvoteRatio = (up, down) => {
    return up / (up + down);
  }
  render() {
    const { node, selected, hovered, idea } = this.props;

    if (isNilOrError(idea)) return null;

    return (
      <>
        <StyledCircle
          r={node.r}
          onClick={this.props.onClick}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          selected={selected}
          hovered={hovered}
          upvoteRatio={this.upvoteRatio(idea.attributes.upvotes_count, idea.attributes.downvotes_count)}
        />
        <T value={idea.attributes.title_multiloc}>
          {(localizedTitle) => (
            <>
              <TextBackground
                width={(localizedTitle.length * 7) + 10}
                height={20}
                y={-35}
                x={-(localizedTitle.length * 7 + 10) / 2}
                show={hovered}
              />
              <StyledText
                x={0}
                y={-25}
                textAnchor="middle"
                alignmentBaseline="central"
                show={hovered}
              >
                {localizedTitle}
              </StyledText>
            </>
          )}
        </T>
      </>
    );
  }
}

export default (inputProps) => (
  <GetIdea id={inputProps.ideaId}>
    {(idea) => <IdeaCircle {...inputProps} idea={idea} />}
  </GetIdea>
);
