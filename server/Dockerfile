FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    libasio-dev \
    libcrypt-dev \
    libpqxx-dev \
    libpq-dev \
    libhiredis-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy shared headers and server sources
COPY common /app/common
COPY server /app/server

RUN g++ -O2 -std=c++17 \
    -I/app/common \
    -I/app/common/third_party \
    -I/app/server/src \
    /app/server/src/main.cpp \
    -lpqxx -lpq -lhiredis -lcrypt -lssl -lcrypto -lcurl -pthread \
    -o /usr/local/bin/campuslab-api

EXPOSE 3000

CMD ["/usr/local/bin/campuslab-api"]
