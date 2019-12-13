import React, { PureComponent } from 'react';
import { ConsentManagerBuilder } from '@segment/consent-manager';
import { CL_SEGMENT_API_KEY } from 'containers/App/constants';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { reportError } from 'utils/loggingUtils';
import { withScope } from '@sentry/browser';
import { isAdmin, isModerator } from 'services/permissions/roles';

import ConsentManagerBuilderHandler from './ConsentManagerBuilderHandler';

import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES, MARKETING_AND_ANALYTICS_CATEGORIES } from './categories';

import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

export const adminIntegrations = ['Intercom', 'SatisMeter'];

// the format in which sentry sends out destinations
export interface IDestination {
  id: string;
  name: string;
  description: string;
  website: string;
  category: string;
}

// the format in which the user will make its choices,
// plus a way to remember tenantSettings last time the user gave consent.
export interface CustomPreferences {
  analytics: boolean | null;
  advertising: boolean | null;
  functional: boolean | null;
  tenantBlacklisted?: string[] | undefined;
}

// the format in which we'll present the desinations to the user
export interface CategorizedDestinations {
  analytics: IDestination[];
  advertising: IDestination[];
  functional: IDestination[];
}

// initially, preferences are set to null
export const initialPreferences = {
  analytics: null,
  advertising: null,
  functional: null
};

// the interface of the object segment's consent manager will pass down to its child
export interface ConsentManagerProps {
  setPreferences: Function;
  resetPreferences: () => void;
  saveConsent: () => void;
  destinations: IDestination[];
  newDestinations: IDestination[];
  preferences: CustomPreferences;
  // isConsentRequired: boolean; // passed down by SCM  based on whether user is the EU, but we'll overwrite this
  // implyConsentOnInteraction: boolean; // not in use here but passed through by SCM, defaults to false
}

interface InputProps { }
interface DataProps {
  tenant: GetTenantChildProps;
  authUser: GetAuthUserChildProps;
}
interface Props extends InputProps, DataProps { }

/** helper function for mapCustomPreferences
* reducer function, when passed in to _array.reduce, transforms the array
* into an object with the elements of the array as keys, and false as values
**/
const reducerArrayToObject = (acc, curr) => (acc[curr] = false, acc);

/** takes in the full list of destinations (coming from Segment),
* the preferences set by the user and the destinations that the user doesn't have access to
* gives out both the custom preferences picked by the user to save and the preferences
* of the user in the format { [preferenceId]: booleanConsent }
**/
const mapCustomPreferences = (
  { destinations, preferences }: { destinations: IDestination[], preferences: CustomPreferences },
  blacklistedDestinationsList: string[] | null
) => {
  const destinationPreferences = {};
  const customPreferences = {} as CustomPreferences;

  // remove blacklisted destinations from the destination array
  const remainingDestinations = destinations ?
    destinations.filter(destination => !blacklistedDestinationsList?.includes(destination.id))
    : [];

  // get user preferences, default unset preferences to true
  // for categories that contain destinations (for implicit consent)
  // and leave the empty categories null
  for (const [preferenceName, value] of Object.entries(preferences)) {
    if (typeof value === 'boolean') {
      customPreferences[preferenceName] = value;
    } else if (preferenceName === 'advertising' && remainingDestinations.find(destination => ADVERTISING_CATEGORIES.includes(destination.category))) {
      customPreferences[preferenceName] = true;
    } else if (preferenceName === 'functional' && remainingDestinations.find(destination => FUNCTIONAL_CATEGORIES.includes(destination.category))) {
      customPreferences[preferenceName] = true;
    } else if (preferenceName === 'analytics' && remainingDestinations.find(destination => MARKETING_AND_ANALYTICS_CATEGORIES.includes(destination.category))) {
      customPreferences[preferenceName] = true;
    } else {
      customPreferences[preferenceName] = null;
    }
  }

  // for each non-blacklisted destination, set the preference for this destination to be
  // the preference the user set for the category it belongs to
  for (const destination of remainingDestinations) {
    if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
      destinationPreferences[destination.id] = customPreferences.advertising;
    } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
      destinationPreferences[destination.id] = customPreferences.functional;
    } else if (MARKETING_AND_ANALYTICS_CATEGORIES.find(c => c === destination.category)) {
      destinationPreferences[destination.id] = customPreferences.analytics;
    } else {
      // Fallback to marketing preference but send an error so we update the categories
      withScope(scope => {
        scope.setExtra('wrongDestination', destination.id);
        scope.setExtra('wrongDestinationCategory', destination.category);
        reportError('A segment destination doesn\'t belong to a category');
      });
      destinationPreferences[destination.id] =
        customPreferences.analytics;
    }
  }

  // put the blacklist in the format { destinationId: false }
  const blacklistedDestinations = blacklistedDestinationsList ? blacklistedDestinationsList.reduce(reducerArrayToObject, {}) : {};

  // set the tenantBlacklisted value on the customPreferences object so we can use
  // it to later calculate whether a tenant has removed an item from blacklist
  // or the user has gained access to some preferences
  // and ask consent again when this happens
  customPreferences.tenantBlacklisted = blacklistedDestinationsList || undefined;

  return {
    customPreferences,
    destinationPreferences: { ...destinationPreferences, ...blacklistedDestinations },
  } as { customPreferences: CustomPreferences, destinationPreferences: { [destinationId: string]: boolean } };
};

function reportToSegment(err) {
  withScope(scope => {
    scope.setExtra('explanation', 'Segment destination fetch has failed, probably blocked by ad-blocker');
    reportError(err);
  });
}

export class ConsentManager extends PureComponent<Props> {
  handleMapCustomPreferences = (destinations, preferences) => {
    const { tenant } = this.props;
    if (isNilOrError(tenant)) return ({ customPreferences: {}, destinationPreferences: {} });
    return mapCustomPreferences(
      { destinations, preferences },
      this.getBlacklistedDestinations()
    );
  }

  getBlacklistedDestinations = () => {
    const { tenant, authUser } = this.props;

    const isPriviledgedUser = !isNilOrError(authUser) && (isAdmin({ data: authUser }) || isModerator({ data: authUser }));
    const tenantBlacklisted = !isNilOrError(tenant) ? tenant.attributes.settings.core.segment_destinations_blacklist : [];

    return [...(tenantBlacklisted || []), ...(!isPriviledgedUser ? adminIntegrations : [])];
  }

  render() {
    const { tenant } = this.props;
    if (isNilOrError(tenant)) return null;
    return (
      <ConsentManagerBuilder
        writeKey={CL_SEGMENT_API_KEY}
        mapCustomPreferences={this.handleMapCustomPreferences}
        initialPreferences={initialPreferences}
        onError={reportToSegment}
      >
        {(consentManagerProps) => (
          <ConsentManagerBuilderHandler
            {...consentManagerProps}
            blacklistedDestinations={this.getBlacklistedDestinations()}
          />
        )}
      </ConsentManagerBuilder>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  authUser: <GetAuthUser />
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ConsentManager {...inputProps} {...dataProps} />}
  </Data>
);
