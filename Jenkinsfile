pipeline {
    agent any
    stages{
        stage('Build Docker compose'){
            step{
                sh 'docker-compose build --no-cache'
            }
        }
        stage('Run Docker compose'){
            step{
                sh 'docker-compose up'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}