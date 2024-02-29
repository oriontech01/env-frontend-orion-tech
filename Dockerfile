FROM node:18-alpine as build

WORKDIR /reactapp

COPY package*.json ./

RUN yarn install

COPY . .

#EXPOSE 3000

RUN yarn build

FROM nginx:alpine

COPY --from=build /reactapp/build/ /usr/share/nginx/html
