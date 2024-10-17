# Base image
FROM node:20.10-alpine as builder

EXPOSE 3000

RUN apk add --no-cache tini curl

WORKDIR /app

ENTRYPOINT ["/sbin/tini", "--"]

# DEVELOPMENT STAGE
FROM builder as development
ENV NODE_ENV=development

RUN apk add --no-cache git busybox-extras
RUN npm install -g npm@10.2.5

USER node

CMD ["npm", "run", "start:dev"]

# PRODUCTION STAGE
FROM builder as production

ENV NODE_ENV=production

COPY --chown=node package*.json ./
COPY --chown=node node_modules ./node_modules
RUN npm prune --production
COPY --chown=node dist ./dist

USER node

CMD ["npm", "run", "start:prod"]
