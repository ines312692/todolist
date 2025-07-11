pipeline {
  agent any

  environment {
    IMAGE_NAME = "todo-app"
    CONTAINER_NAME = "todo-container"
    HOST_PORT = "8081"
    CONTAINER_PORT = "80"
  }

  stages {
    stage('Build Angular App') {
      agent {
        docker {
          image 'node:20-alpine'
        }
      }
      steps {
        echo 'Installing dependencies and building Angular app...'
        sh 'npm install'
        sh 'npm run build'
        sh 'ls -R dist'
        stash includes: 'dist/**/*', name: 'build-artifacts'
      }
    }

    stage('Test Docker') {
      agent {
        docker {
          image 'cypress/included:14.3.0'
          args '-u root:root'
        }
      }
      steps {
        echo 'Running Angular unit tests...'
        sh 'npm ci'
        sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
      }
    }

    stage('Build Docker Image') {
      steps {
        unstash 'build-artifacts'
        dir("${env.WORKSPACE}") {
          sh "docker build -t ${IMAGE_NAME}:latest ."
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          echo 'Deploying container...'
          sh """
            docker ps -q -f name=${CONTAINER_NAME} | grep -q . && docker stop ${CONTAINER_NAME} || echo 'Container not running'
            docker ps -a -q -f name=${CONTAINER_NAME} | grep -q . && docker rm ${CONTAINER_NAME} || echo 'Container not found'
            docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest
          """
        }
      }
    }
  }

  post {
    success {
      echo 'Build and deployment succeeded!'
    }
    failure {
      echo 'Build or deployment failed.'
    }
    always {
      echo 'Pipeline execution completed.'
      sh 'rm -rf dist/ || true'
    }
  }
}
