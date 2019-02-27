import React from 'react';
import { adopt } from 'react-adopt';
import { withRouter, WithRouterProps } from 'react-router';
import Link from 'utils/cl-router/Link';
import { isNilOrError } from 'utils/helperUtils';

// components
import Helmet from 'react-helmet';
import ContentContainer from 'components/ContentContainer';
import Spinner from 'components/UI/Spinner';
import Icon from 'components/UI/Icon';
import Footer from 'components/Footer';
import Fragment from 'components/Fragment';
import FileAttachments from 'components/UI/FileAttachments';
import QuillEditedContent from 'components/UI/QuillEditedContent';

// services
import { PageLink } from 'services/pageLink';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetPage, { GetPageChildProps } from 'resources/GetPage';
import GetPageLinks, { GetPageLinksChildProps } from 'resources/GetPageLinks';
import GetResourceFiles, { GetResourceFilesChildProps } from 'resources/GetResourceFiles';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { getLocalized } from 'utils/i18n';
import T from 'components/T';
import messages from './messages';

// styling
import styled from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';

const Container = styled.div`
  min-height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  flex-direction: column;
  background: ${colors.background};

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const Loading = styled.div`
  width: 100%;
  height: calc(100vh - ${props => props.theme.menuHeight}px - 1px);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.smallerThanMaxTablet`
    height: calc(100vh - ${props => props.theme.mobileMenuHeight}px - ${props => props.theme.mobileTopBarHeight}px);
  `}
`;

const StyledContentContainer = styled(ContentContainer)`
  max-width: calc(${(props) => props.theme.maxPageWidth}px - 100px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

const AttachmentsContainer = styled.div`
  max-width: calc(${(props) => props.theme.maxPageWidth}px - 100px);
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const PageContent = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
  background: #fff;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: ${fontSizes.xxxxl}px;
  line-height: 40px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 0;
  padding-top: 0px;
  padding-bottom: 40px;

  ${media.smallerThanMaxTablet`
    font-size: ${fontSizes.xxxl};
    line-height: 34px;
  `}
`;

const PageDescription = styled.div``;

const PagesNavWrapper = styled.div`
  width: 100%;
`;

const PagesNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  list-style: none;
  margin: 0 auto;
  padding-top: 90px;
  padding-bottom: 80px;
`;

const StyledLink = styled(Link)`
  color: #666;
  font-size: ${fontSizes.large}px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 20px 23px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.06);
  transition: all 200ms ease;

  &:hover {
    color: #000;
    text-decoration: underline;
    /* box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12); */
    /* transform: translate(0px, -2px); */
  }
`;

const LinkIcon = styled(Icon)`
  width: 11px;
  height: 1em;
`;

interface InputProps { }

interface DataProps {
  locale: GetLocaleChildProps;
  tenantLocales: GetTenantLocalesChildProps;
  page: GetPageChildProps;
  pageFiles: GetResourceFilesChildProps;
  pageLinks: GetPageLinksChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class PagesShowPage extends React.PureComponent<Props & WithRouterProps & InjectedIntlProps, State> {
  render() {
    const { formatMessage } = this.props.intl;
    const { locale, tenantLocales, page, pageFiles, pageLinks } = this.props;

      if (isNilOrError(locale) || isNilOrError(tenantLocales) || page === undefined) {
        return (
          <Loading>
            <Spinner />
          </Loading>
        );
      } else {
        let seoTitle = formatMessage(messages.notFoundTitle);
        let seoDescription = formatMessage(messages.notFoundDescription);
        let blockIndexing = true;
        let pageTitle = <FormattedMessage {...messages.notFoundTitle} />;
        let pageDescription = <FormattedMessage {...messages.notFoundDescription} />;
        let pageSlug = '';

        if (!isNilOrError(page)) {
          seoTitle = getLocalized(page.attributes.title_multiloc, locale, tenantLocales);
          seoDescription = '';
          blockIndexing = false;
          pageSlug = page.attributes.slug;
          pageTitle = <T value={page.attributes.title_multiloc} />;
          pageDescription = <T value={page.attributes.body_multiloc} supportHtml={true} />;
        }

        return (
          <Container className={`e2e-page-${pageSlug}`}>
            <Helmet>
              <title>{seoTitle}</title>
              <meta name="description" content={seoDescription} />
              {blockIndexing && <meta name="robots" content="noindex" />}
            </Helmet>

            <PageContent>
              <StyledContentContainer>
                <Fragment name={!isNilOrError(page) ? `pages/${page && page.id}/content` : ''}>
                  <PageTitle>
                    {pageTitle}
                  </PageTitle>
                  <PageDescription>
                    <QuillEditedContent>
                      {pageDescription}
                    </QuillEditedContent>
                  </PageDescription>
                </Fragment>
              </StyledContentContainer>
              <AttachmentsContainer>
                {pageFiles && !isNilOrError(pageFiles) &&
                  <FileAttachments files={pageFiles} />
                }
              </AttachmentsContainer>
            </PageContent>

            {!isNilOrError(pageLinks) &&
              <PagesNavWrapper>
                <PagesNav>
                  <StyledContentContainer>
                    {pageLinks.filter(pageLink => !isNilOrError(pageLink)).map((pageLink: PageLink) => (
                      <StyledLink
                        className={`e2e-page-link-to-${pageLink.attributes.linked_page_slug}`}
                        to={`/pages/${pageLink.attributes.linked_page_slug}`}
                        key={pageLink.id}
                      >
                        <T value={pageLink.attributes.linked_page_title_multiloc} />
                        <LinkIcon name="chevron-right" />
                      </StyledLink>
                    ))}
                  </StyledContentContainer>
                </PagesNav>
              </PagesNavWrapper>
            }

            <Footer showCityLogoSection={false} />
          </Container>
        );
      }
    }
  }

const Data = adopt<DataProps, InputProps & WithRouterProps>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />,
  page: ({ params, render }) => <GetPage slug={params.slug}>{render}</GetPage>,
  pageFiles: ({ page, render }) => <GetResourceFiles resourceId={!isNilOrError(page) ? page.id : null} resourceType="page">{render}</GetResourceFiles>,
  pageLinks: ({ page, render }) => <GetPageLinks pageId={(!isNilOrError(page) ? page.id : null)}>{render}</GetPageLinks>,
});

const PagesShowPageWithHOCs = injectIntl<InputProps & WithRouterProps>(PagesShowPage);

export default withRouter((inputProps: InputProps & WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <PagesShowPageWithHOCs {...inputProps} {...dataProps} />}
  </Data>
));
