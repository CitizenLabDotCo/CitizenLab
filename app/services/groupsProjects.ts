import { API_PATH } from 'containers/App/constants';
// import { projectByIdStream } from 'services/projects';
import streams, { IStreamParams } from 'utils/streams';
import { IRelationship, Multiloc } from 'typings';

export interface IGroupsProjectsData {
  id: string;
  type: 'groups_projects';
  relationships: {
    group: {
      data: {
        id: string;
        type: 'groups';
      };
      type: 'groups_projects';
    }
  };
}

export interface IGroupsProjects {
  data: IGroupsProjectsData[];
}

export function groupsProjectsByIdStream(groupsProjectsId: string) {
  return streams.get<IGroupsProjects>({ apiEndpoint: `${API_PATH}/groups_projects/${groupsProjectsId}` });
}

export function groupsProjectsByProjectIdStream(projectId: string) {
  return streams.get<IGroupsProjects>({ apiEndpoint: `${API_PATH}/projects/${projectId}/groups_projects` });
}

export async function addGroupProject(projectId: string, groupId: string) {
  const bodyData = {
    groups_project:{
      group_id: groupId
    }
  };

  const response = streams.add<IGroupsProjects>(`${API_PATH}/projects/${projectId}/groups_projects`, bodyData);
  // await projectByIdStream(projectId).fetch();
  return response;
}
