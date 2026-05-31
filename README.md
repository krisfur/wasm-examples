# WebAssembly: the browser as a compile target

Demos for a video about WebAssembly.

## Whiteboard: when WASM is the right tool

[Excalidraw link](https://excalidraw.com/#json=RgzU6HNXSu2EqqOtmPE_y,UXElX7CLSqeVRVGOmYkOPw).

## Demos

| Folder | Language | Toolchain |
| --- | --- | --- |
| `0-simple-zig/` | Zig | `zig build-exe -target wasm32-freestanding` |
| `1-ffmpeg-wasm/` | C (prebuilt) + JS | `@ffmpeg/ffmpeg` |
| `2-rust-macroquad/` | Rust | `cargo` (native) / `wasm32-unknown-unknown` (web) |

## Prerequisites

- [`zig`](https://ziglang.org) 0.16+ — for demo 0
- [`pnpm`](https://pnpm.io) — for demo 1
- [`rustup`](https://rustup.rs) with `rustup target add wasm32-unknown-unknown` for demo 2 (also needs `rustup component add llvm-tools` for the `rust-lld` wasm linker)

## Running

0. Zig

```bash
cd 0-simple-zig && sh build.sh && npx serve
```

1. Ffmpeg.wasm

```bash
cd 1-ffmpeg-wasm && pnpm install && pnpm dev
```

2. Rust + macroquad

desktop:

```bash
cd 2-rust-macroquad && cargo run
```

web:

```bash
cd 2-rust-macroquad && bash build-web.sh && npx serve
```
