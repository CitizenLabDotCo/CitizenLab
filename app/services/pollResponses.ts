import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';
import { requestBlob } from 'utils/request';
import { saveAs } from 'file-saver';
import { IParticipationContextType } from 'typings';

export async function addPollResponse(participationContextId: string, participationContextType: IParticipationContextType, optionIds: string[], projectId?: string) {
  const response = await streams.add(`${API_PATH}/${participationContextType}s/${participationContextId}/poll_responses`, {
    response: {
      response_options_attributes: optionIds.map(optionId => ({ option_id: optionId }))
    }
  });
  projectId && streams.fetchAllWith({ dataId: [projectId] });
  return response;
}

export async function exportPollResponses(participationContextId: string, participationContextType: IParticipationContextType) {
  const blob = await requestBlob(
    `${API_PATH}/${participationContextType}s/${participationContextId}/poll_responses/as_xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  saveAs(blob, 'survey-results-export.xlsx');
}
