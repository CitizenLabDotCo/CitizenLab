import * as React from 'react';
import * as Rx from 'rxjs/Rx';

// router
import { Link } from 'react-router';

// components
import Meta from './Meta';
import Icon from 'components/UI/Icon';
import ContentContainer from 'components/ContentContainer';

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
  padding-left: 30px;
  padding-right: 30px;
  position: relative;

  ${media.smallerThanMaxTablet`
    padding-left: 0px;
    padding-right: 0px;
  `}

  ${media.smallerThanMinTablet`
    height: auto;
    padding-bottom: 120px;
  `}
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 75px;

  ${media.smallerThanMinTablet`
    flex-direction: column;
  `}
`;

const HeaderContentLeft = styled.div`
  flex: 1;
  margin-right: 15px;

  ${media.biggerThanMinTablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`;

const HeaderContentRight = styled.div`
  ${media.biggerThanMinTablet`
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  ${media.smallerThanMinTablet`
    margin-top: 20px;
  `}
`;

const HeaderLabel = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  text-align: left;
  margin: 0;
  padding: 0;
  z-index: 2;
`;

const HeaderTitle = styled.div`
  color: #fff;
  font-size: 42px;
  line-height: 48px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  z-index: 2;

  ${media.smallerThanMaxTablet`
    font-size: 36px;
    line-height: 42px;
  `}

  ${media.smallerThanMinTablet`
    font-weight: 600;
    font-size: 34px;
    line-height: 40px;
  `}
`;

const HeaderButtons = styled.div``;

const HeaderButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 14px 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.65);
  transition: all 80ms ease-out;

  &:hover {
    color: #fff;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.9);
  }
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
  state: State;
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      project: null
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    const project$ = projectBySlugStream(this.props.params.slug).observable;

    this.subscriptions = [
      project$.switchMap((project) => {
        const projectImages$ = projectImagesStream(project.data.id).observable;
        const phases$ = phasesStream(project.data.id).observable;
        return Rx.Observable.combineLatest(projectImages$, phases$).map(() => project);
      }).subscribe((project) => {
        this.setState({ project });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { params } = this.props;
    const { project } = this.state;

    if (project) {
      const { children } = this.props;
      const projectHeaderImageLarge = (project.data.attributes.header_bg.large || null);

      return (
        <div>
          <Meta projectSlug={params.slug} />

          <Container>
            <Header>
              <HeaderImage src={projectHeaderImageLarge} />
              <HeaderOverlay />
              <ContentContainer>
                <HeaderContent>
                  <HeaderContentLeft>
                    <HeaderLabel>
                      <FormattedMessage {...messages.project} />
                    </HeaderLabel>

                    <HeaderTitle>
                      <T value={project.data.attributes.title_multiloc} />
                    </HeaderTitle>
                  </HeaderContentLeft>

                  <HeaderContentRight>
                    <HeaderButtons>
                      <HeaderButton to={`/projects/${params.slug}/info`}>
                        <HeaderButtonIconWrapper>
                          <HeaderButtonIcon name="info2" />
                        </HeaderButtonIconWrapper>
                        <HeaderButtonText>
                          <FormattedMessage {...messages.projectInformation} />
                        </HeaderButtonText>
                      </HeaderButton>

                      <HeaderButton to={`/projects/${params.slug}/events`}>
                        <HeaderButtonIconWrapper>
                          <HeaderButtonIcon name="calendar" />
                        </HeaderButtonIconWrapper>
                        <HeaderButtonText>
                          <FormattedMessage {...messages.events} />
                        </HeaderButtonText>
                      </HeaderButton>
                    </HeaderButtons>
                  </HeaderContentRight>
                </HeaderContent>
              </ContentContainer>
            </Header>

            <Content>
              {children}
            </Content>
          </Container>

        </div>
      );
    }

    return null;
  }
}
