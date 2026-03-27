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
                '''
            }
        
        }

        stage("With Docker Image"){
            agent {
            docker{
                image 'node:20-alpine'
                reuseNode true
            }
            
        }            
            steps{
                echo "========This is inside with docker image========"
                sh '''
                echo "This is inside with docker image"
                node --version
                npm --version
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
