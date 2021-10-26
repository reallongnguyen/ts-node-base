FROM node:14-alpine

EXPOSE 3000
WORKDIR /app
RUN apk add g++ make python

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app
RUN yarn run build

CMD yarn run start:prod
