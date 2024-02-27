FROM node:21-alpine

# ARG origin=https://vytrvalec.kts.zcu.cz
ENV ORIGIN=https://vytrvalec.kts.zcu.cz

RUN mkdir -p app && chmod -R 777 app

WORKDIR /app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

USER node

RUN npm ci

COPY --chown=node:node . .

RUN { \
    echo 'VITE_FACEBOOK_URL=https://www.facebook.com/KatedraTelesneVychovyASportuZcuVPlzni'; \
    echo 'VITE_INSTAGRAM_URL=https://www.instagram.com/kts.zcu/'; \
    echo 'VITE_SERVER_API_BASE=http://vytrvalec-nginx/api'; \
    echo 'VITE_API_BASE=https://vytrvalec.kts.zcu.cz/api'; \
    echo 'BODY_SIZE_LIMIT=10000000'; \
    } > .env

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
