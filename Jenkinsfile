pipeline {
    agent any

    stages{
        
        stage("Without Docker Image"){          
            steps{
                echo "========executing Web Application Testing without Docker image========"
                sh '''
                echo "This is outside docker image"
                mkdir -p Withdocker
                docker --version
                '''
            }
        
        }

        stage("With Docker Image"){
            agent {
            docker{
                image 'node:18-alpine'
                reuseNode true
            }
            
        }            
            steps{
                echo "========executing Web Application Testing========"
                sh '''
                echo "This is inside with docker image"
                mkdir -p withdocker
                node --version >> withdocker
                npm --version >> withdocker
                
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
