import React from 'react';
import { saveAs } from 'file-saver';

// components
import Button from 'components/UI/Button';
import PageWrapper from 'components/admin/PageWrapper';
import IdeaManager from 'components/admin/IdeaManager';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// utils
import { API_PATH } from 'containers/App/constants';
import { requestBlob } from 'utils/request';

// analytics
import { injectTracks } from 'utils/analytics';
import tracks from '../tracks';

// styling
import styled from 'styled-components';
import { fontSize } from 'utils/styleUtils';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
`;

const HeaderTitle = styled.h1`
  font-size: ${fontSize('xxxl')};
  line-height: 40px;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

const ExportButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ExportIdeasButton = styled(Button)`
  margin-right: 10px;
`;

const ExportCommentsButton = styled(Button)``;

interface Props {}

interface ITracks {
  clickExportAllIdeas: () => void;
  clickExportAllComments: () => void;
}

interface State {
  exportingIdeas: boolean;
  exportingComments: boolean;
}

export class AllIdeas extends React.PureComponent<Props & ITracks, State> {
  constructor(props: Props & ITracks) {
    super(props);
    this.state = {
      exportingIdeas: false,
      exportingComments: false,
    };
  }

  handleExportIdeas = async () => {
    // track this click for user analytics
    this.props.clickExportAllIdeas();
    try {
      this.setState({ exportingIdeas: true });
      const blob = await requestBlob(`${API_PATH}/ideas/as_xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      saveAs(blob, 'ideas-export.xlsx');
      this.setState({ exportingIdeas: false });
    } catch (error) {
      this.setState({ exportingIdeas: false });
    }
  }

  handleExportComments = async () => {
    // track this click for user analytics
    this.props.clickExportAllComments();
    try {
      this.setState({ exportingComments: true });
      const blob = await requestBlob(`${API_PATH}/comments/as_xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      saveAs(blob, 'comments-export.xlsx');
      this.setState({ exportingComments: false });

    } catch (error) {
      this.setState({ exportingComments: false });
    }
  }

  render() {
    return (
      <>
        <HeaderContainer>
          <HeaderTitle>
            <FormattedMessage {...messages.header} />
          </HeaderTitle>
          <ExportButtons>
            <ExportIdeasButton
              style="cl-blue"
              icon="download"
              onClick={this.handleExportIdeas}
              processing={this.state.exportingIdeas}
            >
              <FormattedMessage {...messages.exportIdeas} />
            </ExportIdeasButton>
            <ExportCommentsButton
              style="cl-blue"
              icon="download"
              onClick={this.handleExportComments}
              processing={this.state.exportingComments}
            >
              <FormattedMessage {...messages.exportComments} />
            </ExportCommentsButton>
          </ExportButtons>
        </HeaderContainer>
        <PageWrapper>
          <IdeaManager />
        </PageWrapper>
      </>
    );
  }
}

export default injectTracks<Props>(tracks)(AllIdeas);
