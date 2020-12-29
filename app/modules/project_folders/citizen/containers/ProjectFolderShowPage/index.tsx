import React, { memo } from 'react';
import { isError, isUndefined } from 'lodash-es';
import { withRouter, WithRouterProps } from 'react-router';
import { isNilOrError } from 'utils/helperUtils';

// components
import ProjectFolderShowPageMeta from './ProjectFolderShowPageMeta';
import ProjectFolderHeader from './ProjectFolderHeader';
import ProjectFolderDescription from './ProjectFolderDescription';
import ProjectFolderProjectCards from './ProjectFolderProjectCards';
import Button from 'components/UI/Button';
import { Spinner } from 'cl2-component-library';
import ContentContainer from 'components/ContentContainer';

// hooks
import useLocale from 'hooks/useLocale';
import useTenant from 'hooks/useTenant';
import useProjectFolder from 'hooks/useProjectFolder';
import useAdminPublicationPrefetchProjects from 'hooks/useAdminPublicationPrefetchProjects';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// style
import styled from 'styled-components';
import { maxPageWidth } from './styles';
import { media, fontSizes, colors } from 'utils/styleUtils';
import { darken } from 'polished';

// typings
import { IProjectFolderData } from 'modules/project_folders/services/projectFolders';

const Container = styled.main`
  flex: 1 0 auto;
  height: 100%;
  min-height: calc(
    100vh - ${(props) => props.theme.menuHeight + props.theme.footerHeight}px
  );
  display: flex;
  flex-direction: column;
  background: #fff;

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${(props) => props.theme.mobileMenuHeight}px - ${(
    props
  ) => props.theme.mobileTopBarHeight}px);
  `}
`;

const Loading = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContentContainer = styled(ContentContainer)`
  margin-top: 25px;
  margin-bottom: 100px;
`;

const StyledProjectFolderHeader = styled(ProjectFolderHeader)`
  flex: 1;
  margin-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    align-items: stretch;
  `};
`;

const StyledProjectFolderDescription = styled(ProjectFolderDescription)`
  flex: 1;

  ${media.smallerThanMaxTablet`
    margin-bottom: 30px;
  `};
`;

const StyledProjectFolderProjectCards = styled(ProjectFolderProjectCards)`
  flex: 0 0 790px;
  width: 790px;
  padding: 25px;
  margin-left: 80px;
  margin-top: 4px;
  background: ${colors.background};
  background: ${darken(0.05, colors.background)};
  border-radius: ${(props: any) => props.theme.borderRadius};

  ${media.smallerThan1200px`
    flex: 0 0 500px;
    width: 500px;
  `};

  ${media.smallerThanMaxTablet`
    flex: 1;
    width: 100%;
    margin: 0;
  `};
`;

const NotFoundWrapper = styled.div`
  height: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  font-size: ${fontSizes.large}px;
  color: ${colors.label};
`;

const ProjectFolderShowPage = memo<{
  projectFolder: IProjectFolderData;
}>(({ projectFolder }) => {
  const locale = useLocale();
  const tenant = useTenant();
  const adminPublication = useAdminPublicationPrefetchProjects({
    folderId: projectFolder.id,
    publicationStatusFilter: ['published', 'archived'],
  });

  const folderNotFound = isError(projectFolder);
  const loading =
    isUndefined(locale) ||
    isUndefined(tenant) ||
    isUndefined(projectFolder) ||
    isUndefined(adminPublication?.list);

  return (
    <>
      <ProjectFolderShowPageMeta projectFolder={projectFolder} />
      <Container
        className={`${!loading ? 'loaded' : 'loading'} e2e-folder-page`}
      >
        {folderNotFound ? (
          <NotFoundWrapper>
            <p>
              <FormattedMessage {...messages.noFolderFoundHere} />
            </p>
            <Button
              linkTo="/projects"
              text={<FormattedMessage {...messages.goBackToList} />}
              icon="arrow-back"
            />
          </NotFoundWrapper>
        ) : loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : !isNilOrError(projectFolder) ? (
          <StyledContentContainer maxWidth={maxPageWidth}>
            <StyledProjectFolderHeader projectFolder={projectFolder} />
            <Content>
              <StyledProjectFolderDescription projectFolder={projectFolder} />
              <StyledProjectFolderProjectCards list={adminPublication.list} />
            </Content>
          </StyledContentContainer>
        ) : null}
      </Container>
    </>
  );
});

const ProjectFolderShowPageWrapper = memo<WithRouterProps>(
  ({ params: { slug } }) => {
    const projectFolder = useProjectFolder({ projectFolderSlug: slug });

    if (!isNilOrError(projectFolder)) {
      return <ProjectFolderShowPage projectFolder={projectFolder} />;
    }

    return null;
  }
);

export default withRouter(ProjectFolderShowPageWrapper);
