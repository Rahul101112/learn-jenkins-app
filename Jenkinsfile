pipeline{
    agent any

    stages{
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
                sh 'npm --version'
                sh 'ls -lh'
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
            archiveArtifacts artifacts: 'reports/**', fingerprint: true
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}