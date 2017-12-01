import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// components
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';

// services
import { localState, ILocalStateService } from 'services/localState';
import { globalState, IGlobalStateService, IIdeasNewPageGlobalState } from 'services/globalState';

// i18n
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';

// utils
import eventEmitter from 'utils/eventEmitter';

// style
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonBarInner = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  padding-right: 30px;
  padding-left: 30px;

  .Button {
    margin-right: 10px;
  }

  .Error {
    flex: 1;
  }
`;

interface Props {
  onSubmit: () => void;
}

interface GlobalState {
  submitError: boolean;
  processing: boolean;
}

interface State extends GlobalState {}

class ButtonBar extends React.PureComponent<Props & InjectedIntlProps, State> {
  globalState: IGlobalStateService<IIdeasNewPageGlobalState>;
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.globalState = globalState.init<IIdeasNewPageGlobalState>('IdeasNewPage');
    this.subscriptions = [];
  }

  async componentWillMount() {
    const globalState$ = this.globalState.observable;

    this.subscriptions = [
      globalState$.subscribe(({ submitError, processing }) => {
        const newState: State = { submitError, processing };
        this.setState(newState);
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnSubmit = () => {
    eventEmitter.emit('IdeasNewPage', 'submit', null);
  }

  render() {
    if (!this.state) { return null; }

    const { formatMessage } = this.props.intl;
    const { processing, submitError } = this.state;
    const submitErrorMessage = (submitError ? formatMessage(messages.submitError) : null);

    return (
      <Container>
        <ButtonBarInner>
          <Button
            className="e2e-submit-idea-form"
            size="2"
            processing={processing}
            text={formatMessage(messages.submit)}
            onClick={this.handleOnSubmit}
          />
          <Error text={submitErrorMessage} marginTop="0px" showBackground={false} showIcon={true} />
        </ButtonBarInner>
      </Container>
    );
  }
}

export default injectIntl<Props>(ButtonBar);
