import React, { PureComponent } from 'react';

// Components
import CategoryCard from './CategoryCard';

// Typing
import { IDestination } from './';

// Styling
import styled from 'styled-components';
import { fontSizes, media } from 'utils/styleUtils';

export const ContentContainer = styled.div`
  background: white;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: ${fontSizes.medium}px;
  }
  h2 {
    font-size: ${fontSizes.large}px;
  }
  ${media.smallerThanMaxTablet`
    margin: 0;
  `}
`;

interface Props {
  onChange: (category, value) => void;
  categoryDestinations: {
    analytics: IDestination[];
    advertising: IDestination[];
    functional: IDestination[];
  };
  analytics: boolean | null;
  advertising: boolean | null;
  functional: boolean | null;
}

export default class PreferencesDialog extends PureComponent<Props> {
  static displayName = 'PreferencesDialog';

  handleChange = (e) => {
    this.props.onChange(e.target.name, e.target.value === 'true');
  }

  render() {
    const {
      categoryDestinations,
      functional,
      advertising,
      analytics,
      onChange
    } = this.props;
    const checkCategories = { analytics, advertising, functional };
    return (
      <ContentContainer>
        {Object.keys(categoryDestinations).map((category) => {
          if (categoryDestinations[category].length > 0) {
            return (
              <CategoryCard
                key={category}
                category={category}
                destinations={categoryDestinations[category]}
                checked={checkCategories[category]}
                onChange={onChange}
                handleChange={this.handleChange}
              />
            );
          }
          return;
        })}
      </ContentContainer>
    );
  }
}
