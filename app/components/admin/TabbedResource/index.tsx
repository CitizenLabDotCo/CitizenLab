import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// style
import styled from 'styled-components';
import { color, fontSize } from 'utils/styleUtils';

// localisation
import { FormattedMessage } from 'react-intl';
import T from 'components/T';

// typings
import { Message, Multiloc } from 'typings';

// components
import { Link } from 'react-router';
import FeatureFlag from 'components/FeatureFlag';

const ResourceHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: ${color('title')};
  font-size: ${fontSize('xxxl')};
  line-height: 40px;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const PublicResourceLink = styled(Link)`
  color: ${color('label')};
`;

const TabbedNav = styled.nav`
  background: #fcfcfc;
  border-radius: 5px 5px 0 0;
  padding-left: 44px;
  display: flex;
  border: 1px solid ${color('separation')};
  border-bottom: 1px solid transparent;
`;

const Tab = styled.li`
  list-style: none;
  cursor: pointer;
  display: flex;
  margin-bottom: -1px;

  &:not(:last-child) {
    margin-right: 40px;
  }

  a {
    color: ${color('label')};
    font-size: ${fontSize('base')};
    font-weight: 400;
    line-height: 1.5rem;
    text-transform: capitalize;
    padding: 0;
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 3px solid transparent;
    transition: all 100ms ease-out;
  }

  &:hover a {
    color: ${color('text')};
  }

  &.active a {
    color: ${color('text')};
    border-color: ${color('clBlue')};
  }

  &:not(.active):hover a {
    border-color: transparent;
  }
`;

const ChildWrapper = styled.div`
  border: 1px solid ${color('separation')};
  background: #fff;
  margin-bottom: 2rem;
  padding: 3rem;
`;

type Props = {
  location?: {
    pathname: string,
  },
  resource: {
    title: string | Multiloc,
    publicLink?: string,
  },
  messages: {
    viewPublicResource: Message,
  },
  tabs?: {
    label: string | Message,
    url: string,
    active?: boolean,
    feature?: string,
  }[],
};

type State = {

};

function isMessage(entry: any): entry is Message {
  return entry.id && entry.defaultMessage;
}

function isMultiloc(entry: any): entry is Multiloc {
  return entry.en || entry.nl || entry.fr;
}

function showLabel(label: string | Multiloc | Message) {
  if (_.isString(label)) {
    return label;
  } else if (isMessage(label)) {
    return <FormattedMessage {...label} />;
  } else if (isMultiloc(label)) {
    return <T value={label} />;
  } else {
    return '';
  }
}

export default class TabbedResource extends React.PureComponent<Props, State> {
  render() {
    const { resource, messages, tabs, location } = this.props;

    return (
      <div>
        <ResourceHeader className="e2e-resource-header">
          <Title>{showLabel(resource.title)}</Title>

          {resource.publicLink &&
            <PublicResourceLink to={resource.publicLink}>
              <FormattedMessage {...messages.viewPublicResource} />
            </PublicResourceLink>
          }
        </ResourceHeader>
        {tabs &&
          <TabbedNav className="e2e-resource-tabs">
            {tabs.map((tab) => (
              <FeatureFlag key={tab.url} name={tab.feature}>
                <Tab className={location && location.pathname && location.pathname === tab.url ? 'active' : ''}>
                  <Link to={tab.url}>{showLabel(tab.label)}</Link>
                </Tab>
              </FeatureFlag>
            ))}
          </TabbedNav>
        }
        <ChildWrapper>{this.props.children}</ChildWrapper>
      </div>
    );
  }
}
