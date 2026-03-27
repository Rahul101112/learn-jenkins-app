pipeline {
    agent any

    stages{
        agent {
            docker{
                image 'node:18-alpine'
                reuseNode true
            }
            
        }
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
                sh 'ip addr'
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
