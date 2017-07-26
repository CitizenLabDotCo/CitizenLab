import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// components
import IdeaCard from 'components/IdeaCard';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { mergeJsonApiResources } from 'utils/resources/actions';

// store
import { preprocess } from 'utils';
import { observeIdeas } from 'services/ideas';

// style
import { media } from 'utils/styleUtils';
import styled from 'styled-components';


const IdeasList = styled.div`
  font-size: 20px;
  color: #999;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px !important;
  ${media.tablet`
    flex-wrap: wrap;
  `}

  ${media.phone`
    flex-direction: column;
  `}
`;

const LoadMoreButton = styled.button`
  background: rgba(34, 34, 34, 0.05);
  color: #6b6b6b;
  flex: 1 0 100%;
  padding: 1.5rem 0;
  text-align: center;

  :hover{
    background: rgba(34, 34, 34, 0.10);
  }
`;

class IdeasCards extends React.Component {

  constructor() {
    super();
    this.ideasSubscription = null;
    this.state = {
      ideas: [],
      currentPage: 1,
      hasMore: false,
    };
  }

  componentDidMount() {
    this.resubscribeIdeas();
  }

  componentWillReceiveProps(newProps) {
    if (!_.isEqual(newProps.filter, this.props.filter)) {
      this.setState({
        ideas: [],
        currentPage: 1,
        hasMore: false,
      }, this.resubscribeIdeas);
    }
  }

  resubscribeIdeas() {
    this.unsubscribe();
    this.ideasSubscription = observeIdeas({ queryParameters: {
      ...this.props.filter,
      'page[number]': this.state.currentPage,
    } }).observable.subscribe((response) => {
      this.setState({
        ideas: [...this.state.ideas, ...response.data],
        hasMore: !!response.links.next,
      });
      // Quite some child components depend on the redux state being loaded.
      // We have to find a more matching solution for this, but at the moment
      // this is the way to make sure they have the data they need.
      this.props.mergeJsonApiResources(response);
    });
  }

  unsubscribe() {
    if (this.ideasSubscription) {
      this.ideasSubscription.unsubscribe();
    }
  }

  loadMoreIdeas = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    }, this.resubscribeIdeas);
  }

  render() {
    const { ideas, hasMore } = this.state;
    return (
      <IdeasList>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} id={idea.id} />
        ))}
        {hasMore &&
          <LoadMoreButton onClick={this.loadMoreIdeas}>
            <FormattedMessage {...messages.loadMore} />
          </LoadMoreButton>
        }
      </IdeasList>
    );
  }
}

IdeasCards.propTypes = {
  filter: PropTypes.object.isRequired,
  mergeJsonApiResources: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  mergeJsonApiResources,
};

export default preprocess(null, mapDispatchToProps)(IdeasCards);
