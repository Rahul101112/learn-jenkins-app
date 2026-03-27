FROM node:18

# Install netlify-cli globally
RUN npm install -g netlify-cli


# Create the Jenkins user (uid 110, gid 114) in /etc/passwd
RUN groupadd -g 114 jenkins && \
    useradd -u 110 -g 114 -m -s /bin/bash jenkins

USER jenkins