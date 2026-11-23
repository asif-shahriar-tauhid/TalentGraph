# Runs the TypeScript sources with tsx (same as `npm start`): tsc output uses
# extensionless ESM imports, and EJS templates are read from src/app/templates.
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:24-alpine
ENV NODE_ENV=production PORT=5000
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" > /dev/null || exit 1
CMD ["node", "--import", "tsx", "src/server.ts"]
