import React from 'react';

import { withRouter, WithRouterProps } from 'react-router';
import Link from 'utils/cl-router/Link';

// style
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

// localisation
import { FormattedMessage } from 'utils/cl-intl';

// typings
import { Message } from 'typings';

// components
import FeatureFlag from 'components/FeatureFlag';
import Button from 'components/UI/Button';
import { SectionSubtitle } from 'components/admin/Section';
import Title from 'components/admin/PageTitle';

const ResourceHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 30px;

  @media print {
    margin-bottom: 10px;
  }

  p {
    margin-right: 40px;
  }
`;

const TabbedNav = styled.nav`
  background: #fcfcfc;
  border-radius: ${(props: any) => props.theme.borderRadius} ${(props: any) => props.theme.borderRadius} 0 0;
  padding-left: 44px;
  display: flex;
  border: 1px solid ${colors.separation};
  border-bottom: 1px solid transparent;
  @media print {
    border: none;
    padding: 0;
    margin-bottom: 10px;
  }
`;

const Tab = styled.div`
  list-style: none;
  cursor: pointer;
  display: flex;
  margin-bottom: -1px;

  &:first-letter {
    text-transform: uppercase;
  }

  &:not(:last-child) {
    margin-right: 40px;
  }

  a {
    color: ${colors.label};
    font-size: ${fontSizes.base}px;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 0;
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 3px solid transparent;
    transition: all 100ms ease-out;
  }

  &:hover a {
    color: ${colors.adminTextColor};
  }

  &.active a {
    color: ${colors.adminTextColor};
    border-color: ${colors.clBlueDark};
  }

  &:not(.active):hover a {
    border-color: transparent;
  }
`;

const ChildWrapper = styled.div`
  border: 1px solid ${colors.separation};
  background: ${colors.adminContentBackground};
  margin-bottom: 2rem;
  padding: 3rem;
  @media print {
    border: none;
    padding: 0;
    margin: 0;
  }
`;

export type TabProps = {
  label: string
  url: string,
  active?: boolean,
  feature?: string,
  className?: string,
};

type Props = {
  resource: {
    title: string,
    publicLink?: string,
    subtitle?: string;
  },
  messages?: {
    viewPublicResource: Message,
  },
  tabs?: TabProps[],
};

type State = {};

function urlMatch(tabUrl: string) {
  return new RegExp(`^\/([a-zA-Z]{2,3}(-[a-zA-Z]{2,3})?)(${tabUrl})(\/)?$`);
}

class TabbedResource extends React.PureComponent<Props & WithRouterProps, State> {

  render() {
    const { children, resource: { title, subtitle, publicLink }, messages, tabs, location } = this.props;

    return (
      <>
        <ResourceHeader className="e2e-resource-header">
          <div>
            <Title>{title}</Title>
            {subtitle &&
              <SectionSubtitle>
                {subtitle}
              </SectionSubtitle>
            }
          </div>

          {publicLink && messages &&
            <Button
              style="cl-blue"
              icon="eye"
              linkTo={publicLink}
            >
              <FormattedMessage {...messages.viewPublicResource} />
            </Button>
          }
        </ResourceHeader>

        {(tabs && tabs.length > 0) &&
          <TabbedNav className="e2e-resource-tabs">
            {tabs.map((tab) => {

              if (tab.feature) {
                return (
                  <FeatureFlag key={tab.url} name={tab.feature}>
                    <Tab key={tab.url} className={`${tab.className} ${location && location.pathname && urlMatch(tab.url).test(location.pathname) ? 'active' : ''}`}>
                      <Link to={tab.url}>{tab.label}</Link>
                    </Tab>
                  </FeatureFlag>
                );
              } else {
                return (
                  <Tab key={tab.url} className={`${tab.className} ${location && location.pathname && urlMatch(tab.url).test(location.pathname) ? 'active' : ''}`}>
                    <Link to={tab.url}>{tab.label}</Link>
                  </Tab>
                );
              }
            })}
          </TabbedNav>
        }

        <ChildWrapper>
          {children}
        </ChildWrapper>
      </>
    );
  }
}

export default withRouter(TabbedResource);
