import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';

const apiEndpoint = `${API_PATH}/phases`;

export interface IPhaseFileData {
  id: string;
  type: string;
  attributes: {
    file: {
      url: string,
    }
    ordering: string | null,
    name: string,
    size: number,
    created_at: string,
    updated_at: string,
  };
}

export interface IPhaseFile {
  data: IPhaseFileData;
}

export interface IPhaseFiles {
  data: IPhaseFileData[];
}

export function phaseFilesStream(phaseId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IPhaseFiles>({ apiEndpoint: `${apiEndpoint}/${phaseId}/files`, ...streamParams });
}

export function phaseFileStream(phaseId: string, fileId: string, streamParams: IStreamParams | null = null) {
  return streams.get<IPhaseFile>({ apiEndpoint: `${apiEndpoint}/${phaseId}/files/${fileId}`, ...streamParams });
}

export function addPhaseFile(phaseId: string, base64: string, name: string, ordering: number | null = null) {
  return streams.add<IPhaseFile>(`${apiEndpoint}/${phaseId}/files`, { file: { name, ordering, file: base64 } });
}

export function deletePhaseFile(phaseId: string, fileId: string) {
  return streams.delete(`${apiEndpoint}/${phaseId}/files/${fileId}`, fileId);
}
