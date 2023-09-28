FROM node:18.17

WORKDIR /express-app

ENV PORT=4000

COPY package.json package-lock.json /express-app/

RUN npm install 
RUN npm cache clean --force

COPY . .

CMD ["node", "bin/www.js"]
