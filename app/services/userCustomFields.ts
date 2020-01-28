import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { IRelationship, Multiloc } from 'typings';

export type IInputType = 'text' | 'number' | 'multiline_text' | 'select' | 'multiselect' | 'checkbox' | 'date';

export interface ICustomFieldData {
  id: string;
  type: string;
  attributes: {
    key: string;
    title_multiloc: Multiloc;
    description_multiloc: Multiloc;
    input_type: IInputType;
    required: boolean;
    code: string | null;
    enabled: boolean;
    ordering: number;
    created_at: string;
    updated_at: string;
  };
  relationships?: {
    custom_field_options: {
      data: IRelationship;
    };
  };
}

export interface CustomFieldsInfos {
  schema: any;
  uiSchema: any;
  hasRequiredFields: boolean;
  hasCustomFields: boolean;
}

export function isBuiltInField(field: ICustomFieldData) {
  return !!field.attributes.code;
}

export interface ICustomField {
  data: ICustomFieldData;
}

export interface ICustomFields {
  data: ICustomFieldData[];
}

export interface ICustomFieldOptionsData {
  id: string;
  type: string;
  attributes: {
    key: string;
    title_multiloc: Multiloc;
    ordering: number;
    created_at: string;
    updated_at: string;
  };
  relationships: {
    custom_field_options: {
      data: IRelationship;
    };
  };
}

export interface ICustomFieldOptions {
  data: ICustomFieldOptionsData[];
}

export function customFieldForUsersStream(customFieldId: string, streamParams: IStreamParams | null = null) {
  return streams.get<ICustomField>({ apiEndpoint: `${API_PATH}/users/custom_fields/${customFieldId}`, ...streamParams });
}

export function customFieldsForUsersStream(streamParams: IStreamParams | null = null) {
  return streams.get<ICustomFields>({ apiEndpoint: `${API_PATH}/users/custom_fields`, ...streamParams });
}

export function customFieldsSchemaForUsersStream(streamParams: IStreamParams | null = null) {
  return streams.get<any>({ apiEndpoint: `${API_PATH}/users/custom_fields/schema`, ...streamParams });
}

export function addCustomFieldForUsers(data) {
  return streams.add<ICustomField>(`${API_PATH}/users/custom_fields`, { custom_field: data });
}

export function updateCustomFieldForUsers(customFieldId: string, object) {
  return streams.update<ICustomField>(`${API_PATH}/users/custom_fields/${customFieldId}`, customFieldId, { custom_field: object });
}

export function reorderCustomFieldForUsers(customFieldId: string, object) {
  return streams.update<ICustomField>(`${API_PATH}/users/custom_fields/${customFieldId}/reorder`, customFieldId, { custom_field: object });
}

export function deleteCustomField(customFieldId: string) {
  return streams.delete(`${API_PATH}/users/custom_fields/${customFieldId}`, customFieldId);
}

export function customFieldOptionsStream(customFieldId: string, streamParams: IStreamParams | null = null) {
  return streams.get<ICustomFieldOptions>({ apiEndpoint: `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options`, ...streamParams });
}

export function addCustomFieldOption(customFieldId: string, data) {
  return streams.add<ICustomField>(`${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options`, { custom_field_option: data });
}

export function updateCustomFieldOption(customFieldId: string, optionId: string, object) {
  return streams.update<ICustomFieldOptions>(`${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options/${optionId}`, optionId, { custom_field_option: object });
}

export function deleteCustomFieldOption(customFieldId: string, optionId: string) {
  return streams.delete(`${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options/${optionId}`, optionId);
}
