
# builder stage
FROM node:20-alpine as builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package*.json .
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# production stage
FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nonrootgroup && adduser -u 1001 -S nonroot -G nonrootgroup

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV production

ENV PORT 3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

USER nonroot

CMD ["node", "server.js"]