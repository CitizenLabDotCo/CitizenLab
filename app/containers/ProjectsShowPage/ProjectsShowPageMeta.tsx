import React, { memo } from 'react';
import { isNilOrError } from 'utils/helperUtils';

// components
import { Helmet } from 'react-helmet';

// hooks
import useLocale from 'hooks/useLocale';
import useTenantLocales from 'hooks/useTenantLocales';
import useProject from 'hooks/useProject';
import useAuthUser from 'hooks/useAuthUser';

// utils
import { stripHtml } from 'utils/textUtils';
import { imageSizes } from 'utils/fileTools';
import getAlternateLinks from 'utils/cl-router/getAlternateLinks';
import getCanonicalLink from 'utils/cl-router/getCanonicalLink';

// i18n
import { getLocalized } from 'utils/i18n';
import messages from './messages';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

interface Props {
  projectSlug: string;
}

const Meta = memo<Props & InjectedIntlProps>(({ projectSlug, intl }) => {
  const locale = useLocale();
  const tenantLocales = useTenantLocales();
  const authUser = useAuthUser();
  const project = useProject({ projectSlug });

  if (
    !isNilOrError(locale) &&
    !isNilOrError(tenantLocales) &&
    !isNilOrError(project) &&
    project.attributes
  ) {
    const { formatMessage } = intl;
    const metaTitle = formatMessage(messages.metaTitle, {
      projectTitle: getLocalized(
        project.attributes.title_multiloc,
        locale,
        tenantLocales,
        50
      ),
    });
    const description = stripHtml(
      getLocalized(
        project.attributes.description_multiloc,
        locale,
        tenantLocales
      ),
      250
    );
    const image = project.attributes.header_bg.large;
    const { location } = window;

    return (
      <Helmet>
        <title>
          {`${
            !isNilOrError(authUser) &&
            authUser.data.attributes.unread_notifications
              ? `(${authUser.data.attributes.unread_notifications}) `
              : ''
          }
            ${metaTitle}`}
        </title>
        {getCanonicalLink()}
        {getAlternateLinks(tenantLocales)}
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta
          property="og:image:width"
          content={`${imageSizes.projectBg.large[0]}`}
        />
        <meta
          property="og:image:height"
          content={`${imageSizes.projectBg.large[1]}`}
        />
        <meta property="og:url" content={location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    );
  }

  return null;
});

const MetaWithHoc = injectIntl<Props>(Meta);

export default MetaWithHoc;
