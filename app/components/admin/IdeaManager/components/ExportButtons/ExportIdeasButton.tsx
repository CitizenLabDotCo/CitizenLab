import React from 'react';
import Button from 'components/UI/Button';

// i18n
import messages from '../../messages';
import { FormattedMessage } from 'utils/cl-intl';

interface State {}

interface Props {
  onClick: () => void;
  exportingIdeas: boolean;
  exportType: string;
}

export default class ExportIdeasButton extends React.PureComponent<Props, State> {
  render() {
    const { onClick, exportingIdeas, exportType } = this.props;
    return (
      <Button
        style="secondary"
        icon="download"
        onClick={onClick}
        processing={exportingIdeas}
      >
        {exportType === 'all' && <FormattedMessage {...messages.exportIdeas} />}
        {exportType === 'project' && <FormattedMessage {...messages.exportIdeasProjects} />}
        {exportType === 'selected_ideas' && <FormattedMessage {...messages.exportSelectedIdeas} />}
      </Button>
    );
  }
}
