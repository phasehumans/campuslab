# ---------------------------------------------------------------------------
# Build stage: full C++ toolchain + headers. Also used to compile and run the
# C++ test suites (docker compose service "api-build", see scripts/run_tests.sh).
# ---------------------------------------------------------------------------
FROM ubuntu:24.04 AS build

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

COPY common /app/common
COPY server /app/server

RUN g++ -O2 -std=c++17 \
    -I/app/common \
    -I/app/common/third_party \
    -I/app/server/src \
    /app/server/src/main.cpp \
    -lpqxx -lpq -lhiredis -lcrypt -lssl -lcrypto -lcurl -pthread \
    -o /usr/local/bin/campuslab-api

# ---------------------------------------------------------------------------
# Runtime stage (default): only the shared libraries the API binary links to,
# plus CA certificates for outbound HTTPS (GitHub / Google OAuth) and curl for
# health checks. No compiler or headers.
# ---------------------------------------------------------------------------
FROM ubuntu:24.04 AS runtime

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpqxx-7.8t64 \
    libpq5 \
    libhiredis1.1.0 \
    libssl3t64 \
    libcurl4t64 \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/local/bin/campuslab-api /usr/local/bin/campuslab-api

EXPOSE 3000

CMD ["/usr/local/bin/campuslab-api"]
