// Using the browser's built-in WebAssembly API.

const { instance } = await WebAssembly.instantiateStreaming(
  fetch("./simple.wasm"),
);

// Holds the functions marked `export fn`, plus the module's linear memory.
const { add, sum, scratch_ptr, memory } = instance.exports;

// scalar call
const $ = (id) => document.getElementById(id);

$("add").addEventListener("click", () => {
  const result = add(Number($("a").value), Number($("b").value));
  $("addOut").textContent = result;
});

// shared linear memory
// `memory.buffer` is an ArrayBuffer the module and JS both point at.
// Ask the module where its scratch buffer lives, write bytes there, then call sum().
$("sum").addEventListener("click", () => {
  const bytes = $("bytes")
    .value.split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n));

  const ptr = scratch_ptr();
  const view = new Uint8Array(memory.buffer, ptr, bytes.length);
  view.set(bytes);

  $("sumOut").textContent = sum(ptr, bytes.length);
});
