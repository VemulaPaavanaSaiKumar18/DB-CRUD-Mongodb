FROM node:18.12.1 as Build

WORKDIR /home/node/crud_app

COPY package.json .

RUN npm install

FROM node:18.12.1-buster-slim

USER node

EXPOSE 3000

COPY --from=Build /home/node/crud_app .

COPY . .


CMD [ "npm","run","start" ]