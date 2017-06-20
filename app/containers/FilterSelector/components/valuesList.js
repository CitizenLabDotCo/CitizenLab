// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

// Components
import Icon from 'components/Icon';

// Styles
const StyledList = styled.div`
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #eaeaea;
  padding: 10px;
  position: absolute;
  z-index: 10;

  ::after {
    border-color: white;
    border-left-color: transparent;
    border-right-color: transparent;
    border-style: solid;
    border-top-color: transparent;
    border-width: 1rem;
    content: "";
    display: block;
    position:absolute;
    top: -2rem;
  }
`;

const ListWrapper = styled.ul`
  list-style: none;
  margin: 0;
  max-height: 10em;
  overflow-y: auto;
  padding: 0;
`;

const StyledOption = styled.li`
  padding: .8rem;
  color: #888;

  :hover, :focus {
    background-color: #f9f9f9;
    color: #222;
  }
`;

const Checkmark = styled.span`
  background: ${(props) => props.selected ? '#32b67a' : '#fff'};
  border-color: ${(props) => props.selected ? '#32b67a' : '#a6a6a6'};
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, .1);
  color: white;
  display: inline-block;
  float: right;
  height: 1.5rem;
  text-align: center;
  width: 1.5rem;

  svg {
    transform: scale(.8);
  }
`;

class ValuesList extends React.Component {
  isSelected(value) {
    return _.includes(this.props.selected, value);
  }

  render() {
    const { values, multiple } = this.props;

    return (
      <StyledList>
        <ListWrapper>
          {values && values.map((entry) => {
            const isSelected = this.isSelected(entry.value);
            const clickHandler = () => { this.props.onChange(entry.value); };

            return (
              <StyledOption role="option" aria-selected={isSelected} key={entry.value} onClick={clickHandler}>
                {entry.text}
                {multiple && <Checkmark selected={isSelected}>
                  <Icon name="checkmark" />
                </Checkmark>}
              </StyledOption>
            );
          }
          )}
        </ListWrapper>
      </StyledList>
    );
  }
}

ValuesList.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  onChange: PropTypes.func,
  selected: PropTypes.array,
  multiple: PropTypes.bool,
};

export default ValuesList;
