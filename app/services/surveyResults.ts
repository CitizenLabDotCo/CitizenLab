import { API_PATH } from 'containers/App/constants';
import { requestBlob } from 'utils/request';
import { saveAs } from 'file-saver';

export const exportSurveyResults = async (
  queryParameter: { type: 'projects' | 'phases', id: string },
) => {
  const blob = await requestBlob(
    `${API_PATH}/${queryParameter.type}/${queryParameter.id}/survey_responses/as_xlsx`,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  saveAs(blob, 'survey-results-export.xlsx');
};
