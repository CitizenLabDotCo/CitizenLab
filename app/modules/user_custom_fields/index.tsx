import React from 'react';
import { ModuleConfiguration } from 'utils/moduleUtils';
import CustomFieldGraphs from './admin/components/CustomFieldGraphs';
import RegistrationFieldsToGraphs from './admin/components/RegistrationFieldsToGraphs';
import Tab from './admin/components/Tab';
import CustomFieldsStep from './citizen/components/CustomFieldsStep';
import UserCustomFieldsForm from './citizen/components/UserCustomFieldsForm';

const configuration: ModuleConfiguration = {
  routes: {
    'admin.settings': [
      {
        path: 'registration',
        container: () => import('./admin/containers/settings/registration'),
      },
    ],
  },
  outlets: {
    'app.containers.Admin.dashboard.users.graphs': RegistrationFieldsToGraphs,
    'app.components.SignUpIn.SignUp.step': (props) => (
      <CustomFieldsStep {...props} />
    ),
    'app.containers.Admin.dashboard.reports.ProjectReport.graphs': CustomFieldGraphs,
    'app.containers.UserEditPage.ProfileForm.forms': ({
      hasCustomFields,
      ...props
    }) => {
      if (hasCustomFields) return <UserCustomFieldsForm {...props} />;
      return null;
    },
    'app.containers.Admin.settings.SettingsPage': Tab,
  },
};

export default configuration;
