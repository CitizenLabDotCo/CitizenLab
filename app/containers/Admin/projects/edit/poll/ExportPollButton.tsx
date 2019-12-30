// Libraries
import React from 'react';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// typings
import { IParticipationContextType } from 'typings';

// components
import Button from 'components/UI/Button';
import { exportPollResponses } from 'services/pollResponses';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

interface Props {
  participationContextType: IParticipationContextType;
  participationContextId: string;
  className?: string;
}

interface State {
  exporting: boolean;
}

export default class ExportPollButton extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exporting: false,
    };
  }

  trackExportPoll = () => {
    trackEventByName(tracks.clickExportPoll.name, { extra: { ...this.props } });
  }

  handleExportPollResults = () => {
    this.trackExportPoll();

    this.setState({ exporting: true });
    exportPollResponses(this.props.participationContextId, this.props.participationContextType);
    this.setState({ exporting: false });
  }

  render() {
    const { className } = this.props;
    const { exporting } = this.state;
    return (
      <Button
        style="secondary"
        icon="download"
        onClick={this.handleExportPollResults}
        processing={exporting}
        className={className}
      >
        <FormattedMessage {...messages.exportPollResults} />
      </Button>
    );
  }
}
