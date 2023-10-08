pipeline {
    agent any
    stages{
        stage('Stop Docker compose'){
            steps{
                sh 'sudo -S <<< "ubuarm64" docker-compose down'
            }
        }
        stage('Build Docker compose'){
            steps{
                sh 'sudo -S <<< "ubuarm64" docker-compose build --no-cache'
            }
        }
        stage('Run Docker compose'){
            steps{
                sh 'sudo -S <<< "ubuarm64" docker-compose up'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}