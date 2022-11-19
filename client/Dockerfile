FROM node:16.13.1 as dependencies
WORKDIR /my-project
COPY package.json ./
RUN npm install

FROM node:16.13.1 as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN npm run build

FROM node:16.13.1  as runner
WORKDIR /my-project

COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/build ./build
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]