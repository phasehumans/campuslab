#!/bin/sh
# Judge container start-up.
#
# isolate's --cg mode gives real memory limits and lets multi-threaded runtimes
# (Node, Ruby) run under a process limit. It needs cgroup v2 with the memory and
# pids controllers delegated to a dedicated subtree. cgroup v2 forbids enabling
# controllers for children of a cgroup that still has processes, so first move
# every process in the container's root cgroup into an "init" child, then hand
# a separate "isolate" subtree to isolate.
#
# Falls back to address-space limits when cgroup v2 isn't available (e.g. Docker
# on WSL with cgroup v1); the judge reads ISOLATE_CG to decide.

set -u
ISOLATE_CG=0
CG=/sys/fs/cgroup

if [ "$(stat -fc %T "$CG" 2>/dev/null)" = "cgroup2fs" ] && [ -w "$CG/cgroup.subtree_control" ]; then
    mkdir -p "$CG/init"
    for pid in $(cat "$CG/cgroup.procs"); do
        echo "$pid" > "$CG/init/cgroup.procs" 2>/dev/null || true
    done
    if echo "+memory +pids" > "$CG/cgroup.subtree_control" 2>/dev/null; then
        mkdir -p "$CG/isolate"
        if echo "+memory +pids" > "$CG/isolate/cgroup.subtree_control" 2>/dev/null; then
            sed -i "s|^cg_root = .*|cg_root = $CG/isolate|" /usr/local/etc/isolate
            ISOLATE_CG=1
        fi
    fi
fi

if [ "$ISOLATE_CG" = "1" ]; then
    echo "[entrypoint] cgroup v2 ready: isolate runs with real memory limits"
else
    echo "[entrypoint] cgroup v2 not available: isolate falls back to address-space limits"
fi

export ISOLATE_CG
exec /usr/local/bin/campuslab-judge
