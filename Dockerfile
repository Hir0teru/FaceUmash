FROM node:16.14.2-alpine
WORKDIR /app/

COPY ./app/package.json ./app/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./app/ ./

CMD [ "yarn", "build" ]