pipeline {
    agent any

    stages{
        
        stage("Pre-Build Steps"){          
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

        stage("Building Application"){    
        
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

        stage("Production Build"){    
        
            agent {
            docker{
                image 'node:20'
                reuseNode true
            }
            }
            steps{
                echo "========Node.js inside this docker image========"
                sh '''
                echo "This is inside with docker image Node.js installed"
                node --version
                '''
            }
        
        }

        
    }

    post {

        success('Archive Artifacts') 
        {
            sh 'echo "Archiving the artifacts"'
            archiveArtifacts artifacts: 'web2.py', fingerprint: true
            cleanWs()
            
        }
    }
}
