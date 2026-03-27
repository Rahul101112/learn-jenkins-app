pipeline {
    agent any

    stages{
        
        stage("Web Application Testing"){
            agent {
            docker{
                image 'node:18-alpine'
                reuseNode true
            }
            
        }            
            steps{
                echo "========executing Web Application Testing========"
                sh '''
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
