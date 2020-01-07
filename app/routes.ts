import adminRoutes from 'containers/Admin/routes';
import Loadable from 'react-loadable';
import { LoadableLoadingCitizen } from 'components/UI/LoadableLoading';

export default function createRoutes() {
  return [
    {
      path: '/:locale',
      name: 'LocaleWrapper',
      indexRoute: {
        name: 'home',
        component: Loadable({
          loader: () => import('containers/LandingPage'),
          loading: LoadableLoadingCitizen,
          delay: 500
        })
      },
      childRoutes: [
        {
          path: 'sign-in',
          name: 'signInPage',
          component: Loadable({
            loader: () => import('containers/SignInPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'sign-up',
          name: 'signUpPage',
          component: Loadable({
            loader: () => import('containers/SignUpPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'invite',
          name: 'signUpPage',
          component: Loadable({
            loader: () => import('containers/SignUpPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'complete-signup',
          name: 'completeSignUpPage',
          component: Loadable({
            loader: () => import('containers/CompleteSignUpPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'authentication-error',
          name: 'completeSignUpPage',
          component: Loadable({
            loader: () => import('containers/CompleteSignUpPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'site-map',
          name: 'siteMap',
          component: Loadable({
            loader: () => import('containers/SiteMap'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'profile/edit',
          name: 'usersEditPage',
          component: Loadable({
            loader: () => import('containers/UsersEditPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'profile/:slug',
          name: 'usersShowPage',
          component: Loadable({
            loader: () => import('containers/UsersShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'ideas/new',
          name: 'IdeasProjectSelectPage',
          component: Loadable({
            loader: () => import('containers/IdeasProjectSelectPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'ideas/edit/:ideaId',
          name: 'IdeasEditPage',
          component: Loadable({
            loader: () => import('containers/IdeasEditPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'ideas',
          name: 'ideasPage',
          component: Loadable({
            loader: () => import('containers/IdeasIndexPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          path: 'ideas/:slug',
          name: 'ideasShow',
          component: Loadable({
            loader: () => import('containers/IdeasShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'initiatives',
          name: 'initiativesPage',
          component: Loadable({
            loader: () => import('containers/InitiativesIndexPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'initiatives/edit/:initiativeId',
          name: 'InitiativesEditPage',
          component: Loadable({
            loader: () => import('containers/InitiativesEditPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'initiatives/new',
          name: 'initiativesNewPage',
          component: Loadable({
            loader: () => import('containers/InitiativesNewPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        // super important that this comes AFTER initiatives/new, if it comes before, new is interpreted as a slug
        {
          path: 'initiatives/:slug',
          name: 'initiativesShow',
          component: Loadable({
            loader: () => import('containers/InitiativesShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 10
          })
        },
        {
          path: 'projects/:slug/ideas/new',
          name: 'IdeasNewPage',
          component: Loadable({
            loader: () => import('containers/IdeasNewPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        adminRoutes(),
        {
          path: 'projects',
          name: 'Project page',
          component: Loadable({
            loader: () => import('containers/ProjectsIndexPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'projects/:slug',
          name: 'Project page',
          component: Loadable({
            loader: () => import('containers/ProjectsShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
          indexRoute: {
            name: 'Project page',
            component: Loadable({
              loader: () => import('containers/ProjectsShowPage/main'),
              loading: LoadableLoadingCitizen,
              delay: 500
            })
          },
          childRoutes: [
            {
              path: 'process',
              name: 'Project\'s process page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/process'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
            {
              path: 'timeline',
              name: 'Project\'s process page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/process'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
            {
              path: 'info',
              name: 'Project\'s info page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/info'),
                loading: LoadableLoadingCitizen,
                delay: 500
              }),
            },
            {
              path: 'events',
              name: 'Project\'s events page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/events'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
            {
              path: 'ideas',
              name: 'Project\'s ideas page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/ideas'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
            {
              path: 'survey',
              name: 'Project\'s survey page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/survey'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
            {
              path: 'poll',
              name: 'Project\'s poll page',
              component: Loadable({
                loader: () => import('containers/ProjectsShowPage/poll'),
                loading: LoadableLoadingCitizen,
                delay: 500
              })
            },
          ],
        },
        {
          path: 'pages/cookie-policy',
          name: 'cookiePolicy',
          component: Loadable({
            loader: () => import('containers/CookiePolicy'),
            loading: LoadableLoadingCitizen,
            delay: 500
          })
        },
        {
          path: 'pages/:slug',
          name: 'pagesShowPage',
          component: Loadable({
            loader: () => import('containers/PagesShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          path: 'templates/:projectTemplateId',
          name: 'project template preview page',
          component: Loadable({
            loader: () => import('components/ProjectTemplatePreview/ProjectTemplatePreviewPageCitizen'),
            loading: () => null
          }),
        },
        {
          path: 'password-recovery',
          name: 'passwordRecovery',
          component: Loadable({
            loader: () => import('containers/PasswordRecovery'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          // Used as link in email received for password recovery
          path: 'reset-password',
          name: 'passwordReset',
          component: Loadable({
            loader: () => import('containers/PasswordReset'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          path: 'subscription-ended',
          name: 'subscriptionEnded',
          component: Loadable({
            loader: () => import('containers/SubscriptionEndedPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          path: 'email-settings',
          name: 'EmailSettingPage',
          component: Loadable({
            loader: () => import('containers/EmailSettingsPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
        {
          path: '*',
          name: 'notfound',
          component: Loadable({
            loader: () => import('containers/PagesShowPage'),
            loading: LoadableLoadingCitizen,
            delay: 500
          }),
        },
      ],
    }
  ];
}
