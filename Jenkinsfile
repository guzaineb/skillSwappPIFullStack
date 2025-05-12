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

     stage('Send Email') {
            steps {
                script {
                    emailext (
                        subject: "✅ Build Réussi : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
                            <p>Bonjour,</p>
                            <p>Le build du job <strong>${env.JOB_NAME}</strong> a réussi 🎉</p>
                            <p>Voir les détails ici : <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        """,
                        mimeType: 'text/html',
                        to: 'sarahmaamar2001@gmail.com',
                        from: "${EMAIL_CREDENTIALS_USR}",
                        replyTo: "${EMAIL_CREDENTIALS_USR}"
                    )
                }
            }
        }
    }


    post {
        always {
            script {
                //sh 'docker-compose down || true'
                echo 'Post Actions'
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
