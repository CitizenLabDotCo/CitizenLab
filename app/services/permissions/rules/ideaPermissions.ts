import { definePermissionRule } from '../.';
import { isAdmin } from '../roles';
import { IIdeaData } from 'services/ideas';
import { IUser } from 'services/users';

const isAuthor = (idea: IIdeaData, user: IUser) => {
  return idea.relationships.author.data && idea.relationships.author.data.id === user.data.id;
};

definePermissionRule('ideas', 'edit', (idea: IIdeaData, user: IUser) => {
  return !!(isAuthor(idea, user) || isAdmin(user));
});

definePermissionRule('ideas', 'markAsSpam', (idea: IIdeaData, user) => {
  return true;
});
