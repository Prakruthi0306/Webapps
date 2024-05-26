pipeline { 
  environment {
    frontendDockerImage = ''
    nginxDockerImage = ''
  }

  agent any
  stages {
    stage('Clone Repository') {
      steps {
        git([url: 'https://github.com/NeuroLeapTeam/nl1dashboard-fe', branch: 'master', credentialsId: 'github_credentials'])
      }
    }

    stage('Build Image') {
      steps{
        script {
          frontendDockerImage = docker.build('nl1cloud-frontend:latest', '-f Dockerfile.frontend .')
          nginxDockerImage = docker.build('nl1cloud-nginx-proxy:latest', '-f Dockerfile.nginx .')
        }
      }
    }
  }
}
