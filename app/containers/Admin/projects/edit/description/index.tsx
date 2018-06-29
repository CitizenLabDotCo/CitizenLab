// Libraries
import React from 'react';
import { isEmpty } from 'lodash';
import { isNilOrError } from 'utils/helperUtils';
import { Formik } from 'formik';
import { withRouter, WithRouterProps } from 'react-router';

// Services / Data loading
import { updateProject,  IProjectData } from 'services/projects';
import GetProject from 'resources/GetProject';

// Components
import DescriptionEditionForm, { Values } from './DescriptionEditionForm';
import QuillMultiloc from 'components/QuillEditor/QuillMultiloc';

// styles
import { ProjectDescriptionStyled } from 'containers/ProjectsShowPage/info/ProjectInfo';

const ProjectDesc = ProjectDescriptionStyled.extend``;

// Typing
import { API } from 'typings';

interface InputProps {}

interface DataProps {
  project: IProjectData;
}

interface Props extends InputProps, DataProps {}

class ProjectDescription extends React.PureComponent<Props> {
  saveProject = (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    const { project } = this.props;

    if (!isEmpty(values) && project.id) {
      setSubmitting(true);
      setStatus(null);

      // Send the values to the API
      updateProject(project.id, values).catch((errorResponse) => {
        // Process errors from the API and push them to the Formik context
        const apiErrors = (errorResponse as API.ErrorResponse).json.errors;
        setErrors(apiErrors);
        setSubmitting(false);
      }).then(() => {
        // Reset the Formik context for touched and errors tracking
        resetForm();
        setStatus('success');
      });
    }
  }

  render () {
    const { description_preview_multiloc, description_multiloc }: Values = this.props.project.attributes;

    return (
      <>
      <Formik
        onSubmit={this.saveProject}
        initialValues={{
          description_preview_multiloc,
          description_multiloc,
        }}
      >
        {(formikProps) => (
          <DescriptionEditionForm {...formikProps} />
        )}
      </Formik>
      <ProjectDesc>
        <QuillMultiloc
          id="1"
          valueMultiloc={this.props.project.attributes.description_multiloc}
          label="description"
        />
      </ProjectDesc>
      </>
    );
  }
}

export default withRouter<InputProps>((inputProps: InputProps & WithRouterProps) => (
  <GetProject id={inputProps.params.projectId}>
    {project => !isNilOrError(project) ? < ProjectDescription {...inputProps} project={project} /> : null}
  </GetProject>
));
