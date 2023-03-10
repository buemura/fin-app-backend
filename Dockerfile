FROM node:18
LABEL maintainer="Bruno Uemura"

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run postinstall:prod
RUN npm run build
RUN npm run clean:prod

EXPOSE 5000

CMD ["npm", "start"]
