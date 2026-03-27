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
                   
                            npm install netlify-cli -g
                            netlify --version
                            netlify status
                            netlify deploy --prod --dir=build --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN


                '''
            }

            // stage("Pre-Build Steps"){          
                //     steps{
                //         echo "========executing Web Application Testing without Docker image========"
                //         sh '''
                //         echo "This is outside docker image"
                //         docker --version
                //         node --version
                //         npm --version
                //         '''
                //     }
                
                // }

                // stage("Building Application"){    
                
                //     agent {
                //     docker{
                //         image 'python:3.11.15-trixie'
                //         reuseNode true
                //     }
                //     }
                //     steps{
                //         echo "========Python inside this docker image========"
                //         sh '''
                //         echo "This is inside with docker image Python installed"
                //         python3 --version
                //         python3 web2.py
                //         '''
                //     }
                
                // }

        
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
