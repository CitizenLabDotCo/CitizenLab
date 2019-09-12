import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';

export async function addPollResponse(participationContextId: string, participationContextType: 'projects' | 'phases', optionIds: string[], projectId?: string) {
  const response = await streams.add(`${API_PATH}/${participationContextType}/${participationContextId}/poll_responses`, {
    response: {
      response_options_attributes: optionIds.map(optionId => ({ option_id: optionId }))
    }
  });
  projectId && streams.fetchAllWith({ dataId: [projectId] });
  return response;
}
