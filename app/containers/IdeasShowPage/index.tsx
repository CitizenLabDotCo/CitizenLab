import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import { isString } from 'lodash';

// router
import { withRouter, RouterState } from 'react-router';

// components
import IdeasShow from 'containers/IdeasShow';
import Spinner from 'components/UI/Spinner';

// services
import { ideaBySlugStream } from 'services/ideas';

// style
import styled from 'styled-components';
import { media } from 'utils/styleUtils';

const Loading = styled.div`
  width: 100%;
  height: calc(80vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.smallerThanMaxTablet`
    height: calc(80vh - ${props => props.theme.mobileMenuHeight}px - 70px);
  `}
`;

const Container = styled.div`
  background: #fff;
  margin-top: -20px;

  ${media.smallerThanMaxTablet`
    margin-top: 0px;
  `}
`;

type Props = {
  params: {
    slug: string;
  };
};

type State = {
  ideaId: string | null;
  loaded: boolean;
};

class IdeasShowPage extends React.PureComponent<Props & RouterState, State> {
  slug$: Rx.BehaviorSubject<string | null>;
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      ideaId: null,
      loaded: false
    };
    this.slug$ = new Rx.BehaviorSubject(null);
    this.subscriptions = [];
  }

  componentDidMount() {
    this.slug$.next(this.props.params.slug);

    this.subscriptions = [
      this.slug$
        .distinctUntilChanged()
        .filter(slug => isString(slug))
        .switchMap((slug: string) => {
          const idea$ =  ideaBySlugStream(slug).observable;
          return idea$;
        }).subscribe((idea) => {
          const ideaId = idea.data.id;
          this.setState({ ideaId, loaded: true });
        })
    ];
  }

  componentDidUpdate() {
    this.slug$.next(this.props.params.slug);
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { ideaId, loaded } = this.state;

    if (!loaded) {
      return (
        <Loading>
          <Spinner size="34px" color="#666" />
        </Loading>
      );
    }

    if (loaded && ideaId !== null) {
      return (
        <Container>
          <IdeasShow ideaId={ideaId} />
        </Container>
      );
    }

    return null;
  }
}

export default withRouter(IdeasShowPage as any);
