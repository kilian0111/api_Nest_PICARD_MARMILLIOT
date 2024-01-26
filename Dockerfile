# Utilisez une image Node.js officielle comme image de base
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install -g pnpm
RUN pnpm install
CMD [ "pnpm", "run", "start:debug"]