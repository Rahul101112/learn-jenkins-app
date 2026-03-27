pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages {

        stage("Build Docker Image") {
            steps {
                sh 'docker build -t my-node-netlify:latest .'
            }
        }

        stage("Production Build") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                echo "========Node.js inside this docker image========"
                sh '''
                                echo "This is a SITE :$NETLIFY_SITE_ID"
                                echo "Running inside Docker"

                                npm --version
                                node --version
                                netlify --version

                '''
            }
        }
    }

    post {
        success {
            echo "Archiving the artifacts"
            // archiveArtifacts artifacts: 'web2.py', fingerprint: true
            cleanWs()
        }
    }
}