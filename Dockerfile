## Setup node and npm on alpine image 
FROM alpine:3.18 AS app-base
RUN apk add --no-cache \
    linux-headers \
    git \
    python3 \
    alpine-sdk \
    libstdc++ \
    tar \
    xz
WORKDIR /usr/local/src
ENV NODE_VERSION=20.1.0
RUN wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.tar.gz
RUN tar -xzf "node-v${NODE_VERSION}.tar.gz"
WORKDIR /usr/local/src/node-v${NODE_VERSION}
RUN ./configure \
    && make -j$(getconf _NPROCESSORS_ONLN) \
    && make install
# Smoke Tests
RUN node --version \
    && npm --version
# Clean up
RUN apk del linux-headers \
    git \
    python3 \
    alpine-sdk \
    && rm -rf /var/cache/apk/* /usr/local/src/node-v${NODE_VERSION}


## Setup the App
FROM app-base AS delivery
WORKDIR /quick-demo-project
COPY package*.json .
COPY . .
RUN npm ci
EXPOSE 3001
CMD ["npm", "start"]