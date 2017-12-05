// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';

import { browserHistory } from 'react-router';

// Services
import { getGroup, IGroupData } from 'services/groups';

// i18n
import { FormattedMessage } from 'react-intl';
import T from 'components/T';
import messages from './messages';
import localize, { injectedLocalized } from 'utils/localize';

// Components
import GoBackButton from 'components/UI/GoBackButton';
import PageWrapper from 'components/admin/PageWrapper';
import MembersList from './MembersList';
import MembersAdd from './MembersAdd';

// Style
import styled from 'styled-components';

const Container = styled.div``;

const PageTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
  margin: 1rem 0 3rem 0;
`;

// Typing
interface Props {
  params: {
    groupId: string;
  };
}

interface State {
  group: IGroupData | null;
}

class GroupsEdit extends React.Component<Props & injectedLocalized, State> {
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);

    this.state = {
      group: null
    };

    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions.push(
      getGroup(this.props.params.groupId).observable.subscribe((group) => {
        this.setState({ group: group.data });
      })
    );
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => { sub.unsubscribe; });
  }

  goBack = () => {
    browserHistory.push('/admin/groups');
  }

  render() {
    if (this.state.group) {
      return (
        <Container>
          <GoBackButton onClick={this.goBack} />

          <PageTitle>
            {this.props.localize(this.state.group.attributes.title_multiloc)}
          </PageTitle>

          <PageWrapper>
            <MembersAdd groupId={this.props.params.groupId} />
            <MembersList groupId={this.props.params.groupId} />
          </PageWrapper>
        </Container>
      );
    }

    return null;
  }
}

export default localize<Props>(GroupsEdit);
