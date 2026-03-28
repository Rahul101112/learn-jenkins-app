pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        VM_IP = '20.198.86.255'
        VM_USER = 'gea_admin'
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

                    rm -rf node_modules
                    npm ci

                    npm run build
                    ls -la build/
                '''
            }
        }

        stage("Deploy to Ubuntu VM") {
            steps {
                sshagent(['ubuntu-vm-ssh']) {
                    sh '''
                        echo "Testing connection..."
                        ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP \
                            "echo Connected Successfully!"

                        echo "Clearing old files..."
                        ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP \
                            "rm -rf /var/www/html/*"

                        echo "Copying build files..."
                        scp -o StrictHostKeyChecking=no -r build/* \
                            $VM_USER@$VM_IP:/var/www/html/

                        echo "Restarting Nginx..."
                        ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP \
                            "sudo systemctl restart nginx"

                        echo "Deployed to http://$VM_IP"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build and Deployment successful!"
            cleanWs()
        }
        failure {
            echo "❌ Pipeline failed!"
            cleanWs()
        }
    }
}