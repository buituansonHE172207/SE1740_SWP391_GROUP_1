pipeline {
    agent any
    stages{
        stage('Stop Docker compose'){
            steps{
                sh 'docker-compose down'
            }
        }
        stage('Build Docker compose'){
            steps{
                sh 'docker-compose build --no-cache'
            }
        }
        stage('Run Docker compose'){
            steps{
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