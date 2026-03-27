pipeline {
    agent any

    stages{
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
            }
            post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
                }
            }
        }
    }

    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
            // archiveArtifacts artifacts: '**', fingerprint: true
        }
        failure{
            echo "========pipeline execution failed========"

    post {

        success('Archive Artifacts') 
        {
            sh 'echo "Archiving the artifacts"'
            cleanWs()
        }
    }
}
