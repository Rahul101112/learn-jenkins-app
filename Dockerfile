FROM node:20


WORKDIR /learn-jenkins-app
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]
