import React from 'react';
import PropTypes from 'prop-types';
import ImPropTypes from 'react-immutable-proptypes';


// components
import View from './card/view';

// store
import { preprocess } from 'utils';
import { createStructuredSelector } from 'reselect';
import { selectIdea, selectAuthor, selectIdeaImages } from './selectors';

const Card = (props) => {
  if (!props.title) return null;

  return (
    <View {...props} />
  );
};

Card.propTypes = {
  title: ImPropTypes.map,
  createdAt: PropTypes.string,
  upvotesCount: PropTypes.number,
  downvotesCount: PropTypes.number,
  onClick: PropTypes.func,
  imageUrl: PropTypes.string,
  authorName: PropTypes.string,
  authorId: PropTypes.string,
  authorSlug: PropTypes.string,
  commentsCount: PropTypes.number,
};

const mapStateToProps = () => createStructuredSelector({
  idea: selectIdea,
  author: selectAuthor,
  images: selectIdeaImages,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { onClick } = ownProps;
  const { idea, images, author } = stateProps;
  if (!idea) return {};
  const ideaId = idea.get('id');
  const attributes = idea.get('attributes');
  const slug = attributes.get('slug');
  const title = attributes.get('title_multiloc');
  const createdAt = attributes.get('published_at');
  const authorName = attributes.get('author_name');
  const authorId = author.get('id');
  const authorSlug = author.getIn(['attributes', 'slug']);
  const firstImage = images.first();
  const imageUrl = firstImage && firstImage.getIn(['attributes', 'versions', 'medium']);
  const commentsCount = attributes.get('comments_count');

  return {
    ideaId,
    slug,
    onClick,
    title,
    createdAt,
    imageUrl,
    authorName,
    authorId,
    authorSlug,
    commentsCount,
  };
};

export default preprocess(mapStateToProps, null, mergeProps)(Card);
