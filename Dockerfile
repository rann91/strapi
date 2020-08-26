FROM node:12
USER node
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .
ENV NODE_ENV="production"
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]