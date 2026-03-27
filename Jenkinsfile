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
                sudo apt update -y
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
                echo "========Python inside this docker image========"
                sh '''
                echo "This is inside with docker image Python installed"
                python3 --version
                python3 web2.py
                '''
            }
        
        }

        stage("With Java Image"){    
        
            agent {
            docker{
                image 'openjdk:11-jdk'
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
