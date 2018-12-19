import React from 'react';

// components
import HelmetIntl from 'components/HelmetIntl';
import TabbedResource from 'components/admin/TabbedResource';
import Summary from './summary';
import Warning from 'components/UI/Warning';
import FeatureFlag from 'components/FeatureFlag';
import Link from 'utils/cl-router/Link';

// resource
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// permissions
import { isAdmin, isProjectModerator } from 'services/permissions/roles';

// i18n
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';

// styling
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { rgba } from 'polished';

const StyledWarning = styled(Warning)`
  margin-bottom: 30px;
`;

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const GraphsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 20px -10px;
  background: inherit;
  @media print {
    flex-direction: column;
    position: relative;
    align-items: center;
  }
`;

export const Column = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  &.first {
    margin-right: 20px;
  }
  @media print {
    position: relative;
    width: 100%;
  }
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  font-size: ${fontSizes.base}px;
  // Needed to vertically center the text
  // Reason being: we have a margin-bottom on the header,
  // Which we want to keep when there's an actual graph
  padding: 20px;
`;

export const GraphCardInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 35px;
  border: solid 1px ${colors.adminBorder};
  border-radius: 5px;
  background: ${colors.adminContentBackground};
  p {
    font-size: ${fontSizes.base}px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media print {
    position: relative;
    display: block;
    page-break-inside: avoid;
    width: 100%;
    padding: 0 10px;
    border: none;
  }
`;

export const GraphCard = styled.div`
  padding: 10px;
  height: 350px;
  display: flex;
  width: 50%;

  &.dynamicHeight {
    height: auto;

    ${GraphCardInner} {
      position: relative;
    }
  }

  &.fullWidth {
    width: 100%;
  }
  @media print {
    position: relative;
    display: block;
    page-break-before: always;
    page-break-inside: avoid;
    height: 400px;
  }
  @media print and (orientation: portrait) {
    width: 100%;
  }
  @media print and (orientation: landscape) {
    width: 50%;
  }
`;

export const GraphCardHeader = styled.div`
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  font-size: ${fontSizes.xl}px;
  font-weight: 400;
  margin-bottom: 20px;
  padding: 20px;
  @media print {
    display: block;
    justify-content: flex-start;
    page-break-after: avoid;
    page-break-before: always;
    page-break-inside: avoid;
    h3 {
      margin-right: 20px;
    }
  }
`;

export const GraphCardHeaderWithFilter = styled(GraphCardHeader)`
  align-items: center;

  ${media.smallerThan1280px`
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0px;
  `}
`;

export const GraphCardTitle = styled.h3`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const GraphCardFigureContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GraphCardFigure = styled.span`
  margin-right: 5px;
  font-weight: bold;
`;

export const GraphCardFigureChange = styled.span`
  font-size: ${fontSizes.base}px;

  &.increase {
    color: ${colors.clGreenSuccess};
  }

  &.decrease {
    color: ${colors.clRedError};
  }
`;

export type IGraphUnit = 'users' | 'ideas' | 'comments';

export type IResolution = 'day' | 'week' | 'month';

interface Props {
  authUser: GetAuthUserChildProps;
}
export const chartTheme = (theme) => {
  return {
    ...theme,
    chartStroke: colors.clIconAccent,
    chartStrokeGreen: colors.clGreen,
    chartStrokeRed: colors.clRed,
    chartFill: colors.clIconAccent,
    barFill: colors.adminContentBackground,
    chartLabelColor: colors.adminSecondaryTextColor,
    barHoverColor: rgba(colors.clIconAccent, .25),
    chartLabelSize: 13,
    animationBegin: 50,
    animationDuration: 500
  };
};

export class DashboardsPage extends React.PureComponent<Props & InjectedIntlProps> {
  render() {
    const { children, authUser } = this.props;
    const { formatMessage } = this.props.intl;
    const tabs = [
      { label: formatMessage(messages.tabSummary), url: '/admin/dashboard' },
      { label: formatMessage(messages.tabUsers), url: '/admin/dashboard/users' },
      //  { label: formatMessage(messages.tabAcquisition), url: '/admin/dashboard/aquisiton' } TODO
    ];
    const resource = {
      title: formatMessage(messages.titleDashboard),
      subtitle: formatMessage(messages.subtitleDashboard)
    };

    if (authUser) {
      if (isAdmin({ data: authUser })) {
        return (
          <TabbedResource
            resource={resource}
            tabs={tabs}
          >
            <HelmetIntl
              title={messages.helmetTitle}
              description={messages.helmetDescription}
            />
            <FeatureFlag name={'clustering'}>
              <StyledWarning
                text={
                  <FormattedMessage
                    {...messages.tryOutInsights}
                    values={{
                      insightsLink: <Link to={'/admin/clusterings'}><FormattedMessage {...messages.insightsLinkText} /></Link>
                    }}
                  />
                }
              />
            </FeatureFlag>
            {children}
          </TabbedResource>
        );
      } else if (isProjectModerator({ data: authUser })) {
        return (
          <Summary onlyModerator />
        );
      }
    }

    return null;
  }
}

const DashboardsPageWithHoC = injectIntl(DashboardsPage);

export default (props) => (
  <GetAuthUser {...props}>
    {authUser => <DashboardsPageWithHoC authUser={authUser} {...props} />}
  </GetAuthUser>
);
