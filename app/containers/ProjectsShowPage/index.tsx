import * as React from 'react';
import * as Rx from 'rxjs/Rx';
import { isString } from 'lodash';

// router
import { Link, browserHistory } from 'react-router';

// components
import Meta from './Meta';
import Icon from 'components/UI/Icon';
import ContentContainer from 'components/ContentContainer';
import Footer from 'components/Footer';

// services
import { projectBySlugStream, IProject } from 'services/projects';
import { projectImagesStream } from 'services/projectImages';
import { phasesStream } from 'services/phases';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;

  ${media.smallerThanMaxTablet`
    padding: 0;
  `}

  &.timeline {
    ${media.smallerThanMaxTablet`
      height: 400px;
      padding: 0;
    `}
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  &.timeline {
    margin-top: -65px;
  }

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    justify-content: flex-start;
  `}
`;

const HeaderContentLeft = styled.div`
  flex: 1;
  margin-right: 30px;
  max-width: 500px;

  ${media.biggerThanMaxTablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`;

const HeaderContentRight = styled.div`
  ${media.biggerThanMaxTablet`
    display: flex;
    align-items: center;
    justify-content: right;
  `}

  ${media.smallerThanMaxTablet`
    margin-top: 20px;
  `}
`;

// const HeaderLabel = styled.div`
//   color: #fff;
//   font-size: 16px;
//   font-weight: 300;
//   text-align: left;
//   margin: 0;
//   padding: 0;
//   z-index: 2;
// `;

const HeaderTitle = styled.div`
  color: #fff;
  font-size: 42px;
  line-height: 46px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 0;
  z-index: 2;

  ${media.smallerThanMaxTablet`
    font-weight: 600;
    font-size: 31px;
    line-height: 36px;
  `}
`;

const HeaderButtons = styled.div`
  min-width: 200px;
`;

const HeaderButtonIconWrapper = styled.div`
  width: 20px;
  height: 15px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderButtonIcon = styled(Icon)`
  fill: #fff;
`;

const HeaderButtonText = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  white-space: nowrap;
`;

const HeaderButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 14px 20px;
  margin-top: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  transition: all 80ms ease-out;

  &.active {
    background: #fff;

    ${HeaderButtonIcon} {
      fill: #333;
    }

    ${HeaderButtonText} {
      color: #333;
    }
  }

  &:not(.active):hover {
    text-decoration: none;
    background: #000;
  }
`;

const HeaderOverlay = styled.div`
  background: #000;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const HeaderImage: any = styled.div`
  background-image: url(${(props: any) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Content = styled.div`
  width: 100%;
  z-index: 2;
  overflow: visible;
`;

type Props = {
  params: {
    slug: string;
  };
};

type State = {
  project: IProject | null;
};

export default class ProjectsShowPage extends React.PureComponent<Props, State> {
  slug$: Rx.BehaviorSubject<string>;
  subscriptions: Rx.Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
    this.slug$ = new Rx.BehaviorSubject(null as any);
    this.subscriptions = [];
  }

  componentWillMount() {
    this.slug$.next(this.props.params.slug);

    this.subscriptions = [
      this.slug$.distinctUntilChanged().filter(slug => isString(slug)).switchMap((slug) => {
        const project$ = projectBySlugStream(slug).observable;
        return project$;
      }).switchMap((project) => {
        const projectImages$ = projectImagesStream(project.data.id).observable;
        const phases$ = phasesStream(project.data.id).observable;
        return Rx.Observable.combineLatest(
          projectImages$,
          phases$
        ).map(() => project);
      }).subscribe((project) => {
        this.setState({ project });
      })
    ];
  }

  componentWillReceiveProps(newProps: Props) {
    this.slug$.next(newProps.params.slug);
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { project } = this.state;

    if (project) {
      const { children } = this.props;
      const projectSlug = project.data.attributes.slug;
      const projectHeaderImageLarge = (project.data.attributes.header_bg.large || null);
      const projectType = project.data.attributes.process_type;
      const currentLocation = browserHistory.getCurrentLocation();
      const { pathname } = currentLocation;

      return (
        <React.Fragment>
          <Meta projectSlug={projectSlug} />

          <Container>
            <Header className={projectType}>
              <HeaderImage src={projectHeaderImageLarge} />
              <HeaderOverlay />
              <ContentContainer>
                <HeaderContent className={projectType}>
                  <HeaderContentLeft>
                    {/*
                    <HeaderLabel>
                      <FormattedMessage {...messages.project} />
                    </HeaderLabel>
                    */}

                    <HeaderTitle>
                      <T value={project.data.attributes.title_multiloc} />
                    </HeaderTitle>
                  </HeaderContentLeft>

                  <HeaderContentRight>
                    <HeaderButtons>
                      {project && project.data.attributes.process_type === 'timeline' &&
                        <HeaderButton
                          to={`/projects/${projectSlug}`}
                          className={pathname === `/projects/${projectSlug}` ? 'active' : ''}
                        >
                          <HeaderButtonIconWrapper>
                            <HeaderButtonIcon name="timeline" />
                          </HeaderButtonIconWrapper>
                          <HeaderButtonText>
                            <FormattedMessage {...messages.navTimeline} />
                          </HeaderButtonText>
                        </HeaderButton>
                      }

                      <HeaderButton
                        to={`/projects/${projectSlug}/info`}
                        className={(pathname === `/projects/${projectSlug}/info` || project.data.attributes.process_type === 'continuous' && pathname === `/projects/${projectSlug}`) ? 'active' : ''}
                      >
                        <HeaderButtonIconWrapper>
                          <HeaderButtonIcon name="info2" />
                        </HeaderButtonIconWrapper>
                        <HeaderButtonText>
                          <FormattedMessage {...messages.navInformation} />
                        </HeaderButtonText>
                      </HeaderButton>

                      <HeaderButton
                        to={`/projects/${projectSlug}/events`}
                        className={pathname === `/projects/${projectSlug}/events` ? 'active' : ''}
                      >
                        <HeaderButtonIconWrapper>
                          <HeaderButtonIcon name="calendar" />
                        </HeaderButtonIconWrapper>
                        <HeaderButtonText>
                          <FormattedMessage {...messages.navEvents} />
                        </HeaderButtonText>
                      </HeaderButton>

                      {project && project.data.attributes.process_type === 'continuous' &&
                        <HeaderButton
                          to={`/projects/${projectSlug}/ideas`}
                          className={pathname === `/projects/${projectSlug}/ideas` ? 'active' : ''}
                        >
                          <HeaderButtonIconWrapper>
                            <HeaderButtonIcon name="idea" />
                          </HeaderButtonIconWrapper>
                          <HeaderButtonText>
                            <FormattedMessage {...messages.navIdeas} />
                          </HeaderButtonText>
                        </HeaderButton>
                      }
                    </HeaderButtons>
                  </HeaderContentRight>
                </HeaderContent>
              </ContentContainer>
            </Header>

            <Content>
              {children}
            </Content>
          </Container>

          <Footer showCityLogoSection={false} />

        </React.Fragment>
      );
    }

    return null;
  }
}
