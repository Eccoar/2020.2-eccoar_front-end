FROM node:14-alpine

WORKDIR /app

ADD package-lock.json .

ADD package.json .

RUN npm install

ADD . .

CMD ["npm", "start"]

