import React from 'react';
import Button from 'components/UI/Button';
import { fontSizes } from 'utils/styleUtils';

// i18n
import messages from '../../messages';
import { FormattedMessage } from 'utils/cl-intl';
import { exportType } from '../ExportMenu';
import { isString } from 'util';
import { requestBlob } from 'utils/request';
import { API_PATH } from 'containers/App/constants';
import { trackEventByName } from 'utils/analytics';
import tracks from '../../tracks';
import { saveAs } from 'file-saver';

interface Props {
  exportQueryParameter: 'all' | string | string[];
  exportType: exportType;
}

interface State {
  exporting: boolean;
}

export default class ExportInitiativesButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exporting: false,
    };
  }

  handleExportInitiatives = async () => {
    const { exportQueryParameter } = this.props;
    console.log(exportQueryParameter);

    const queryParametersObject = {};
    if (isString(exportQueryParameter) && exportQueryParameter !== 'all') {
      queryParametersObject['project'] = exportQueryParameter;
    } else if (!isString(exportQueryParameter)) {
      queryParametersObject['initiatives'] = exportQueryParameter;
    }

    try {
      this.setState({ exporting: true });
      const blob = await requestBlob(`${API_PATH}/initiatives/as_xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', queryParametersObject);
      saveAs(blob, 'initiatives-export.xlsx');
      this.setState({ exporting: false });
    } catch (error) {
      console.log(error);
      this.setState({ exporting: false });
    }

    // track this click for user analytics
    trackEventByName(tracks.clickExportInitiatives.name);
  }

  render() {
    const { exportType } = this.props;
    const { exporting } = this.state;
    return (
      <Button
        style="text"
        onClick={this.handleExportInitiatives}
        processing={exporting}
        padding="0"
        fontSize={`${fontSizes.small}px`}
      >
        {exportType === 'all' && <FormattedMessage {...messages.exportInitiatives} />}
        {exportType === 'project' && <FormattedMessage {...messages.exportInitiativesProjects} />}
        {exportType === 'selected_posts' && <FormattedMessage {...messages.exportSelectedInitiatives} />}
      </Button>
    );
  }
}
