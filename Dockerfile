FROM node:14-alpine

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm i
RUN npm run build
