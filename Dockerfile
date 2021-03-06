FROM node:10.15-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --development --silent && mv node_modules ../

COPY . .

EXPOSE 3000

RUN npm install -g nodemon

CMD ["nodemon", "./server/index.js"]