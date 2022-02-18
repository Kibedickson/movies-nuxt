FROM node:16-alpine as build

WORKDIR /var/www/movies-nuxt

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:16-alpine

WORKDIR /var/www/movies-nuxt

COPY --from=builder /var/www/movies-nuxt  .

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]