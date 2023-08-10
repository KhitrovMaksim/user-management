FROM node:18.13.0-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --omit=dev

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:prod"]
