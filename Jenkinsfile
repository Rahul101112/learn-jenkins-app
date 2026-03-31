pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
        VM_IP = '20.198.86.255'
        VM_USER = 'gea_admin'
        STORAGE_ACCOUNT = "devopslearning1801"
        CONTAINER_NAME = "myapp-container"

        AZURE_CLIENT_ID = credentials('azure-client-id')
        AZURE_CLIENT_SECRET = credentials('azure-client-secret')
        AZURE_TENANT_ID = credentials('azure-tenant-id')
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
                    npm install

                    npm run build
                    ls -la build/
                '''
            }
        }
 
stage("Azure Login") {
    steps {
        sh '''
            echo "Logging into Azure using Service Principal..."

            az login --service-principal \
                -u $AZURE_CLIENT_ID \
                -p $AZURE_CLIENT_SECRET \
                --tenant $AZURE_TENANT_ID
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

stage("Approval Before Upload") {
    steps {
        script {
            input message: "Approve deployment?",ok: "Yes, Upload", submitter: "admin"
        }
    }
}


        

stage("Upload to Azure Storage") {
    steps {
        sh '''
            echo "Uploading build files using Service Principal..."

            az storage blob upload-batch \
                --account-name $STORAGE_ACCOUNT \
                --destination $CONTAINER_NAME \
                --source build/ \
                --auth-mode login

            echo "Upload completed!"
        '''
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
