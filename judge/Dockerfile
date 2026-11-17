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

# ---------------------------------------------------------------------------
# Runtime stage (default): the judge worker, isolate, and the compilers students'
# code needs (g++/gcc with static libc/libstdc++). No git, headers for the judge's
# own dependencies, or make.
# ---------------------------------------------------------------------------
FROM ubuntu:24.04 AS runtime

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
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
RUN mkdir -p /var/local/lib/isolate && chmod 4755 /usr/local/bin/isolate

CMD ["/usr/local/bin/campuslab-judge"]
