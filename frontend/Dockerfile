FROM node:13.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install --silent
CMD ["npm", "start"]