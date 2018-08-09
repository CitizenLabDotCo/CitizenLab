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

// services
import { PageLink } from 'services/pageLink';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';
import GetPage, { GetPageChildProps } from 'resources/GetPage';
import GetPageLinks, { GetPageLinksChildProps } from 'resources/GetPageLinks';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { getLocalized } from 'utils/i18n';
import T from 'components/T';
import messages from './messages';

// styling
import styled from 'styled-components';
import { darken } from 'polished';
import { media, colors, fontSizes, quillEditedContent } from 'utils/styleUtils';

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

const StyledContentContainer = styled(ContentContainer) `
  max-width: calc(${(props) => props.theme.maxPageWidth}px - 100px);
  margin-left: auto;
  margin-right: auto;
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
  font-size: 34px;
  line-height: 40px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 0;
  padding-top: 0px;
  padding-bottom: 40px;

  ${media.smallerThanMaxTablet`
    font-size: 28px;
    line-height: 34px;
  `}
`;

const PageDescription = styled.div`
  color: #333;
  font-size: ${fontSizes.large}px;
  font-weight: 300;
  line-height: 26px;

  h1 {
    font-size: 30px;
    line-height: 35px;
    font-weight: 600;
  }

  h2 {
    font-size: 27px;
    line-height: 33px;
    font-weight: 600;
  }

  h3 {
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
  }

  h4 {
    font-size: ${fontSizes.xl}px;
    line-height: 27px;
    font-weight: 600;
  }

  p {
    margin-bottom: 35px;
  }

  strong {
    font-weight: 600;
  }

  a {
    color: ${colors.clBlueDark};
    text-decoration: underline;

    &:hover {
      color: ${darken(0.15, colors.clBlueDark)};
    }
  }

  img {
    max-width: 100%;
  }

  ${quillEditedContent()}
`;

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

const StyledLink = styled(Link) `
  color: #666;
  font-size: ${fontSizes.large}px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 20px 23px;
  border-radius: 5px;
  border: solid 1px #e4e4e4;
  background: #fff;
  transition: all 100ms ease-out;

  &:hover {
    color: #000;
    border-color: #999;
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
  pageLinks: GetPageLinksChildProps;
}

interface Props extends InputProps, DataProps { }

interface State { }

class PagesShowPage extends React.PureComponent<Props & WithRouterProps & InjectedIntlProps, State> {
  render() {
    const { formatMessage } = this.props.intl;
    const { locale, tenantLocales, page, pageLinks } = this.props;

    if (isNilOrError(locale) || isNilOrError(tenantLocales) || page === undefined) {
      return (
        <Loading>
          <Spinner size="32px" />
        </Loading>
      );
    } else {
      let seoTitle = formatMessage(messages.notFoundTitle);
      let seoDescription = formatMessage(messages.notFoundDescription);
      let blockIndexing = true;
      let pageTitle = <FormattedMessage {...messages.notFoundTitle} />;
      let pageDescription = <FormattedMessage {...messages.notFoundDescription} />;

      if (!isNilOrError(page)) {
        seoTitle = getLocalized(page.attributes.title_multiloc, locale, tenantLocales);
        seoDescription = '';
        blockIndexing = false;
        pageTitle = <T value={page.attributes.title_multiloc} />;
        pageDescription = <T value={page.attributes.body_multiloc} supportHtml={true} />;
      }

      return (
        <Container>
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
                  {pageDescription}
                </PageDescription>
              </Fragment>
            </StyledContentContainer>
          </PageContent>

          {!isNilOrError(pageLinks) &&
            <PagesNavWrapper>
              <PagesNav>
                <StyledContentContainer>
                  {pageLinks.filter(pageLink => !isNilOrError(pageLink)).map((pageLink: PageLink) => (
                    <StyledLink to={`/pages/${pageLink.attributes.linked_page_slug}`} key={pageLink.id}>
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

    return null;
  }
}

const Data = adopt<DataProps, InputProps & WithRouterProps & InjectedIntlProps>({
  locale: <GetLocale />,
  tenantLocales: <GetTenantLocales />,
  page: ({ params, render }) => <GetPage slug={params.slug}>{render}</GetPage>,
  pageLinks: ({ page, render }) => <GetPageLinks pageId={(!isNilOrError(page) ? page.id : null)}>{render}</GetPageLinks>,
});

export default withRouter(injectIntl((inputProps: InputProps & WithRouterProps & InjectedIntlProps) => (
  <Data {...inputProps}>
    {dataProps => <PagesShowPage {...inputProps} {...dataProps} />}
  </Data>
)));
