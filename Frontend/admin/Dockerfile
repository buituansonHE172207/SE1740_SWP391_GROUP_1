FROM node:alpine

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm install

COPY . ./

RUN npm run build

RUN npm start