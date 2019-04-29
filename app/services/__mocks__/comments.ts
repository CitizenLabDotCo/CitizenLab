import { ICommentData, IComment, IComments } from 'services/comments';
import { BehaviorSubject } from 'rxjs';

export const makeCommentData = (attributes = {}, ideaId?: string, authorId?: string, parentId?: string) : ICommentData => ({
  id: 'commentId',
  type: 'comments',
  attributes: {
    body_multiloc: { en: 'Just a comment' },
    publication_status: 'published',
    upvotes_count: 0,
    downvotes_count: 0,
    created_at: '2019-03-12T00: 00: 00.000Z',
    updated_at: '2019-03-26T14: 32: 32.000Z',
    children_count: 0,
    ...attributes
  },
  relationships: {
    idea: {
      data: {
        id: ideaId ? ideaId : 'ideaId',
        type: 'ideas'
      }
    },
    author: {
      data: {
        id: authorId ? authorId : 'authorId',
        type: 'users'
      }
    },
    parent: {
      data: parentId ?
        {
          id: parentId,
          type: 'comments'
        } : null
    },
    user_vote: {
      data: null
    }
  }
});

export const makeComment = (attributes = {}, ideaId?: string, authorId?: string, parentId?: string) : IComment => ({
  data: makeCommentData(attributes,  ideaId, authorId, parentId)
});

export const makeComments = (argumentsArray = [{ attributes: {}, ideaId: undefined, authorId: undefined, parentId: undefined }]) : IComments => ({
  data: argumentsArray.map(args => makeCommentData(args.attributes, args.ideaId, args.authorId, args.parentId))
});

let mockCommentsForUser: IComments = makeComments();

export const __setMockCommentsForUser = (comments: IComments) => {
  mockCommentsForUser = comments;
};

export const commentsForUserStream = jest.fn(() => {
  const observable = new BehaviorSubject(mockCommentsForUser);
  return {
    observable
  };
});
