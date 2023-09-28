FROM node:18.17

WORKDIR /graphql

ENV PORT=4001

COPY package.json package-lock.json /graphql/

RUN npm install 
RUN npm cache clean --force

COPY . .

CMD ["node", "index.js"]
