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

        stage("Install Dependencies") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm install
                '''
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

                    echo "Deploying to Netlify..."
                    netlify deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
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