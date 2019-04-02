import { definePermissionRule } from 'services/permissions/permissions';
import { isAdmin, isProjectModerator } from '../roles';
import { IIdeaData } from 'services/ideas';
import { IUser } from 'services/users';

const isAuthor = (idea: IIdeaData, user?: IUser) => {
  return user && idea.relationships.author.data && idea.relationships.author.data.id === user.data.id;
};

const isIdeaProjectModerator = (idea: IIdeaData, user?: IUser) => {
  return user && isProjectModerator(user, idea.relationships.project.data.id);
};

definePermissionRule('ideas', 'create', (_idea: IIdeaData, user: IUser, _tenant, { project = null }) => {
  if (project) {
    return project.relationships.action_descriptor.data.posting.enabled || isAdmin(user);
  }

  return true;
});

definePermissionRule('ideas', 'edit', (idea: IIdeaData, user: IUser) => {
  return !!(isAuthor(idea, user) || isAdmin(user) || isIdeaProjectModerator(idea, user));
});

definePermissionRule('ideas', 'markAsSpam', () => {
  return true;
});

definePermissionRule('ideas', 'assignBudget', (idea: IIdeaData | null, user: IUser, _tenant, { projectId }) => {
  return !!isAdmin(user) || (!!idea && !!isProjectModerator(user, projectId));
});
