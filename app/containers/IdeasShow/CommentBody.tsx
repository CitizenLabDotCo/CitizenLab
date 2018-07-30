// Libraries
import React from 'react';
import linkifyHtml from 'linkifyjs/html';
import { Form, Formik, FormikActions } from 'formik';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// Utils & Loaders
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import { getLocalized } from 'utils/i18n';

// Components
import MentionsTextArea from 'components/UI/MentionsTextArea';
import Button from 'components/UI/Button';
import Error from 'components/UI/Error';

// Styling
import styled from 'styled-components';
import { transparentize, darken } from 'polished';
import { colors } from 'utils/styleUtils';

const CommentWrapper = styled.div`
  color: ${colors.clGrey};
  font-size: 17px;
  line-height: 25px;
  font-weight: 300;
  word-break: break-word;
  white-space: pre-line;

  span,
  p {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 10px;
    }
  }

  a {
    color: ${colors.clBlueDark};

    &.mention {
      background: ${transparentize(0.92, colors.clBlueDark)};
    }

    &:hover {
      color: ${darken(0.15, colors.clBlueDark)};
      text-decoration: underline;
    }
  }
`;

const StyledForm: any = styled(Form)`
  position: relative;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;

  > * + * {
    margin-left: .5rem;
  }
`;

// Typings
import { Multiloc, Locale } from 'typings';
import { IUpdatedComment } from 'services/comments';

interface InputProps {
  commentBody: Multiloc;
  editionMode: boolean;
  last?: boolean;
  onCommentSave: {(values: IUpdatedComment, formikActions: FormikActions<IUpdatedComment>): void};
  onCancelEdition: {(): void};
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
}

interface Props extends InputProps, DataProps {}

export interface State {}

class CommentBody extends React.PureComponent<Props, State> {
  getCommentText = (locale: Locale, tenantLocales: Locale[]) => {
    const commentText = getLocalized(this.props.commentBody, locale, tenantLocales);
    const processedCommentText = linkifyHtml(commentText.replace(
      /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>([\S\s]*?)<\/span>/gi,
      '<a class="mention" data-link="/profile/$2" href="/profile/$2">$3</a>'
    ));
    return processedCommentText;
  }

  onSaveComment = (values, formikActions) => {
    return this.props.onCommentSave(values, formikActions);
  }

  createFieldChange = (name, setFieldValue) => (value) => {
    setFieldValue(name, value);
  }

  createFieldTouched = (name, setFieldTouched) => () => {
    setFieldTouched(name, true);
  }

  cancelEdition = (event) => {
    event.preventDefault();
    this.props.onCancelEdition();
  }

  render() {
    const { editionMode, commentBody, locale, tenantLocales, last } = this.props;

    if (!isNilOrError(locale) && !isNilOrError(tenantLocales) && !editionMode) {
      return (
        <CommentWrapper className={`e2e-comment-body ${last ? 'last' : ''}`}>
          <div dangerouslySetInnerHTML={{ __html: this.getCommentText(locale, tenantLocales) }} />
        </CommentWrapper>
      );
    }

    if (!isNilOrError(locale) && !isNilOrError(tenantLocales) && editionMode) {
      return (
        <Formik
          initialValues={{ body_multiloc: { [locale]: getLocalized(commentBody, locale, tenantLocales) } }}
          onSubmit={this.onSaveComment}
        >
          {({ values, errors, handleSubmit, isSubmitting, setFieldValue, setFieldTouched }) => (
            <StyledForm onSubmit={handleSubmit}>
              <MentionsTextArea
                name={`body_multiloc.${locale}`}
                value={values.body_multiloc[locale]}
                rows={1}
                onBlur={this.createFieldTouched(`body_multiloc.${locale}`, setFieldTouched)}
                onChange={this.createFieldChange(`body_multiloc.${locale}`, setFieldValue)}
                padding="1rem"
              />
              <ButtonsWrapper>
                {errors && errors.body_multiloc && errors.body_multiloc[locale] && <Error apiErrors={errors.body_multiloc[locale]} />}
                <Button onClick={this.cancelEdition} icon="close2" style="text" circularCorners={false}  />
                <Button icon="send" style="primary" circularCorners={false} processing={isSubmitting} />
              </ButtonsWrapper>
            </StyledForm>
          )}
        </Formik>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, {}>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />
});

export default (inputProps: InputProps) => <Data>{dataProps => <CommentBody {...inputProps} {...dataProps} />}</Data>;
