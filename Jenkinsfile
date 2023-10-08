pipeline {
    agent any
    stages{
        stage('Stop Docker compose'){
            steps{
                sh 'sudo docker-compose down'
            }
        }
        stage('Build Docker compose'){
            steps{
                sh 'sudo docker-compose build --no-cache'
            }
        }
        stage('Run Docker compose'){
            steps{
                sh 'sudo docker-compose up'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}