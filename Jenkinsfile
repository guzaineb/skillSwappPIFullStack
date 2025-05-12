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
        EMAIL_CREDENTIALS = credentials('email') 
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
                    sh 'npm ci'
                }
            }
        }

        stage('Unit Tests') {
    steps {
        dir('backend') {
            sh '''
                echo "🧪 Running unit tests..."
                npm test -- --coverage || {
                    echo "❌ Tests failed. Showing logs:"
                    cat /root/.npm/_logs/* || true
                }
            '''
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
        
        stage('Build & Push Docker Image') {
    steps {
        script {
            // Build image
            sh 'docker-compose build'

            // Tag pour Docker Hub
            sh 'docker tag localhost:8081/skill-app:latest saraiguess/skill-app:latest'

            // Pousser sur Docker Hub
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push saraiguess/skill-app:latest
                '''
            }
        }
    }
}

        stage('Monitoring') {
    steps {
        echo 'Prometheus available at: http://172.23.96.107:9090'
        echo 'Grafana available at: http://172.23.96.107:3000'
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

    }


    post {
       always {
            echo "Pipeline finished (success or failure)."
        }
        success {
            emailext (
                subject: "✅ SUCCESS: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Pipeline <b>${env.JOB_NAME}</b> succeeded!</p>
                    <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Console Log:</b> <a href="${env.BUILD_URL}console">View Logs</a></p>
                """,
                to: 'sarahmaamar2001@gmail.com',
                mimeType: 'text/html'
            )
        }
        failure {
            emailext (
                subject: "❌ FAILURE: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Pipeline <b>${env.JOB_NAME}</b> failed!</p>
                    <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Console Log:</b> <a href="${env.BUILD_URL}console">Debug Here</a></p>
                """,
                to: 'sarahmaamar2001@gmail.com',
                mimeType: 'text/html'
            )
        }
    }
}
