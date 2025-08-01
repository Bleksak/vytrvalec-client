FROM node:24-alpine3.22

# ARG origin=https://vytrvalec.kts.zcu.cz
ENV ORIGIN=https://vytrvalec.uts.zcu.cz
ENV BODY_SIZE_LIMIT=15000000

RUN apk add --update nodejs npm

RUN mkdir -p app && chmod -R 777 app

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
