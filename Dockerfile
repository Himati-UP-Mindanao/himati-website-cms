FROM node:18.8-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# WORKDIR /home/node/app
# COPY package*.json  ./
# COPY yarn.lock ./

# RUN yarn install --production
# COPY --from=builder /home/node/app/dist ./dist
# COPY --from=builder /home/node/app/build ./build

COPY .env .env

EXPOSE 4000

CMD ["node", "dist/server.js"]
# CMD ["npm", "run", "serve"]
