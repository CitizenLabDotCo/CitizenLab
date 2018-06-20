import React from 'react';
import { isEmpty, get } from 'lodash';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';

// components
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';
import Spinner from 'components/UI/Spinner';
import CustomFieldsForm from 'components/CustomFieldsForm';

// services
import { authUserStream } from 'services/auth';
import { IUser, completeRegistration } from 'services/users';
import { localeStream } from 'services/locale';
import { customFieldsSchemaForUsersStream } from 'services/userCustomFields';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

// utils
import eventEmitter from 'utils/eventEmitter';

// style
import styled from 'styled-components';

// typings
import { API } from 'typings';

const Loading = styled.div`
  padding-top: 15px;
`;

const Container = styled.div``;

const FormElement = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkipButton = styled.div`
  color: #999;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    color: #000;
  }
`;

type Props = {
  onCompleted: () => void;
};

type State = {
  authUser: IUser | null;
  loading: boolean;
  hasRequiredFields: boolean;
  processing: boolean;
  unknownError: string | null;
  apiErrors: API.ErrorResponse | null;
};

class Step2 extends React.PureComponent<Props & InjectedIntlProps, State> {
  subscriptions: Subscription[];

  constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.state = {
      authUser: null,
      hasRequiredFields: true,
      loading: true,
      processing: false,
      unknownError: null,
      apiErrors: null
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    const authUser$ = authUserStream().observable;
    const locale$ = localeStream().observable;
    const customFieldsSchemaForUsersStream$ = customFieldsSchemaForUsersStream().observable;

    this.subscriptions = [
      combineLatest(
        authUser$,
        locale$,
        customFieldsSchemaForUsersStream$
      ).subscribe(([authUser, locale, customFieldsSchemaForUsersStream]) => {
        this.setState({
          authUser,
          hasRequiredFields: !isEmpty(get(customFieldsSchemaForUsersStream, `json_schema_multiloc.${locale}.required`, null)),
          loading: false
        });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleOnSubmitButtonClick = (event: React.FormEvent<any>) => {
    event.preventDefault();
    eventEmitter.emit('SignUpStep2', 'customFieldsSubmitEvent', null);
  }

  handleCustomFieldsFormOnSubmit = async (formData) => {
    const { formatMessage } = this.props.intl;
    const { authUser } = this.state;

    if (authUser) {
      try {
        this.setState({
          processing: true,
          unknownError: null
        });

        if (formData && !isEmpty(formData)) {
          await completeRegistration(formData);
        }

        this.setState({ processing: false });
        this.props.onCompleted();
      } catch (error) {
        this.setState({
          processing: false,
          unknownError: formatMessage(messages.unknownError)
        });
      }
    }
  }

  skipStep = (event: React.FormEvent<any>) => {
    event.preventDefault();
    completeRegistration({});
    this.props.onCompleted();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { authUser, hasRequiredFields, loading, processing, unknownError } = this.state;

    if (loading) {
      return (
        <Loading id="ideas-loading">
          <Spinner size="28px" color="#666" />
        </Loading>
      );
    }

    if (!loading && authUser) {
      return (
        <Container id="e2e-signup-step2">
          <CustomFieldsForm
            formData={authUser.data.attributes.custom_field_values}
            onSubmit={this.handleCustomFieldsFormOnSubmit}
          />

          <FormElement>
            <ButtonWrapper>
              <Button
                className="e2e-signup-step2-button"
                size="1"
                processing={processing}
                text={formatMessage(messages.submit)}
                onClick={this.handleOnSubmitButtonClick}
                circularCorners={true}
              />
              {!hasRequiredFields &&
                <SkipButton onClick={this.skipStep}>{formatMessage(messages.skip)}</SkipButton>
              }
            </ButtonWrapper>
            <Error text={unknownError} />
          </FormElement>
        </Container>
      );
    }

    return null;
  }
}

export default injectIntl<Props>(Step2);
