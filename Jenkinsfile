pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site-id')
    }

    stages {

        stage("Build Docker Image") {
            steps {
                sh 'docker build -t my-node-netlify:latest .'
            }
        }

        stage("Install Dependencies") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm ci
                '''
            }
        }

        stage("Build App") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Building the app..."
                    npm run build
                    echo "Build folder contents:"
                    ls -la build/
                '''
            }
        }

        stage("Production Deploy") {
            agent {
                docker {
                    image 'my-node-netlify:latest'
                    reuseNode true
                }
            }
            steps {
                echo "========Deploying to Netlify========"
                sh '''
                    echo "Node: $(node --version)"
                    echo "NPM: $(npm --version)"
                    netlify --version

                    echo "Deploying to Netlify..."
                    netlify deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
            cleanWs()
        }
        failure {
            echo "❌ Pipeline failed!"
            cleanWs()
        }
    }
}
```

---

## 📁 Your Repo Structure Should Look Like This
```
your-repo/
├── Dockerfile          ← Docker image definition
├── Jenkinsfile         ← Pipeline definition
├── package.json        ← App dependencies
├── package-lock.json   ← Exact dependency versions
└── src/                ← Your app source code
```

---

## 🔄 Flow Summary
```
GitHub Push
    ↓
Jenkins reads Jenkinsfile
    ↓
Stage 1: docker build → creates my-node-netlify image
    ↓
Stage 2: npm ci → installs node_modules
    ↓
Stage 3: npm run build → creates build/ folder
    ↓
Stage 4: netlify deploy → uploads build/ to Netlify
    ↓
Post: cleanWs() → cleans up workspace