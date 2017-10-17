// Libraries
import * as React from 'react';
import * as Rx from 'rxjs/Rx';

// i18n
import { FormattedMessage } from 'react-intl';
import T from 'components/T';
import messages from './messages';

// Components
import Button from 'components/UI/Button';
import Modal from 'components/UI/Modal';
import PageWrapper from 'components/admin/PageWrapper';
import GroupListTable from './GroupListTable';

// Style
import styled from 'styled-components';

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const ButtonWrapper = styled.div`
  border-bottom: 1px solid #EAEAEA;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
`;

// Typing
interface Props {
}

interface State {
  creationModalVisible: boolean;
}

class GroupsList extends React.Component<Props, State> {
  constructor () {
    super();

    this.state = {
      creationModalVisible: false,
    };
  }

  openCreationModal = () => {
    this.setState({ creationModalVisible: true });
  }

  closeCreationModal = () => {
    this.setState({ creationModalVisible: false });
  }

  render() {
    const { creationModalVisible } = this.state;

    return (
      <div>
        <PageTitle>
          <FormattedMessage {...messages.listTitle} />
        </PageTitle>
        <PageWrapper>

          <ButtonWrapper>
            <Button onClick={this.openCreationModal}><FormattedMessage {...messages.addGroupButton} /></Button>
          </ButtonWrapper>

          <GroupListTable />

          <Modal opened={creationModalVisible} close={this.closeCreationModal}>
            <p>Creation</p>
          </Modal>
        </PageWrapper>
      </div>
    );
  }
}

export default GroupsList;
