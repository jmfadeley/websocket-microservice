# node image
FROM node:8.16.0-alpine as builder

#set /app directory as default working directory
WORKDIR /app/
COPY . /app/

# Run npm
RUN npm ci
RUN npm run build

# RUN yarn install --pure-lockfile
# RUN yarn build
# RUN yarn install --production --frozen-lockfile

FROM node:8.16.0-alpine

WORKDIR /app/
COPY --chown=node --from=builder /app/ /app/
# RUN mkdir /app/node_modules/.cache

# expose port 3000
EXPOSE 3000

# RUN chown -R node /app/node_modules/.cache
USER node

# cmd to start service
CMD ["npm", "run", "start"]
