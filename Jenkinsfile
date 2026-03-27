pipeline{
    agent any

    stages{
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
                sh 'npm --version'
                sh 'ls -lh'
            }

        stage("Web Application Testing 1 "){
            steps{
                echo "========executing Git  Application Version ========"
                sh 'git --version'
                
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
        }
    }
}