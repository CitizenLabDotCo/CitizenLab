import React from 'react';
import { adopt } from 'react-adopt';

// components
import HelmetIntl from 'components/HelmetIntl';
import PageWrapper from 'components/admin/PageWrapper';
import PostManager from 'components/admin/PostManager';
import IdeaButton from 'components/IdeaButton';
import { PageTitle, SectionSubtitle } from 'components/admin/Section';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// styling
import styled from 'styled-components';

// resources
import GetProjects, { GetProjectsChildProps } from 'resources/GetProjects';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
`;

const Left = styled.div`
  margin-right: 80px;
`;

export interface Props {
  projects: GetProjectsChildProps;
}

class IdeaDashboard extends React.PureComponent<Props> {
  render() {
    const { projects } = this.props;

    return (
      <>
        <HelmetIntl
          title={messages.helmetTitle}
          description={messages.helmetDescription}
        />
        <HeaderContainer>
          <Left>
            <PageTitle>
              <FormattedMessage {...messages.header} />
            </PageTitle>
            <SectionSubtitle>
              <FormattedMessage {...messages.headerSubtitle} />
            </SectionSubtitle>
          </Left>
          <IdeaButton />
        </HeaderContainer>

        <PageWrapper>
          {projects && projects.projectsList !== undefined &&
            <PostManager
              type="AllIdeas"
              visibleFilterMenus={['projects', 'topics', 'statuses']}
              projects={projects.projectsList}
            />
          }
        </PageWrapper>
      </>
    );
  }
}

const Data = adopt<Props>({
  projects: <GetProjects pageSize={250} sort="new" publicationStatuses={['draft', 'published', 'archived']} filterCanModerate={true} />,
});

export default () => (
  <Data>
    {dataProps => <IdeaDashboard{...dataProps} />}
  </Data>
);
