import React from 'react';
import { Subscription } from 'rxjs';
import { globalState, IAdminFullWidth, IAdminNoPadding, IGlobalStateService } from 'services/globalState';

// components
import HasPermission from 'components/HasPermission';
import Sidebar from './sideBar/';
import styled from 'styled-components';
import { colors } from 'utils/styleUtils';

// stlying
import 'assets/semantic/semantic.min.css';

const Container = styled.div`
  display: flex;
  background: ${colors.background};
  color: ${colors.adminTextColor};
  fill: ${colors.adminTextColor};
  border-color: ${colors.adminTextColor};

  .ui, .ui.menu .item, .ui.table th, .ui a, .ui input, .ui .active td {
    color: ${colors.adminTextColor} !important;
  }

  .Select-control, .Select-value-label, .Select-value-icon, .Select-option {
    color: ${colors.adminTextColor} !important;
  }

  .ui.red {
    color: white !important;
  }
`;

const RightColumn = styled.div`
  flex-grow : 1;
  flex-shrink : 1;
  flex-basis : 0;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  padding-top: 45px;
  padding-right: 51px;
  padding-bottom: 0px;
  padding-left: 51px;

  &.fullWidth {
    max-width: none;
  }

  &.noPadding {
    padding: 0;
    max-width: none;
  }
  @media print {
    padding: 0;
    max-width: none,
  }
`;

type Props = {};

type State = {
  adminFullWidth: boolean;
  adminNoPadding: boolean;
};

export default class AdminPage extends React.PureComponent<Props, State> {
  FullWidth: IGlobalStateService<IAdminFullWidth>;
  NoPadding: IGlobalStateService<IAdminNoPadding>;
  subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      adminFullWidth: false,
      adminNoPadding: false,
    };
    this.FullWidth = globalState.init('AdminFullWidth', { enabled: false });
    this.NoPadding = globalState.init('AdminNoPadding', { enabled: false });
  }

  componentDidMount() {
    const FullWidth$ = this.FullWidth.observable;
    const NoPadding$ = this.NoPadding.observable;

    this.subscriptions = [
      FullWidth$.subscribe(({ enabled }) => this.setState({ adminFullWidth: enabled })),
      NoPadding$.subscribe(({ enabled }) => this.setState({ adminNoPadding: enabled })),
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { adminFullWidth, adminNoPadding } = this.state;

    return (
      <>
        <Container className={this.props['className']}>
          <Sidebar />
          <RightColumn className={`${adminFullWidth && 'fullWidth'} ${adminNoPadding && 'noPadding'}`}>
            {children}
          </RightColumn>
        </Container>
      </>
    );
  }
}
