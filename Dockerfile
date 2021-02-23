# Stage 1
FROM node:15 AS s1
WORKDIR /proco
COPY package.json ./
RUN npm install
COPY . .

ARG API_MAPBOX_ACCESS_TOKEN
ENV API_MAPBOX_ACCESS_TOKEN=$API_MAPBOX_ACCESS_TOKEN
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN yarn build

# Stage 2
FROM nginx:alpine AS s2

RUN rm -rf /usr/share/nginx/html/*
COPY --from=s1 /proco/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ngx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
