FROM node:14-alpine AS BUILD_IMAGE

ENV NODE_ENV "production"

WORKDIR /usr/src/app

RUN apk update && apk add mongodb-tools

COPY package*.json ./

RUN npm ci

COPY . .
