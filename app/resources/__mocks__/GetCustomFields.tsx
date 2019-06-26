import { GetCustomFieldsChildProps } from 'resources/GetCustomFields';

export const mockGetCustomFields = [
  {
    id: '3d9ad03c-fbe3-47e5-8d6d-c8bbc512682d',
    type: 'custom_field',
    attributes: {
      key: 'gender',
      input_type: 'select',
      title_multiloc: {
        en: 'Gender',
        'da-DK': 'Gender',
        'de-DE': 'Geschlecht',
        'en-CA': 'Gender',
        'en-GB': 'Gender',
        'fr-BE': 'Genre',
        'fr-FR': 'Genre',
        'nb-NO': 'Gender',
        'nl-BE': 'Geslacht',
        'nl-NL': 'Geslacht'
      },
      description_multiloc: {},
      required: false,
      ordering: 0,
      enabled: true,
      code: 'gender',
      created_at: '2018-12-03T11:01:46.392Z',
      updated_at: '2018-12-03T11:01:46.392Z'
    }
  },
  {
    id: '45f7f17d-5b05-4be4-879a-ca9a040596c0',
    type: 'custom_field',
    attributes: {
      key: 'domicile',
      input_type: 'select',
      title_multiloc: {
        en: 'Place of residence',
        'da-DK': 'Place of residence',
        'de-DE': 'Wohnort',
        'en-CA': 'Place of residence',
        'en-GB': 'Place of residence',
        'fr-BE': 'Domicile',
        'fr-FR': 'Domicile',
        'nb-NO': 'Place of residence',
        'nl-BE': 'Woonplaats',
        'nl-NL': 'Woonplaats'
      },
      description_multiloc: {},
      required: false,
      ordering: 2,
      enabled: true,
      code: 'domicile',
      created_at: '2018-12-03T11:01:46.436Z',
      updated_at: '2018-12-03T11:01:46.436Z'
    }
  },
  {
    id: '4145ae1d-da1e-4984-a043-e1269eb37cd4',
    type: 'custom_field',
    attributes: {
      key: 'multiselect_test',
      input_type: 'multiselect',
      title_multiloc: {
        en: 'Multiselect test ',
        'nl-BE': 'Multiselect test '
      },
      description_multiloc: {
        en: 'Multiselect test field',
        'nl-BE': 'Multiselect test field'
      },
      required: false,
      ordering: 5,
      enabled: true,
      code: null,
      created_at: '2018-12-03T11:16:19.452Z',
      updated_at: '2018-12-03T11:16:19.452Z'
    }
  },
  {
    id: 'a0e5a642-a67d-4f73-bb52-35af018a903c',
    type: 'custom_field',
    attributes: {
      key: 'are_you_ready',
      input_type: 'checkbox',
      title_multiloc: {
        en: 'Are you ready ?'
      },
      description_multiloc: {
        en: 'Test checkbox'
      },
      required: false,
      ordering: 6,
      enabled: true,
      code: null,
      created_at: '2018-12-03T11:18:06.161Z',
      updated_at: '2018-12-03T11:18:06.161Z'
    }
  }
] as GetCustomFieldsChildProps;
