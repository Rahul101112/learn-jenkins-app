pipeline {
    agent any

    stages{
        
        stage("Without Docker Image"){          
            steps{
                echo "========executing Web Application Testing without Docker image========"
                sh '''
                echo "This is outside docker image"
                docker --version
                node --version
                npm --version
                docker ps
                '''
            }
        
        }

        stage("With Docker Image"){    
        
            agent {
            docker{
                image 'python:3.11.15-trixie'
                reuseNode true
            }
            }
            steps{
                echo "========Java inside this docker image========"
                sh '''
                echo "This is inside with docker image Java installed"
                java --version
                python3 --version
                python3 web2.py
                '''
            }
        
        }

        
    }

    post {

        success('Archive Artifacts') 
        {
            sh 'echo "Archiving the artifacts"'
            
        }
    }
}
