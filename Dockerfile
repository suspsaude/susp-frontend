FROM node:21-alpine

ARG SUSP_BACKEND_URL="http://localhost:8000"

ENV VITE_SERVER_HOST=${SUSP_BACKEND_URL}

# Create app directory
WORKDIR /app

COPY yarn.lock package.json ./
RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "preview", "--host"]