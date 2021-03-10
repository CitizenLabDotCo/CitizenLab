import React from 'react';
import { ModuleConfiguration } from 'utils/moduleUtils';
import AdminProjectTemplates from './admin/containers';

const configuration: ModuleConfiguration = {
  outlets: {
    'app.containers.Admin.projects.all': (_props) => <AdminProjectTemplates />,
  },
};

export default configuration;
