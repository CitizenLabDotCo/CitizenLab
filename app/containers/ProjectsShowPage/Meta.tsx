import React from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { adopt } from 'react-adopt';

// components
import Helmet from 'react-helmet';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetProjectImages, { GetProjectImagesChildProps } from 'resources/GetProjectImages';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// utils
import { stripHtml } from 'utils/textUtils';

// i18n
import { getLocalized } from 'utils/i18n';
import messages from './messages';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

interface InputProps {
  projectSlug: string;
}

interface DataProps {
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
  project: GetProjectChildProps;
  projectImages: GetProjectImagesChildProps;
  authUser: GetAuthUserChildProps;
}

interface Props extends InputProps, DataProps { }

const Meta: React.SFC<Props & InjectedIntlProps> = ({ locale, tenantLocales, project, projectImages, authUser, intl }) => {

  if (!isNilOrError(locale) && !isNilOrError(tenantLocales) && !isNilOrError(project)) {
    const { formatMessage } = intl;
    const metaTitle = formatMessage(messages.metaTitle, { projectTitle: getLocalized(project.attributes.title_multiloc, locale, tenantLocales, 50) });
    const description = stripHtml(getLocalized(project.attributes.description_multiloc, locale, tenantLocales), 250);
    const image = (!isNilOrError(projectImages) && projectImages && projectImages.length > 0 ? projectImages[0].attributes.versions.large : null);
    const url = window.location.href;

    return (
      <Helmet>
        <title>
          {`
              ${(authUser && authUser.attributes.unread_notifications) ? `(${authUser.attributes.unread_notifications}) ` : ''}
              ${metaTitle}`
          }
        </title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    );
  }

  return null;

};

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />,
  project: ({ projectSlug, render }) => <GetProject slug={projectSlug}>{render}</GetProject>,
  projectImages: ({ project, render }) => <GetProjectImages projectId={(!isNilOrError(project) ? project.id : null)}>{render}</GetProjectImages>,
  authUser: <GetAuthUser />,
});

const MetaWithHoc = injectIntl<Props>(Meta);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <MetaWithHoc {...inputProps} {...dataProps} />}
  </Data>
);
