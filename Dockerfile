FROM node:22-alpine

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/ .

EXPOSE 80

CMD ["npm", "start"]