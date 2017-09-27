import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// libraries
import { RouterState } from 'react-router';

// components
import Meta from './Meta';
import Navbar from 'containers/Navbar';
import messages from './messages';
import Loader from 'components/loaders';
import ForbiddenRoute from 'components/routing/forbiddenRoute';
import FullscreenModal from 'components/UI/FullscreenModal';
import IdeasShow from 'containers/IdeasShow';
import { namespace as IdeaCardComponent } from 'components/IdeaCard';

// auth
import Authorize, { Else } from 'utils/containers/authorize';

// sagas
import WatchSagas from 'containers/WatchSagas';
import authSagas from 'utils/auth/sagas';
import areasSagas from 'utils/areas/sagas';
import tenantSaga from 'utils/tenant/sagas';

// services
import { authUserStream, signOut } from 'services/auth';
import { currentTenantStream, ITenant } from 'services/tenant';
import { topicsStream, ITopics, ITopicData } from 'services/topics';
import { projectsStream, IProjects, IProjectData } from 'services/projects';

// utils
import eventEmitter from 'utils/eventEmitter';

// style
import styled, { ThemeProvider } from 'styled-components';
import { media } from 'utils/styleUtils';

// legacy redux stuff 
import { store } from 'app';
import { LOAD_CURRENT_TENANT_SUCCESS } from 'utils/tenant/constants';
import { LOAD_CURRENT_USER_SUCCESS, DELETE_CURRENT_USER_LOCAL } from 'utils/auth/constants';

const Container = styled.div`
  margin: 0;
  padding: 0;
  padding-top: ${props => props.theme.menuHeight}px;

  ${media.phone`
    padding-bottom: ${props => props.theme.mobileMenuHeight}px;
  `}
`;

export interface IIdeaCardModalData {
  ideaId: string;
  ideaSlug: string;
  ideaCardElement: {
    width: number;
    height: number;
    offsetTop: number;
    offsetBottom: number;
    offsetLeft: number;
    offsetRight: number;
  };
}

type Props = {};

type State = {
  currentTenant: ITenant | null;
  modalInfo: IIdeaCardModalData | null;
};

export default class App extends React.PureComponent<Props & RouterState, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor() {
    super();
    this.state = {
      currentTenant: null,
      modalInfo: null
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    const authUser$ = authUserStream().observable;

    this.subscriptions = [
      eventEmitter.observe<IIdeaCardModalData>(IdeaCardComponent, 'cardClick').subscribe(({ eventValue }) => {
        const { ideaId, ideaSlug, ideaCardElement } = eventValue;
        this.openModal({ ideaId, ideaSlug, ideaCardElement });
      }),

      authUser$.switchMap((authUser) => {
        if (!authUser) {
          signOut();
          store.dispatch({ type: DELETE_CURRENT_USER_LOCAL });
        } else {
          store.dispatch({ type: LOAD_CURRENT_USER_SUCCESS, payload: authUser });
        }

        const topics$ = topicsStream().observable;
        const projects$ = projectsStream().observable;
        const currentTenant$ = currentTenantStream().observable.do((currentTenant) => {
          this.setState({ currentTenant });
          store.dispatch({ type: LOAD_CURRENT_TENANT_SUCCESS, payload: currentTenant });
        });

        return Rx.Observable.combineLatest(
          topics$,
          projects$,
          currentTenant$
        );
      }).subscribe()
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openModal = (modalInfo: IIdeaCardModalData) => {
    this.setState({ modalInfo });
  }

  closeModal = () => {
    this.setState({ modalInfo: null });
  }

  render() {
    const { location, children } = this.props;
    const { currentTenant, modalInfo } = this.state;
    const modalOpened = !_.isNull(modalInfo);
    const modalUrl = !_.isNull(modalInfo) ? `/ideas/${modalInfo.ideaSlug}` : undefined;
    const theme = {
      colorMain: (currentTenant ? currentTenant.data.attributes.settings.core.color_main : '#ef0071'),
      menuStyle: 'light',
      menuHeight: 74,
      mobileMenuHeight: 80,
      maxPageWidth: 952,
    };

    const initialWidth = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.width : null);
    const initialHeight = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.height : null);
    const initialOffsetTop = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.offsetTop : null);
    const initialOffsetBottom = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.offsetBottom : null);
    const initialOffsetLeft = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.offsetLeft : null);
    const initialOffsetRight = (modalInfo && modalInfo.ideaCardElement ? modalInfo.ideaCardElement.offsetRight : null);

    return (
      <div>
        <WatchSagas sagas={authSagas} />
        <WatchSagas sagas={areasSagas} />
        <WatchSagas sagas={{ tenantSaga }} />

        {currentTenant && (
          <ThemeProvider theme={theme}>
            <Container>
              <Meta />

              <FullscreenModal 
                opened={modalOpened} 
                close={this.closeModal}
                url={modalUrl}
                initialWidth={initialWidth}
                initialHeight={initialHeight}
                initialOffsetTop={initialOffsetTop}
                initialOffsetBottom={initialOffsetBottom}
                initialOffsetLeft={initialOffsetLeft}
                initialOffsetRight={initialOffsetRight}
              >
                {modalInfo && <IdeasShow location={location} ideaId={modalInfo.ideaId} />}
              </FullscreenModal>

              <Navbar />

              <Authorize action={['routes', 'admin']} resource={location.pathname}>
                <div>
                  {children}
                </div>
                <Else>
                  <ForbiddenRoute />
                </Else>
              </Authorize>
            </Container>
          </ThemeProvider>
        )}
      </div>
    );
  }
}
