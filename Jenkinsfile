pipeline {
    agent any

    stages{
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
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
