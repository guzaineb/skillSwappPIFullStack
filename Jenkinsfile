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
        PORT = '5000'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
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
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "saraiguess/DevOpsPI:${env.BUILD_NUMBER}"
                    
                    sh "docker build -t ${imageName} ."
                    
                    env.DOCKER_IMAGE_NAME = imageName
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )]) {
                        sh "echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USER} --password-stdin"
                    }
                    
                    sh "docker push ${env.DOCKER_IMAGE_NAME}"
                    
                    def baseImageName = env.DOCKER_IMAGE_NAME.split(':')[0]
                    sh """
                        docker tag ${env.DOCKER_IMAGE_NAME} ${baseImageName}:latest
                        docker push ${baseImageName}:latest
                    """
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
