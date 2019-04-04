import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';

// components
import FilterSelector from 'components/FilterSelector';

// resources
import GetProjects, { GetProjectsChildProps } from 'resources/GetProjects';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';
import localize, { InjectedLocalized } from 'utils/localize';

type DataProps = {
  projects: GetProjectsChildProps;
};

type InputProps = {
  id?: string | undefined;
  onChange: (value: any) => void;
};

type Props = InputProps & DataProps;

type State = {
  selectedValues: string[];
};

class SelectProjects extends PureComponent<Props & InjectedLocalized, State> {
  constructor(props: Props) {
    super(props as any);
    this.state = {
      selectedValues: [],
    };
  }

  handleOnChange = (selectedValues) => {
    this.setState({ selectedValues });
    this.props.onChange(selectedValues);
  }

  render() {
    const { selectedValues } = this.state;
    const { projects, localize } = this.props;
    const projectsList = projects.projectsList;
    let options: any = [];

    if (projectsList && projectsList.length > 0) {
      options = projectsList.map(project => {
        return {
          text:  localize(project.attributes.title_multiloc),
          value: project.id
        };
      });

      if (options && options.length > 0) {
        return (
          <FilterSelector
            id="e2e-project-filter-selector"
            title={<FormattedMessage {...messages.projectFilterTitle} />}
            name="projects"
            selected={selectedValues}
            values={options}
            onChange={this.handleOnChange}
            multiple={true}
            right="-10px"
            mobileLeft="-5px"
          />
        );
      }
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  projects: <GetProjects publicationStatuses={['published']} sort="new" />
});

const SelectProjectsWithLocalize = localize(SelectProjects);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <SelectProjectsWithLocalize {...dataProps} {...inputProps} />}
  </Data>
);
