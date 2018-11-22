import React from 'react';
import { Subscription } from 'rxjs';

// components
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import ButtonBar from 'components/ButtonBar';

// services
import { globalState, IGlobalStateService, IIdeasNewPageGlobalState } from 'services/globalState';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// utils
import eventEmitter from 'utils/eventEmitter';

// style
import styled from 'styled-components';

const ButtonBarInner = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;

  .Button {
    margin-right: 10px;
  }

  .Error {
    flex: 1;
  }
`;

interface Props {
  onSubmit: () => void;
  form?: string;
}

interface GlobalState {
  submitError: boolean;
  processing: boolean;
}

interface State extends GlobalState {}

export default class IdeasNewButtonBar extends React.PureComponent<Props, State> {
  globalState: IGlobalStateService<IIdeasNewPageGlobalState>;
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      submitError: false,
      processing: false
    };
    this.globalState = globalState.init<IIdeasNewPageGlobalState>('IdeasNewPage');
    this.subscriptions = [];
  }

  async componentDidMount() {
    const globalState$ = this.globalState.observable;

    this.subscriptions = [
      globalState$.subscribe(({ submitError, processing }) => {
        this.setState({ submitError, processing });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnSubmitButtonClick = () => {
    eventEmitter.emit('IdeasNewPage', 'IdeaFormSubmitEvent', null);
  }

  render() {
    const { processing, submitError } = this.state;
    let { form } = this.props;
    const submitErrorMessage = (submitError ? <FormattedMessage {...messages.submitError} /> : null);

    form = (form || '');

    return (
      <ButtonBar>
        <ButtonBarInner>
          <Button
            form={form}
            className="e2e-submit-idea-form"
            size="1"
            processing={processing}
            text={<FormattedMessage {...messages.submit} />}
            onClick={this.handleOnSubmitButtonClick}
          />
          <Error text={submitErrorMessage} marginTop="0px" showBackground={false} showIcon={true} />
        </ButtonBarInner>
      </ButtonBar>
    );
  }
}
