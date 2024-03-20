FROM alpine:3.19

# ARG origin=https://vytrvalec.kts.zcu.cz
ENV ORIGIN=https://vytrvalec.kts.zcu.cz
ENV BODY_SIZE_LIMIT=15000000

RUN apk add --update nodejs npm

RUN mkdir -p app && chmod -R 777 app

WORKDIR /app

COPY . .

RUN npm ci

RUN { \
        echo 'VITE_FACEBOOK_URL=https://www.facebook.com/KatedraTelesneVychovyASportuZcuVPlzni'; \
        echo 'VITE_INSTAGRAM_URL=https://www.instagram.com/kts.zcu/'; \
        echo 'VITE_SERVER_API_BASE=http://vytrvalec-nginx/api'; \
        echo 'VITE_API_BASE=https://vytrvalec.kts.zcu.cz/api'; \
        echo 'BODY_SIZE_LIMIT=15000000'; \
    } > .env

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
