/*
 *
 * PagesShowPage
 *
 */

import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import { injectTFunc } from 'components/T/utils';
import Helmet from 'react-helmet';
import T from 'components/T';
import { IPageData, pageBySlugStream } from 'services/pages';
import messages from './messages';
import ContentContainer from 'components/ContentContainer';
import styled from 'styled-components';
import NotFound from 'containers/NotFoundPage';
import Spinner from 'components/UI/Spinner';

const TextContainer = styled.div`
  margin: 30px 0;
  padding: 3rem;
  background-color: white;
`;

const SpinnerContainer = styled.div`
  margin: 30px 0;
  padding: 3rem;
  background-color: white;
  display: flex;
  justify-content: center;
`;

type Props = {
  params: {
    slug: string;
  }
  tFunc: ({}) => string;
};

type State = {
  page: IPageData | null,
  loading: boolean;
};

class PagesShowPage extends React.PureComponent<Props, State> {
  pageObserver: Rx.Subscription | null;

  constructor() {
    super();
    this.pageObserver = null;
    this.state = {
      page: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.pageObserver = pageBySlugStream(this.props.params.slug).observable.subscribe((response) => {
      if (response) {
        this.setState({
          page: response.data,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.pageObserver && this.pageObserver.unsubscribe();
  }

  render() {
    const { page, loading } = this.state;
    const { tFunc } = this.props;

    if (loading) {
      return (
        <ContentContainer>
          <SpinnerContainer>
            <Spinner color="#84939E" />
          </SpinnerContainer>
        </ContentContainer>
      );
    }

    if (!page) {
      return <NotFound />;
    }

    return page && (
      <ContentContainer>
        <Helmet>
          <title>{tFunc(page.attributes.title_multiloc)}</title>
        </Helmet>
        <TextContainer>
          <h1><T value={page.attributes.title_multiloc} /></h1>
          <T value={page.attributes.body_multiloc} />
        </TextContainer>
      </ContentContainer>
    );
  }
}

export default injectTFunc(PagesShowPage);
