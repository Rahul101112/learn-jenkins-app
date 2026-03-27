pipeline {
    agent any

    stages {

        stage('Build_Python_project') 
        {
            steps {
               sh 'echo "Testing completed for the python project"'
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

    post {

        success('Archive Artifacts') 
        {
            sh 'ls -lh'
            cleanWs()
        }
    }
}