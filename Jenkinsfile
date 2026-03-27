pipeline {
    agent any

    environment{
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages{
        
            stage("Production Build"){    
        
            agent {
            docker{
                image 'node:20'
                args '-u root'
                reuseNode true
            }
            }
            steps{
                echo "========Node.js inside this docker image========"
                sh '''
                            echo "This is a SITE :$NETLIFY_SITE_ID"
                   
                            npm --version
                '''
            }
        }   
    }

    post {

        success('Archive Artifacts') 
        {
            sh 'echo "Archiving the artifacts"'
            // archiveArtifacts artifacts: 'web2.py', fingerprint: true
            cleanWs()
            
        }
    }
}
