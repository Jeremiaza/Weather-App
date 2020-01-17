FROM node:13.6.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "npm", "run", "dev" ]