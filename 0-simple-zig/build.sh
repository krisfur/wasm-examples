#!/bin/sh
zig build-exe src/main.zig \
  -target wasm32-freestanding \
  -fno-entry -rdynamic \
  -O ReleaseSmall \
  --name simple

echo "built simple.wasm ($(wc -c < simple.wasm | tr -d ' ') bytes)"
