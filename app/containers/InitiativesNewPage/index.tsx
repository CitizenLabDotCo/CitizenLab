import React from 'react';
import { isNumber } from 'lodash-es';

// libraries
import clHistory from 'utils/cl-router/history';
import { adopt } from 'react-adopt';
import { withRouter, WithRouterProps } from 'react-router';
import { reverseGeocode } from 'utils/locationTools';
import { parse } from 'qs';

// services
import { isAdmin, isSuperAdmin, isModerator } from 'services/permissions/roles';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import { PreviousPathnameContext } from 'context';
import GetTopics, { GetTopicsChildProps } from 'resources/GetTopics';

// utils
import { isNilOrError } from 'utils/helperUtils';

// components
import InitiativesNewMeta from './InitiativesNewMeta';
import InitiativesNewFormWrapper from './InitiativesNewFormWrapper';
import PageLayout from 'components/InitiativeForm/PageLayout';
import { ITopicData } from 'services/topics';
import { ILocationInfo } from 'typings';
import GetInitiativesPermissions, {
  GetInitiativesPermissionsChildProps,
} from 'resources/GetInitiativesPermissions';

interface DataProps {
  authUser: GetAuthUserChildProps;
  locale: GetLocaleChildProps;
  tenant: GetTenantChildProps;
  previousPathName: string | null;
  topics: GetTopicsChildProps;
  postingPermission: GetInitiativesPermissionsChildProps;
}

interface Props extends DataProps {}

interface State {
  locationInfo: undefined | null | ILocationInfo;
}

export class InitiativesNewPage extends React.PureComponent<
  Props & WithRouterProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      locationInfo: undefined,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { lat, lng } = parse(location.search, {
      ignoreQueryPrefix: true,
      decoder: (str, _defaultEncoder, _charset, type) => {
        return type === 'value' ? parseFloat(str) : str;
      },
    }) as { [key: string]: string | number };

    this.redirectIfNotPermittedOnPage();

    if (isNumber(lat) && isNumber(lng)) {
      // When an idea is posted through the map, we Google Maps gets an approximate address,
      // but we also keep the exact coordinates from the click so the location indicator keeps its initial position on the map
      // and doesn't readjust together with the address correction/approximation
      reverseGeocode([lat, lng])
        .then((location_description) => {
          this.setState({
            locationInfo: {
              location_description,
              location_point_geojson: {
                type: 'Point',
                coordinates: [lng, lat],
              },
            },
          });
        })
        // todo handle this error better in the form /display
        .catch(() => {
          this.setState({
            locationInfo: {
              location_description: undefined,
              error: 'not_found',
              location_point_geojson: {
                type: 'Point',
                coordinates: [lng, lat],
              },
            },
          });
        });
    } else {
      this.setState({ locationInfo: null });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.authUser !== this.props.authUser) {
      this.redirectIfNotPermittedOnPage();
    }

    if (prevProps.tenant !== this.props.tenant) {
      this.redirectIfPostingNotEnabled();
    }
  }

  redirectIfNotPermittedOnPage = () => {
    const { authUser } = this.props;
    const isPrivilegedUser =
      !isNilOrError(authUser) &&
      (isAdmin({ data: authUser }) ||
        isModerator({ data: authUser }) ||
        isSuperAdmin({ data: authUser }));

    if (!isPrivilegedUser && authUser === null) {
      clHistory.replace('/sign-up');
    }
  };

  redirectIfPostingNotEnabled() {
    if (this.props.postingPermission?.enabled !== true) {
      clHistory.replace('/initiatives');
    }
  }

  render() {
    const { authUser, locale, topics } = this.props;
    const { locationInfo } = this.state;
    if (
      isNilOrError(authUser) ||
      isNilOrError(locale) ||
      isNilOrError(topics) ||
      locationInfo === undefined
    ) {
      return null;
    }
    const initiativeTopics = topics.filter(
      (topic) => !isNilOrError(topic)
    ) as ITopicData[];

    return (
      <>
        <InitiativesNewMeta />
        <PageLayout>
          <InitiativesNewFormWrapper
            locale={locale}
            topics={initiativeTopics}
            {...locationInfo}
          />
        </PageLayout>
      </>
    );
  }
}

const Data = adopt<DataProps>({
  authUser: <GetAuthUser />,
  tenant: <GetTenant />,
  locale: <GetLocale />,
  topics: <GetTopics exclude_code={'custom'} />,
  previousPathName: ({ render }) => (
    <PreviousPathnameContext.Consumer>
      {render as any}
    </PreviousPathnameContext.Consumer>
  ),
  postingPermission: <GetInitiativesPermissions action="posting_initiative" />,
});

export default withRouter((inputProps: WithRouterProps) => (
  <Data>
    {(dataProps) => <InitiativesNewPage {...dataProps} {...inputProps} />}
  </Data>
));
