import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  MouseEvent,
} from 'react';
import clHistory from 'utils/cl-router/history';

// components
import Outlet from 'components/Outlet';
import { Icon } from 'cl2-component-library';
import AdminProjectEditGeneral from 'containers/Admin/projects/edit/general';
import { HeaderTitle } from './StyledComponents';

// hooks
import useFeatureFlag from 'hooks/useFeatureFlag';

// utils
import eventEmitter from 'utils/eventEmitter';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

// style
import { colors } from 'utils/styleUtils';
import styled from 'styled-components';
import { transparentize } from 'polished';

// animations
import CSSTransition from 'react-transition-group/CSSTransition';

const duartion = 350;
const easing = 'cubic-bezier(0.19, 1, 0.22, 1)';

const Container = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.separation};
`;

const CreateProjectContent = styled.div`
  width: 100%;
  opacity: 0;
  display: none;
  transition: all ${duartion}ms ${easing};
  will-change: opacity, height;

  &.content-enter {
    opacity: 0;
    max-height: 0px;
    overflow: hidden;
    display: block;

    &.content-enter-active {
      opacity: 1;
      max-height: 635px;
      overflow: hidden;
      display: block;
    }
  }

  &.content-enter-done {
    opacity: 1;
    max-height: auto;
    overflow: visible;
    display: block;
  }

  &.content-exit {
    opacity: 1;
    max-height: 635px;
    overflow: hidden;
    display: block;

    &.content-exit-active {
      opacity: 0;
      max-height: 0px;
      overflow: hidden;
      display: block;
    }
  }

  &.content-exit-done {
    display: none;
    max-height: auto;
  }
`;

const CreateProjectContentInner = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 0.5rem;
  padding-bottom: 2.8rem;
`;

const Expand = styled.div`
  display: flex;
  align-items: center;
`;

const ExpandIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: solid 1px ${transparentize(0.7, colors.label)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-out;
`;

const ExpandIcon = styled(Icon)`
  height: 11px;
  fill: ${colors.label};
  transition: all ${duartion - 100}ms ease-out;

  &.expanded {
    transform: rotate(90deg);
  }
`;

const CreateProjectButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 30px;
  padding-bottom: 30px;
  margin: 0;
  cursor: pointer;

  &:hover {
    ${ExpandIconWrapper} {
      border-color: ${transparentize(0.2, colors.label)};
    }
  }
`;

export interface INewProjectCreatedEvent {
  projectId?: string;
}

interface Props {
  className?: string;
}

const CreateProject = memo<Props & InjectedIntlProps>(({ className, intl }) => {
  const projectTemplatesEnabled = useFeatureFlag('admin_project_templates');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const subscription = eventEmitter
      .observeEvent<INewProjectCreatedEvent>('NewProjectCreated')
      .subscribe(({ eventValue }) => {
        const projectId = eventValue?.projectId;

        if (projectId) {
          setTimeout(() => {
            clHistory.push({
              pathname: `/admin/projects/${projectId}/edit`,
            });
          }, 1000);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const removeFocus = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  const handleExpandCollapse = useCallback(() => {
    if (expanded) {
      trackEventByName(tracks.createProjectSectionCollapsed);
    } else {
      trackEventByName(tracks.createProjectSectionExpanded);
    }

    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container className={className}>
      <CreateProjectButton
        className={`e2e-create-project-expand-collapse-button ${
          expanded ? 'expanded' : 'collapsed'
        }`}
        aria-label={intl.formatMessage(messages.createAProjectFromATemplate)}
        onMouseDown={removeFocus}
        onClick={handleExpandCollapse}
      >
        <HeaderTitle>
          <FormattedMessage {...messages.createAProject} />
        </HeaderTitle>
        <Expand>
          <ExpandIconWrapper>
            <ExpandIcon
              name="chevron-right"
              className={expanded ? 'expanded' : 'collapsed'}
            />
          </ExpandIconWrapper>
        </Expand>
      </CreateProjectButton>
      <CSSTransition
        classNames="content"
        in={expanded}
        timeout={duartion}
        mounOnEnter={true}
        unmountOnExit={true}
        enter={true}
      >
        <CreateProjectContent
          className={`${expanded ? 'expanded' : 'collapsed'}`}
        >
          <CreateProjectContentInner>
            {projectTemplatesEnabled ? (
              <Outlet id="app.containers.Admin.projects.all" />
            ) : (
              <AdminProjectEditGeneral />
            )}
          </CreateProjectContentInner>
        </CreateProjectContent>
      </CSSTransition>
    </Container>
  );
});

export default injectIntl(CreateProject);
