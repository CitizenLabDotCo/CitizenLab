import { definePermissionRule } from '..';
import { isAdmin, isProjectModerator } from '../roles';
import { ICommentData } from 'services/comments';
import { IUser } from 'services/users';

const isAuthor = (comment: ICommentData, user?: IUser) => {
  return user && comment.relationships.author.data && comment.relationships.author.data.id === user.data.id;
};

definePermissionRule('comments', 'create', (_comment: ICommentData, user: IUser) => {
  return !!user;
});

definePermissionRule('comments', 'edit', (comment: ICommentData, user: IUser) => {
  return !!(isAuthor(comment, user));
});

definePermissionRule('comments', 'delete', (comment: ICommentData, user: IUser, { projectId }) => {
  return !!(isAuthor(comment, user) || isAdmin(user) || isProjectModerator(user, projectId));
});

definePermissionRule('comments', 'justifyDeletion', (comment: ICommentData, user: IUser, { projectId }) => {
  return !isAuthor(comment, user) && (isAdmin(user) || isProjectModerator(user, projectId));
});

definePermissionRule('comments', 'markAsSpam', (comment: ICommentData, user: IUser, { projectId }) => {
  return (user && !(isAuthor(comment, user) || isAdmin(user) || isProjectModerator(user, projectId)));
});
