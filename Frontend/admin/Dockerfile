FROM node:alpine

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm install

COPY . ./

CMD npm start
