pipeline {
    agent any
    stages{
        stage('Stop Docker compose'){
            steps{
                sh '$echo ubuarm64 | sudo -S docker-compose down'
            }
        }
        stage('Build Docker compose'){
            steps{
                sh '$echo ubuarm64 | sudo -S docker-compose build --no-cache'
            }
        }
        stage('Run Docker compose'){
            steps{
                sh '$echo ubuarm64 | sudo -S docker-compose up'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}