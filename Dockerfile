# Our Node base image
FROM node:14.16.1

ENV NODE_ENV development

WORKDIR /next-hasura/

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn

COPY / .

EXPOSE 3000
EXPOSE 24678

CMD ["yarn", "dev"]