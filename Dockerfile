# builder stage
FROM node:20-alpine as builder

RUN apk add --no-cache libc6-compat
COPY package*.json .
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# production stage
FROM node:20-alpine

RUN addgroup -g 1001 -S nonrootgroup && adduser -u 1001 -S nonroot -G nonrootgroup

COPY --from=builder /app/.next/standalone ./
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV production

ENV PORT 3000
EXPOSE 3000

USER nonroot

CMD ["node","server.js"]
