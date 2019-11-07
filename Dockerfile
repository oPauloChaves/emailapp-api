FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set a working directory
WORKDIR /usr/src/app

# Install native dependencies
# RUN set -ex; \
#   apk add --no-cache ...

# Install Node.js dependencies
COPY package.json yarn.lock ./

RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
  touch yarn-error.log; \
  yarn install --no-cache --frozen-lockfile; \
  chown -R node:node node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 node_modules /home/node/.cache/yarn; \
  chown -R node:node node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;

# Copy application files
COPY knexfile.js ./
COPY config ./config
COPY db ./db/
COPY server ./server/

# Run the container under "node" user by default
USER node

CMD [ "node", "server/start.js" ]
