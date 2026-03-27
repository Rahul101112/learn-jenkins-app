pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        CI_ENVIRONMENT_URL = "http://52.157.155.87:3000/"
    }

    stages {

        stage("Build Docker Image") {
            steps {
                sh 'docker build -t my-node-netlify:latest .'
            }
        }

        stage("Build App") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Node: $(node --version)"
                    echo "NPM: $(npm --version)"

                    echo "Cleaning old node_modules..."
                    rm -rf node_modules

                    echo "Installing dependencies..."
                    npm install

                    echo "Checking react-scripts exists..."
                    ls node_modules/.bin/react-scripts

                    echo "Building the app..."
                    npm run build

                    echo "Build folder contents:"
                    ls -la build/
                '''
            }
        }

        stage("Production Deploy") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                echo "========Deploying to Netlify========"
                sh '''
                    echo "Node: $(node --version)"
                    echo "NPM: $(npm --version)"
                    netlify --version
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
            cleanWs()
        }
        failure {
            echo "❌ Pipeline failed!"
            cleanWs()
        }
    }
}