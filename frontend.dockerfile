# Build
FROM node:18 AS nodeBuild
ENV NODE_ENV=production

WORKDIR /app

COPY "./../App/client/package.json" .
COPY "./../App/client/package-lock.json" .

RUN npm install --production

COPY ./App/client .

RUN npm run build

# Run
FROM nginx:1.23.1-alpine
COPY --from=nodeBuild /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx.conf /etc/nginx/conf.d

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]