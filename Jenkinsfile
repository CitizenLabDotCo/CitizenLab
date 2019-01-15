pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building containers'
        sh 'docker-compose build'
        sh 'docker-compose up -d postgres redis'
        sleep 10
        echo 'Setting up database'
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rake db:create'
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rake db:migrate'
      }
    }
    stage('Test main app') {
      steps {
        echo 'testing rspec'
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm web bundle exec rake spec'
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm web bundle exec rake web_api:docs:generate'
        step([
            $class: 'RcovPublisher',
            reportDir: "coverage/rcov",
            targets: [
                [metric: "CODE_COVERAGE", healthy: 75, unhealthy: 50, unstable: 30]
            ]
        ])
        withAWS(credentials: 'aws') {
          s3Upload(file:'doc/api', bucket:'developers.citizenlab.co', path: "api-docs/frontweb_api/${env.BRANCH_NAME}", acl:'PublicRead')
        }
      }
    }

    stage('Test public API') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rake public_api:docs:generate'
        withAWS(credentials: 'aws') {
          s3Upload(file: 'doc/public_api', bucket:'developers.citizenlab.co', path: "api-docs/public_api/${env.BRANCH_NAME}", acl:'PublicRead')
        }
      }
    }

    stage('Test admin API') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rake admin_api:docs:generate'
        withAWS(credentials: 'aws') {
          s3Upload(file: 'doc/admin_api', bucket:'developers.citizenlab.co', path: "api-docs/admin_api/${env.BRANCH_NAME}", acl:'PublicRead')
        }
      }
    }

    stage('Test email campaigns') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rspec engines/email_campaigns/spec/'
      }
    }

    stage('Test machine translations') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rspec engines/machine_translations/spec/'
      }
    }

    stage('Test onboarding') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rspec engines/onboarding/spec/'
      }
    }

    stage('Test NLP') {
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e RAILS_ENV=test web bundle exec rspec engines/nlp/spec/'

      }
    }

    stage('Test slow tests (tenant templates)') {
      when { branch 'master' }
      steps {
        sh 'docker-compose run --user "$(id -u):$(id -g)" --rm -e SPEC_OPTS="-t slow_test" web bundle exec rake spec'
      }
    }

    stage('Push docker image tagged latest') {
      when { branch 'master' }
      steps {
        script {
          sh 'rm -rf public/uploads/*'
          docker.withRegistry("https://index.docker.io/v1/",'docker-hub-credentials') {
            def image = docker.build('citizenlabdotco/cl2-back:latest')
            image.push('latest')
          }
        }
      }
    }
    stage('Deploy to staging') {
      when { branch 'master' }
      steps {
        sshagent (credentials: ['local-ssh-user']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 35.157.143.6 "docker pull citizenlabdotco/cl2-back:latest && docker run --env-file cl2-deployment/.env-staging citizenlabdotco/cl2-back:latest rake db:migrate cl2back:clean_tenant_settings email_campaigns:assure_campaign_records fix_existing_tenants:update_permissions cl2back:clear_cache_store"'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 35.157.143.6 "cd cl2-deployment && docker stack deploy --compose-file docker-compose-staging.yml cl2-back-stg --with-registry-auth"'
          slackSend color: '#50c122', message: ":tada: SUCCESS: ${env.JOB_NAME} build #${env.BUILD_NUMBER} deployed to staging cluster!\nMore info at ${env.BUILD_URL}"
        }
      }
    }
    stage('Push docker image tagged production-benelux') {
      when { branch 'production' }
      steps {
        echo 'Building containers'
        script {
          sh 'rm -rf public/uploads/*'
          docker.withRegistry("https://index.docker.io/v1/",'docker-hub-credentials') {
            def image = docker.build('citizenlabdotco/cl2-back:production-benelux')
            image.push('production-benelux')
          }
        }
      }
    }
    stage('Deploy to Benelux production cluster') {
      when { branch 'production' }
      steps {
        sshagent (credentials: ['local-ssh-user']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 18.195.88.135 "docker pull citizenlabdotco/cl2-back:production-benelux && docker run --env-file cl2-deployment/.env-production-benelux citizenlabdotco/cl2-back:production-benelux rake db:migrate cl2back:clean_tenant_settings email_campaigns:assure_campaign_records fix_existing_tenants:update_permissions cl2back:clear_cache_store"'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 18.195.88.135 "cd cl2-deployment && docker stack deploy --compose-file docker-compose-production-benelux.yml cl2-prd-bnlx-stack --with-registry-auth"'
          slackSend color: '#50c122', message: ":tada: SUCCESS: ${env.JOB_NAME} build #${env.BUILD_NUMBER} deployed to benelux production cluster!\nMore info at ${env.BUILD_URL}"
        }
      }
    }

    stage('Deploy to Canada production cluster') {
      when { branch 'production' }
      steps {
        sshagent (credentials: ['local-ssh-user']) {
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 35.183.23.116 "docker pull citizenlabdotco/cl2-back:production-benelux && docker run --env-file cl2-deployment/.env-production-canada citizenlabdotco/cl2-back:production-benelux rake db:migrate cl2back:clean_tenant_settings email_campaigns:assure_campaign_records fix_existing_tenants:update_permissions cl2back:clear_cache_store"'
          sh 'ssh -o StrictHostKeyChecking=no -l ubuntu 35.183.23.116 "cd cl2-deployment && docker stack deploy --compose-file docker-compose-production-canada.yml cl2-back --with-registry-auth"'
          slackSend color: '#50c122', message: ":tada: SUCCESS: ${env.JOB_NAME} build #${env.BUILD_NUMBER} deployed to canada production cluster!\nMore info at ${env.BUILD_URL}"
        }
      }
    }

    stage('Trigger rebuild and deployment of cl-docs-portal') {
      environment {
        CIRCLE_API_TOKEN = credentials('circle-api-token')
      }
      steps {
        sh "curl -u ${CIRCLE_API_TOKEN}: -d build_parameters[CIRCLE_JOB]=build https://circleci.com/api/v1.1/project/github/CitizenLabDotCo/cl-docs-portal/tree/master"
      }
    }
  }


  post {
    always {
      junit 'spec/reports/**/*.xml'
      sh 'docker-compose down --volumes'
      cleanWs()
    }
    failure {
      slackSend color: '#e93b1c', message: ":boom: FAILURE: ${env.JOB_NAME} build #${env.BUILD_NUMBER} failed\nSee what went wrong at ${env.BUILD_URL}"
    }
    unstable {
      slackSend color: '#d59a35', message: ":thinking_face: succeeded, but flagged UNSTABLE: ${env.JOB_NAME} build #${env.BUILD_NUMBER} passed all tests!\nThis probably means there were some warnings or pending tests.\nMore info at ${env.BUILD_URL}"
    }
  }
}
