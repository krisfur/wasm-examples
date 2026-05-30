#!/bin/sh
cargo build --target wasm32-unknown-unknown --release

cp target/wasm32-unknown-unknown/release/macroquad-demo.wasm ./macroquad-demo.wasm
echo "built macroquad-demo.wasm ($(wc -c < macroquad-demo.wasm | tr -d ' ') bytes)"
