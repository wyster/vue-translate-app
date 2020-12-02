ARG FRONTEND_ENV
ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-slim

COPY . /app
RUN echo "${FRONTEND_ENV}" > /app/.env
WORKDIR /app

RUN npm install
RUN npm run build
RUN npm install --production

CMD ["npm", "start"]

EXPOSE 80
