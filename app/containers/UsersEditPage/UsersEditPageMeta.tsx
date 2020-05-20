// libraries
import React from 'react';
import { Helmet } from 'react-helmet';

// i18n
import messages from './messages';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

// hooks
import useLocale from 'hooks/useLocale';
import useTenantLocales from 'hooks/useTenantLocales';
import useTenant from 'hooks/useTenant';
import useAuthUser from 'hooks/useAuthUser';

// services
import { IUserData } from 'services/users';

// utils
import { isNilOrError } from 'utils/helperUtils';
import { getLocalized } from 'utils/i18n';
import getAlternateLinks from 'utils/cl-router/getAlternateLinks';
import getCanonicalLink from 'utils/cl-router/getCanonicalLink';

interface Props {
  user: IUserData;
}

 const UsersEditPageMeta = React.memo<Props & InjectedIntlProps>(({ intl, user }) => {
  const locale = useLocale();
  const tenantLocales = useTenantLocales();
  const authUser = useAuthUser();
  const tenant = useTenant();

  if (!isNilOrError(tenantLocales) && !isNilOrError(locale) && !isNilOrError(tenant) && !isNilOrError(authUser)) {
    const { formatMessage } = intl;
    const { location } = window;
    const firstName = user.attributes.first_name;
    const lastName = user.attributes.last_name;
    const organizationNameMultiLoc = tenant.data.attributes.settings.core.organization_name;
    const tenantName = getLocalized(organizationNameMultiLoc, locale, tenantLocales);

    const usersEditPageIndexTitle = formatMessage(messages.metaTitle, {
      firstName,
      lastName
    });
    const usersEditPageDescription = formatMessage(messages.metaDescription, {
      firstName,
      lastName,
      tenantName
    });

    return (
      <Helmet>
        <title>
          {`
            ${(authUser && authUser.data.attributes.unread_notifications) ? `(${authUser.data.attributes.unread_notifications}) ` : ''}
            ${usersEditPageIndexTitle}`
          }
        </title>
        {getCanonicalLink()}
        {getAlternateLinks(tenantLocales)}
        <meta name="title" content={usersEditPageIndexTitle} />
        <meta name="description" content={usersEditPageDescription} />
        <meta property="og:title" content={usersEditPageIndexTitle} />
        <meta property="og:description" content={usersEditPageDescription} />
        <meta property="og:url" content={location.href} />
      </Helmet>
    );
  }

  return null;
});

const UsersEditPageMetaWithHoc = injectIntl<Props>(UsersEditPageMeta);

export default UsersEditPageMetaWithHoc;
