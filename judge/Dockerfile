# ---------------------------------------------------------------------------
# Build stage: toolchain + headers, builds isolate and the judge worker. Also
# used to compile and run the judge C++ test suites (docker compose service
# "judge-build", see scripts/run_tests.sh).
# ---------------------------------------------------------------------------
FROM ubuntu:24.04 AS build

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    make \
    git \
    libcap-dev \
    libseccomp-dev \
    libsystemd-dev \
    libpqxx-dev \
    libpq-dev \
    libhiredis-dev \
    libssl-dev \
    ca-certificates \
    curl \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Build and install isolate
RUN git clone --depth=1 https://github.com/ioi/isolate.git /tmp/isolate && \
    cd /tmp/isolate && \
    make install && \
    rm -rf /tmp/isolate

# Configure isolate to use an explicit UID/GID range
RUN sed -i 's/^subid_user = isolate/# subid_user = isolate/' /usr/local/etc/isolate && \
    sed -i 's/^# first_uid = 60000/first_uid = 60000/' /usr/local/etc/isolate && \
    sed -i 's/^# first_gid = 60000/first_gid = 60000/' /usr/local/etc/isolate && \
    sed -i 's/^# num_boxes = 1000/num_boxes = 1000/' /usr/local/etc/isolate

WORKDIR /app

COPY common /app/common
COPY judge /app/judge

RUN g++ -O2 -std=c++17 \
    -I/app/common \
    -I/app/common/third_party \
    -I/app/judge/src \
    /app/judge/src/main.cpp \
    -lpqxx -lpq -lhiredis -pthread \
    -o /usr/local/bin/campuslab-judge

# Node.js runtime for JavaScript / TypeScript submissions (only the node binary is
# copied: no npm/corepack). 22.x runs .ts directly with --experimental-strip-types.
FROM node:22.12.0-bookworm-slim AS node

# ---------------------------------------------------------------------------
# Runtime stage (default): the judge worker, isolate, and the toolchains student
# code needs. No git, headers for the judge's own dependencies, or make.
#   C / C++      g++ / gcc (static libc + libstdc++)
#   Python 3     python3 (no recommends)
#   Lua 5.4      lua5.4 (also provides luac5.4 for syntax checks)
#   Perl 5       perl-base, already part of the Ubuntu base image
#   Ruby 3       ruby (no recommends)
#   JS / TS      node binary from the official image above
# ---------------------------------------------------------------------------
FROM ubuntu:24.04 AS runtime

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    python3 \
    lua5.4 \
    ruby \
    libpqxx-7.8t64 \
    libpq5 \
    libhiredis1.1.0 \
    libcap2 \
    libseccomp2 \
    libsystemd0 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/local/bin/campuslab-judge /usr/local/bin/campuslab-judge
COPY --from=build /usr/local/bin/isolate /usr/local/bin/isolate
COPY --from=build /usr/local/bin/isolate-check-environment /usr/local/bin/isolate-check-environment
COPY --from=build /usr/local/sbin/isolate-cg-keeper /usr/local/sbin/isolate-cg-keeper
COPY --from=build /usr/local/etc/isolate /usr/local/etc/isolate
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY judge/entrypoint.sh /usr/local/bin/judge-entrypoint
RUN mkdir -p /var/local/lib/isolate && chmod 4755 /usr/local/bin/isolate && chmod 755 /usr/local/bin/judge-entrypoint

CMD ["/usr/local/bin/judge-entrypoint"]
