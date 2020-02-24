import React, { PureComponent } from 'react';
import PlacesAutocomplete, { geocodeByPlaceId, } from 'react-places-autocomplete';
import styled from 'styled-components';
import { fontSizes, colors } from 'utils/styleUtils';

const LocationInputWrapper: any = styled.div`
  width: 100%;

  input {
    width: 100%;
    color: ${(props: any) => props.inCitizen ? props.theme.colorText : '#000'};
    font-size: ${fontSizes.base}px;
    line-height: 26px;
    font-weight: 400;
    padding: 12px;
    border-radius: ${(props: any) => props.theme.borderRadius};
    border: solid 1px ${colors.separationDark};
    background: #fff;
    outline: none;
    cursor: text;

    &:focus {
      border-color: #999;
    }
  }
`;

const StyledAutocompleteItem: any = styled.div`
  width: 100%;
  color: #999;
  font-size: ${fontSizes.base}px;
  line-height: 17px;
  font-weight: 400;
  padding: 12px;
  z-index: 2;

  strong {
    font-weight: 600;
    color: ${(props: any) => props.inCitizen ? props.theme.colorText : '#000'};
  }

  &:hover {
    background: #eee;
  }
`;

export type Props = {
  id?: string;
  value: string;
  placeholder: string;
  onChange: (arg: string) => void;
  className?: string;
  onBlur?: () => void;
  inCitizen?: boolean; // If true, component uses textColor instead of black.
};

type State = {};

export default class LocationInput extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props as any);
  }

  handleSelect = async (adress: string, placeId: string) => {
    const { onBlur, onChange } = this.props;

    onChange(adress);
    onBlur && onBlur();
    return geocodeByPlaceId(placeId).then(results => results);
  }

  render() {
    const { id, className, onChange, inCitizen } = this.props;
    let { value, placeholder } = this.props;

    value = (value || '');
    placeholder = (placeholder || '');

    const inputProps = {
      value,
      placeholder,
      onChange,
      type: 'search',
      autoFocus: false,
    };
    const styles = {
      autocompleteContainer: {
        overflow: 'hidden',
        borderRadius: '5px',
        background: '#fff',
        zIndex: '100',
      },
      autocompleteItem: {
        padding: '0',
        margin: '0',
        backgroundColor: 'transparent',
      },
      autocompleteItemActive: {
        backgroundColor: '#eee',
      }
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <StyledAutocompleteItem className="autocompleteItemInner" inCitizen={inCitizen}>
        <strong>{formattedSuggestion.mainText}</strong>{' '}{formattedSuggestion.secondaryText}
      </StyledAutocompleteItem>
    );

    return (
      <LocationInputWrapper className={className} inCitizen={inCitizen}>
        <PlacesAutocomplete
          id={id}
          highlightFirstSuggestion={true}
          inputProps={inputProps}
          renderSuggestion={AutocompleteItem}
          styles={styles}
          onSelect={this.handleSelect}
          googleCallbackName="myCallbackFunc"
        />
      </LocationInputWrapper>
    );
  }
}
