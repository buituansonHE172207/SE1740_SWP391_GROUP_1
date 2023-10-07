pipeline {
    agent any
    
    stage("Initialize") {
            steps {
                script {
                    def dockerHome = tool 'docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from your version control system
                checkout scm
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    
                    // Build and tag the API Docker image
                    sh "docker build -t api:lnguyennb ./Backend/"
                    
                    // Build and tag the Website Docker image
                    sh "docker build -t website:lnguyennb ./Frontend/website"
                    
                    // Build and tag the Admin Docker image
                    sh "docker build -t admin:lnguyennb ./Frontend/admin"
                    
                    // // Push the Docker images to a registry (e.g., Docker Hub)
                    // sh "docker push api:${dockerImageTag}"
                    // sh "docker push website:${dockerImageTag}"
                    // sh "docker push admin:${dockerImageTag}"
                    }
                }
            }
        
        stage('Deploy Docker Compose') {
            steps {
                script {
                    // Deploy the Docker Compose stack
                    sh "docker-compose -f docker-compose.yml -p myapp up -d"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}