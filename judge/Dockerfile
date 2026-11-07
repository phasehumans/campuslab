FROM ubuntu:24.04

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

# Clone and install isolate
RUN git clone --depth=1 https://github.com/ioi/isolate.git /tmp/isolate && \
    cd /tmp/isolate && \
    make install && \
    rm -rf /tmp/isolate

# Configure isolate to use explicit UID/GID range
RUN sed -i 's/^subid_user = isolate/# subid_user = isolate/' /usr/local/etc/isolate && \
    sed -i 's/^# first_uid = 60000/first_uid = 60000/' /usr/local/etc/isolate && \
    sed -i 's/^# first_gid = 60000/first_gid = 60000/' /usr/local/etc/isolate && \
    sed -i 's/^# num_boxes = 1000/num_boxes = 1000/' /usr/local/etc/isolate

WORKDIR /app

# Copy common headers and judge sources
COPY common /app/common
COPY judge /app/judge

RUN g++ -O2 -std=c++17 \
    -I/app/common \
    -I/app/common/third_party \
    -I/app/judge/src \
    /app/judge/src/main.cpp \
    -lpqxx -lpq -lhiredis -pthread \
    -o /usr/local/bin/campuslab-judge

CMD ["/usr/local/bin/campuslab-judge"]
