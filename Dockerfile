FROM ghcr.io/puppeteer/puppeteer:23.1.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]