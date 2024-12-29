#!/usr/bin/env bash
set -eu

export FORCE_COLOR=3
bun run lint:fix
sleep 1
bun run format
