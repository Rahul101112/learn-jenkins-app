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
                image 'openjdk:27-ea-oraclelinux10'
                reuseNode true
            }
            
        }            
            steps{
                echo "========Java inside this docker image========"
                sh '''
                echo "This is inside with docker image Java installed"
                java --version
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
