import React from 'react';
import { ConsentManagerProps, IDestination } from './';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';

interface Props extends ConsentManagerProps {
  blacklistedDestinationIds: string[];
}

import Container from './Container';

const getCategorizedDestinations = (destinationArray: IDestination[]) => {
  // agregate the remaining destinations into categories

  const categorizedDestinations = {
    advertising: [] as IDestination[],
    functional: [] as IDestination[],
    analytics: [] as IDestination[],
  };

  for (const destination of destinationArray) {
    if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
      categorizedDestinations.advertising.push(destination);
    } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
      categorizedDestinations.functional.push(destination);
    } else {
      // Fallback to analytics
      categorizedDestinations.analytics.push(destination);
    }
  }

  return categorizedDestinations;
};

const removeBlacklistedDestinations = (destinations: IDestination[], blacklistedDestinations: string []) => {
  // removes the blacklistedDestinations from the destination and newDestinations
  // arrays, they will be programmatically set to false when saving preferences.
  const isNotBlackListedDestination = (destination: IDestination) => !blacklistedDestinations.includes(destination.id);

  return destinations.filter(isNotBlackListedDestination);
};

// const getNoLongerBlacklistedDestinations = () => {
//   const tenantBlacklisted
//   if (preferences.tenantBlacklisted.length > 0) {
//     return
//   }
//   const noLongerBlacklistedDestinations = (preferences.tenantBlacklisted || []).filter(destinationId => !blacklistedDestinations.includes(destinationId));
// };

const ConsentManagerBuilderHandler = ({
  setPreferences,
  resetPreferences,
  saveConsent,
  newDestinations,
  destinations,
  preferences,
  blacklistedDestinationIds
}: Props) => {
  const filteredNewDestinations = removeBlacklistedDestinations(newDestinations, blacklistedDestinationIds);
  const filteredDestinations = removeBlacklistedDestinations(destinations, blacklistedDestinationIds);
  const categorizedDestinations = getCategorizedDestinations(filteredDestinations);

  if (blacklistedDestinationIds !== preferences.tenantBlacklisted) {
    // anything that was removed from the blacklist is a new destination to our user
    const noLongerBlacklistedDestinationIds = (preferences.tenantBlacklisted || []).filter(destinationId => !blacklistedDestinationIds.includes(destinationId));

    noLongerBlacklistedDestinationIds.forEach(destinationId => {
      const destination = destinations.find(destination => destination.id === destinationId);
      if (destination) {
        filteredNewDestinations.push(destination);
      }
    });

    // anything that was added to the blacklist will be programmatically set to false later...
    const newBlacklistedDestinationIds = blacklistedDestinationIds.filter(destinationId =>
      !(preferences.tenantBlacklisted || []).includes(destinationId));

    // if there are no new destinations, the banner won't show so we save programmatically to apply
    // the blacklist on the previous user choice and overwrite blacklisted destinations to false
    if (newBlacklistedDestinationIds.length > 0 && filteredNewDestinations.length === 0) {
      saveConsent();
    }
  }
  // if there is a new destination the user has not consented to, consent is required
  const isConsentRequired = filteredNewDestinations.length > 0;

  return (
    <Container
      {...{
        setPreferences,
        resetPreferences,
        saveConsent,
        isConsentRequired,
        preferences,
        categorizedDestinations
      }}
    />
  );
};

export default ConsentManagerBuilderHandler;
