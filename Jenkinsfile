pipeline {
    agent any

    tools {
        nodejs 'Node 18'
    }

    environment {
        DB_HOST = 'db'
        DB_NAME = 'SkillAppp'
        REGISTRY = '172.23.96.107:8081'
        REGISTRY_CREDENTIALS = 'nexus-credentials'
        SONAR_HOST_URL = 'http://172.23.96.107:9000'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials' 
        DOCKERHUB_REPO = 'saraiguess/skill-app' 
        PORT = '5000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'DevOpsPI',
                    credentialsId: 'dockerhub-credentials',
                    url: 'https://github.com/guzaineb/skillSwappPIFullStack.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Unit Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    script {
                        def scannerHome = tool 'SonarQube Scanner'
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=skill-app \
                            -Dsonar.sources=./backend \
                            -Dsonar.host.url=${SONAR_HOST_URL} \
                            -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
    steps {
        script {
            sh 'docker-compose build'
            sh 'docker tag localhost:8081/skill-app:latest ${REGISTRY}/skill-app:latest'
        }
    }
}

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKERHUB_REGISTRY}", DOCKERHUB_CREDENTIALS) {
                        sh 'docker push ${DOCKERHUB_REPO}:latest'
                    }
                }
            }
        }

        stage('Run Application') {
            steps {
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose down || true'
            }
        }
        success {
            echo "✅ Pipeline executed successfully!"
            echo "App should be running at: http://localhost:5000"
        }
        failure {
            echo "❌ Pipeline failed. Check logs for more info."
        }
    }
}
