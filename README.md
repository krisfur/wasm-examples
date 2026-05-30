# WebAssembly: the browser as a compile target

Demos for a video about WebAssembly.

## Whiteboard: when WASM is the right tool

Insert excalidraw link.

- **It's a compile target, not a framework:** You write in another language and compile to a `.wasm` module the browser runs in a sandbox. JavaScript calls into it: the two share one flat block of linear memory.
- **It can't touch the DOM:** Every DOM/Web API call goes through JS glue, so WASM is no faster for UI. The DOM is the bottleneck for everyone.
- **Where it actually wins on speed (the niche):**
  - **Memory-bound:** byte work (image/audio pixels, parsing) - direct linear memory beats bounds-checked typed arrays.
  - **SIMD:** WASM has 128-bit SIMD; JS has no portable explicit SIMD.
  - **No GC / predictable latency:** no garbage-collector pauses in a hot loop.
  - Pure scalar math is **not** a win; JS's JIT is already excellent at it.
- **Where it wins on capability:** run an existing native library or whole program client-side — no server round-trip, no install, cross-platform.

## The demos

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
cd 2-rust-macroquat && bash build-web.sh && npx serve
```
