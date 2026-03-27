stage("Build App") {
    agent {
        docker {
            image 'my-node-netlify:latest'
            reuseNode true
        }
    }
    steps {
        sh '''
            echo "Node: $(node --version)"
            echo "NPM: $(npm --version)"

            echo "Installing dependencies..."
            npm ci                  

            echo "Building the app..."
            npm run build

            echo "Build folder contents:"
            ls -la build/
        '''
    }
}
