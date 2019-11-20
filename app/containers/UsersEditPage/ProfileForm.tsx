import React, { PureComponent } from 'react';
import { Subscription, BehaviorSubject, combineLatest, of, Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { isEqual, isEmpty } from 'lodash-es';
import streams from 'utils/streams';

// services
import { IAreaData } from 'services/areas';
import { updateUser, IUserData, mapUserToDiff } from 'services/users';
import { ITenantData } from 'services/tenant';
import { localeStream } from 'services/locale';
import { customFieldsSchemaForUsersStream } from 'services/userCustomFields';

// utils
import { Formik } from 'formik';
import eventEmitter from 'utils/eventEmitter';
import { hasCustomFields } from 'utils/customFields';
import { getJwt, decode } from 'utils/auth/jwt';

// components
import Error from 'components/UI/Error';
import ImagesDropzone from 'components/UI/ImagesDropzone';
import { convertUrlToUploadFileObservable } from 'utils/fileTools';
import { SectionField } from 'components/admin/Section';
import { FormSection, FormLabel, FormSectionTitle } from 'components/UI/FormComponents';
import CustomFieldsForm from 'components/CustomFieldsForm';
import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import QuillEditor from 'components/UI/QuillEditor';

// i18n
import { appLocalePairs, API_PATH } from 'containers/App/constants';
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import localize, { InjectedLocalized } from 'utils/localize';

// styling
import SubmitWrapper from 'components/admin/SubmitWrapper';

// typings
import { IOption, UploadFile, CLErrorsJSON } from 'typings';
import { isCLErrorJSON } from 'utils/errorUtils';

// Types
interface InputProps {
  user: IUserData;
  areas: IAreaData[];
  tenant: ITenantData;
}

interface State {
  avatar: UploadFile[] | null;
  hasCustomFields: boolean;
  localeOptions: IOption[];
  customFieldsFormData: any;
}

type Props = InputProps & InjectedIntlProps & InjectedLocalized;

class ProfileForm extends PureComponent<Props, State> {
  localeOptions: IOption[] = [];
  user$: BehaviorSubject<IUserData>;
  subscriptions: Subscription[];

  constructor(props: InputProps) {
    super(props as any);
    this.state = {
      avatar: null,
      hasCustomFields: false,
      localeOptions: [],
      customFieldsFormData: null
    };
    this.user$ = new BehaviorSubject(null as any);
    this.subscriptions = [];
  }

  componentDidMount() {
    const user$ = this.user$.pipe(
      filter(user => user !== null),
      distinctUntilChanged((x, y) => isEqual(x, y))
    );
    const locale$ = localeStream().observable;
    const customFieldsSchemaForUsersStream$ = customFieldsSchemaForUsersStream().observable;

    this.user$.next(this.props.user);

    this.subscriptions = [
      combineLatest(
        user$,
        locale$,
        customFieldsSchemaForUsersStream$
      ).pipe(
        switchMap(([user, locale, customFieldsSchema]) => {
          const avatarUrl = user.attributes.avatar && user.attributes.avatar.medium;
          const avatar$: Observable<UploadFile | null> = (avatarUrl ? convertUrlToUploadFileObservable(avatarUrl, null, null) : of(null));

          return avatar$.pipe(
            map(avatar => ({ user, avatar, locale, customFieldsSchema }))
          );
        })
      ).subscribe(({ user, avatar, locale, customFieldsSchema }) => {
        this.setState({
          hasCustomFields: hasCustomFields(customFieldsSchema, locale),
          avatar: (avatar ? [avatar] : null),
          customFieldsFormData: user.attributes.custom_field_values
        });
      })
    ];

    // Create options arrays only once, avoid re-calculating them on each render
    this.setState({
      localeOptions: this.props.tenantLocales.map((locale) => ({
        value: locale,
        label: appLocalePairs[locale],
      }))
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(this.props.user, prevProps.user)) {
      this.user$.next(this.props.user);
    }

    if (!isEqual(this.props.tenantLocales, prevProps.tenantLocales)) {
      this.setState({
        localeOptions: this.props.tenantLocales.map((locale) => ({
          value: locale,
          label: appLocalePairs[locale],
        }))
      });
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleFormikSubmit = async (values, formikActions) => {
    let newValues = values;
    const { setSubmitting, resetForm, setErrors, setStatus } = formikActions;

    if (this.state.hasCustomFields) {
      newValues = {
        ...values,
        custom_field_values: this.state.customFieldsFormData
      };
    }

    setStatus('');

    try {
      await updateUser(this.props.user.id, newValues);
      streams.fetchAllWith({ apiEndpoint: [`${API_PATH}/onboarding_campaigns/current`] });
      resetForm();
      setStatus('success');
    } catch (errorResponse) {
      if (isCLErrorJSON(errorResponse)) {
        const apiErrors = (errorResponse as CLErrorsJSON).json.errors;
        setErrors(apiErrors);
      } else {
        setStatus('error');
      }
      setSubmitting(false);
    }
  }

  usingFranceConnect = () => {
    const jwt = getJwt();
    const decodedJwt = jwt && decode(jwt);
    return decodedJwt && decodedJwt.provider === 'franceconnect';
  }

  formikRender = (props) => {
    const { values, errors, setFieldValue, setFieldTouched, setStatus, isSubmitting, submitForm, isValid, status, touched } = props;
    const { hasCustomFields, localeOptions } = this.state;

    const getStatus = () => {
      let returnValue: 'enabled' | 'disabled' | 'error' | 'success' = 'enabled';

      if (isSubmitting) {
        returnValue = 'disabled';
      } else if (!isEmpty(touched) && !isValid || status === 'error') {
        returnValue = 'error';
      } else if (isEmpty(touched) && status === 'success') {
        returnValue = 'success';
      }

      return returnValue;
    };

    const handleCustomFieldsFormOnChange = (formData) => {
      this.setState({ customFieldsFormData: formData });
      setStatus('enabled');
    };

    const handleCustomFieldsFormOnSubmit = (formData) => {
      this.setState({ customFieldsFormData: formData });
      submitForm();
    };

    const handleOnSubmit = () => {
      if (this.state.hasCustomFields) {
        eventEmitter.emit('ProfileForm', 'customFieldsSubmitEvent', null);
      } else {
        submitForm();
      }
    };

    const createChangeHandler = (fieldName: string) => value => {
      if (fieldName.endsWith('_multiloc')) {
        setFieldValue(fieldName, { [this.props.locale]: value });
      } else if (value && value.value) {
        setFieldValue(fieldName, value.value);
      } else {
        setFieldValue(fieldName, value);
      }
    };

    const createBlurHandler = (fieldName: string) => () => {
      setFieldTouched(fieldName);
    };

    const handleAvatarOnAdd = (newAvatar: UploadFile[]) => {
      this.setState(() => ({ avatar: [newAvatar[0]] }));
      setFieldValue('avatar', newAvatar[0].base64);
      setFieldTouched('avatar');
    };

    const handleAvatarOnRemove = async () => {
      this.setState(() => ({ avatar: null }));
      setFieldValue('avatar', null);
      setFieldTouched('avatar');
    };

    const usingFranceConnect = !!this.usingFranceConnect();

    return (
      <FormSection>
        <form className="e2e-profile-edit-form">
          <FormSectionTitle message={messages.h1} subtitleMessage={messages.h1sub}/>

          <SectionField>
            {/* Wrapping image dropzone with a label for accesibility */}
            <FormLabel thin labelMessage={messages.imageDropzonePlaceholder} hidden />
            <ImagesDropzone
              images={this.state.avatar}
              imagePreviewRatio={1}
              maxImagePreviewWidth="160px"
              acceptedFileTypes="image/jpg, image/jpeg, image/png, image/gif"
              maxImageFileSize={5000000}
              maxNumberOfImages={1}
              onAdd={handleAvatarOnAdd}
              onRemove={handleAvatarOnRemove}
              borderRadius="50%"
            />
            <Error apiErrors={errors.avatar} />
          </SectionField>

          <SectionField>
            <FormLabel thin htmlFor="firstName" labelMessage={messages.firstNames} />
            <Input
              type="text"
              name="first_name"
              id="firstName"
              value={values.first_name}
              onChange={createChangeHandler('first_name')}
              onBlur={createBlurHandler('first_name')}
              disabled={usingFranceConnect}
            />
            <Error apiErrors={errors.first_name} />
          </SectionField>

          <SectionField>
            <FormLabel thin htmlFor="lastName" labelMessage={messages.lastName} />
            <Input
              type="text"
              name="last_name"
              id="lastName"
              value={values.last_name}
              onChange={createChangeHandler('last_name')}
              onBlur={createBlurHandler('last_name')}
              disabled={usingFranceConnect}
            />
            <Error apiErrors={errors.last_name} />
          </SectionField>

          <SectionField>
            <FormLabel thin htmlFor="email" labelMessage={messages.email} />
            <Input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={createChangeHandler('email')}
              onBlur={createBlurHandler('email')}
            />
            <Error apiErrors={errors.email} />
          </SectionField>

          <SectionField>
            <FormLabel thin labelMessage={messages.bio} />
            <QuillEditor
              id="bio_multiloc"
              noImages
              noVideos
              limitedTextFormatting
              value={values.bio_multiloc ? this.props.localize(values.bio_multiloc) : ''}
              placeholder={this.props.intl.formatMessage({ ...messages.bio_placeholder })}
              onChange={createChangeHandler('bio_multiloc')}
              onBlur={createBlurHandler('bio_multiloc')}
            />
            <Error apiErrors={errors.bio_multiloc} />
          </SectionField>

          {!usingFranceConnect &&
            <SectionField>
              <FormLabel thin htmlFor="password" labelMessage={messages.password} />
              <Input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={createChangeHandler('password')}
                onBlur={createBlurHandler('password')}
              />
              <Error apiErrors={errors.password} />
            </SectionField>
          }

          <SectionField>
            <FormLabel thin htmlFor="language" labelMessage={messages.language} />
            <Select
              inputId="language"
              onChange={createChangeHandler('locale')}
              onBlur={createBlurHandler('locale')}
              value={values.locale}
              options={localeOptions}
              clearable={false}
            />
            <Error apiErrors={errors.locale} />
          </SectionField>
        </form>

        {hasCustomFields &&
          <CustomFieldsForm
            formData={this.state.customFieldsFormData}
            onChange={handleCustomFieldsFormOnChange}
            onSubmit={handleCustomFieldsFormOnSubmit}
          />
        }

        <SubmitWrapper
          status={getStatus()}
          style="primary"
          loading={isSubmitting}
          onClick={handleOnSubmit}
          messages={{
            buttonSave: messages.submit,
            buttonSuccess: messages.buttonSuccessLabel,
            messageSuccess: messages.messageSuccess,
            messageError: messages.messageError,
          }}
        />
      </FormSection>
    );
  }

  render() {
    return (
      <Formik
        initialValues={mapUserToDiff(this.props.user)}
        onSubmit={this.handleFormikSubmit}
        render={this.formikRender as any}
      />
    );
  }
}

export default injectIntl<InputProps>(localize(ProfileForm));
