# Local build stage
FROM node:22-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL:-http://backend:8000}
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

USER node
CMD ["node", "server.js"]
