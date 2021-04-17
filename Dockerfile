FROM node:14-alpine as build

ARG gateway_host=eccoar-app-gateway

ENV REACT_APP_GATEWAY $gateway_host

WORKDIR /app

ADD package-lock.json .

ADD package.json .

RUN npm install

ADD . .

RUN npm run build

FROM node:14-alpine

RUN npm install -g http-serve

WORKDIR /app

COPY --from=build /app/build /app/build

CMD ["http-serve", "build", "-a", "0.0.0.0", "-p", "3000"]

EXPOSE 3000