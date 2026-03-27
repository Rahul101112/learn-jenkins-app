FROM node:20

# Install netlify-cli globally as root during image build
RUN npm install -g netlify-cli

# Switch to node user (already exists in node:20)
USER node