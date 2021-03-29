import { ProjectTabOptions } from 'containers/Admin/projects/edit';
import { FC, useEffect } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { IPhaseData } from 'services/phases';
import { IProjectData } from 'services/projects';
import { InsertConfigurationOptions, ITab } from 'typings';
import { injectIntl } from 'utils/cl-intl';
import { isNilOrError } from 'utils/helperUtils';
import messages from './messages';

type Props = {
  onData: (data: ProjectTabOptions<InsertConfigurationOptions<ITab>>) => void;
};

const Tab: FC<Props & InjectedIntlProps> = ({
  onData,
  intl: { formatMessage },
}) => {
  useEffect(() => {
    const tabName = 'map';
    onData({
      tabOptions: {
        configuration: {
          label: formatMessage(messages.mapTab),
          name: tabName,
          url: 'map',
          feature: 'custom_maps',
        },
        insertBeforeName: 'phases',
      },
      tabHideConditions: {
        [tabName]: (project: IProjectData, phases: IPhaseData[] | null) => {
          const processType = project.attributes.process_type;
          const participationMethod = project.attributes.participation_method;

          return (
            (processType === 'continuous' &&
              participationMethod !== 'ideation' &&
              participationMethod !== 'budgeting') ||
            (processType === 'timeline' &&
              !isNilOrError(phases) &&
              phases.filter((phase) => {
                return (
                  phase.attributes.participation_method === 'ideation' ||
                  phase.attributes.participation_method === 'budgeting'
                );
              }).length === 0)
          );
        },
      },
    });
  }, []);

  return null;
};

export default injectIntl(Tab);
