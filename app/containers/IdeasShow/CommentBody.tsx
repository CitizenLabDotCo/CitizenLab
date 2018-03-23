// Libraries
import React from 'react';
import linkifyHtml from 'linkifyjs/html';
import { Form, Formik } from 'formik';

// Utils & Loaders
import GetLocale from 'utils/resourceLoaders/components/GetLocale';
import GetTenant from 'utils/resourceLoaders/components/GetTenant';
import { getLocalized } from 'utils/i18n';

// Components
import MentionsTextArea from 'components/UI/MentionsTextArea';
import Button from 'components/UI/Button';

// Styling
import styled from 'styled-components';
import { transparentize, darken } from 'polished';

const CommentWrapper = styled.div`
  color: #333;
  font-size: 17px;
  line-height: 25px;
  font-weight: 300;

  span,
  p {
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  a {
    color: ${(props) => props.theme.colors.clBlue};

    &.mention {
      background: ${props => transparentize(0.92, props.theme.colors.clBlue)};
    }

    &:hover {
      color: ${(props) => darken(0.15, props.theme.colors.clBlue)};
      text-decoration: underline;
    }
  }
`;

const StyledForm: any = styled(Form)`
  position: relative;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: .5rem;
  right: .5rem;
`;

// Typings
import { Multiloc, Locale } from 'typings';
import { IUpdatedComment } from 'services/comments';

export interface Props {
  commentBody: Multiloc;
  editionMode: boolean;
  onCommentSave: {(values: IUpdatedComment): void};
}
export interface State {}

class CommentBody extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCommentText = (locale: Locale, tenantLocales: Locale[]) => {
    const commentText = getLocalized(this.props.commentBody, locale, tenantLocales);
    const processedCommentText = linkifyHtml(commentText.replace(
      /<span\sclass="cl-mention-user"[\S\s]*?data-user-id="([\S\s]*?)"[\S\s]*?data-user-slug="([\S\s]*?)"[\S\s]*?>([\S\s]*?)<\/span>/gi,
      '<a class="mention" data-link="/profile/$2" href="/profile/$2">$3</a>'
    ));
    return processedCommentText;
  }

  onSaveComment = (values) => {
    return this.props.onCommentSave(values);
  }

  createFieldChange = (name, setFieldValue) => (value) => {
    setFieldValue(name, value);
  }

  createFieldTouched = (name, setFieldTouched) => () => {
    setFieldTouched(name, true);
  }

  render() {
    return (
      <GetLocale>
        {({ locale }) => (
          <GetTenant>
            {({ tenantLocales }) => {
              if (locale && tenantLocales && !this.props.editionMode) {
                return (
                  <CommentWrapper className="e2e-comment-body">
                    <div dangerouslySetInnerHTML={{ __html: this.getCommentText(locale, tenantLocales) }} />
                  </CommentWrapper>
                );
              } else if (locale && tenantLocales && this.props.editionMode) {
                return (
                  <Formik
                    initialValues={{ body_multiloc: { [locale]: getLocalized(this.props.commentBody, locale, tenantLocales) } }}
                    onSubmit={this.onSaveComment}
                  >
                    {({ values, handleSubmit, isSubmitting, setFieldValue, setFieldTouched }) => (
                      <StyledForm onSubmit={handleSubmit}>
                        <MentionsTextArea
                          name={`body_multiloc.${locale}`}
                          value={values.body_multiloc[locale]}
                          rows={1}
                          onBlur={this.createFieldTouched(`body_multiloc.${locale}`, setFieldTouched)}
                          onChange={this.createFieldChange(`body_multiloc.${locale}`, setFieldValue)}
                          padding="1rem"
                        />
                        <StyledButton icon="send" style="primary-outlined" circularCorners={false} processing={isSubmitting} />
                      </StyledForm>
                    )}
                  </Formik>
                );
              } else {
                return null;
              }
            }}
          </GetTenant>
        )}
      </GetLocale>
    );
  }
}

export default CommentBody;
