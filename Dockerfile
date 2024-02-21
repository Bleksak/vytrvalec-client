FROM node:21-alpine

ARG origin=http://localhost:3000

RUN mkdir -p app && chmod -R 777 app

WORKDIR /app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

USER node

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000
CMD [ "ORIGIN=$origin", "npm", "run", "prod" ]
