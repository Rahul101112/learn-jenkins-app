pipeline {
    agent any

    stages{
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
            cleanWs()
        }
    }
}
