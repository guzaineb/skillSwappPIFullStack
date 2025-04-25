pipeline {
    agent any

    environment {
        DB_HOST = 'db'
        DB_NAME = 'SkillAppp'
        REGISTRY = 'localhost:8081' 
        REGISTRY_CREDENTIALS = 'nexus'
        SONAR_HOST_URL = 'http://localhost:9000'
        PORT = '5000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'DevOpsPI',  
                    url: 'https://github.com/guzaineb/skillSwappPIFullStack.git' 
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('sonar') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                    sh 'docker tag skill-app ${REGISTRY}/skill-app:latest'
                }
            }
        }
        
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://${REGISTRY}", REGISTRY_CREDENTIALS) {
                        sh 'docker push ${REGISTRY}/skill-app:latest'
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
                // Cleanup if needed
            }
        }
    }
}
