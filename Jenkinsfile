pipeline {
    agent any

<<<<<<< HEAD
    stages{
        stage("Web Application Testing"){
            steps{
                echo "========executing Web Application Testing========"
                sh 'npm --version'
                sh 'ls -lh'
=======
    stages {

        stage('Build_Python_project') 
        {
            steps {
               sh 'echo "Testing completed for the python project"'
>>>>>>> test
            }
        }

        stage('Test_python') 
        {
            steps {
                sh 'echo "Testing completed for the python project"'
                sh 'ip addr'
            }
        }
    }
<<<<<<< HEAD
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
=======

    post {

        success('Archive Artifacts') 
        {
            sh 'echo "Archiving the artifacts"'
            cleanWs()
>>>>>>> test
        }
    }
}