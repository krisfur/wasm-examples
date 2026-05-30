// A freestanding WebAssembly module — no std, no runtime, no glue.
// Each `export fn` becomes a function the JavaScript host can call directly.

// Scalar in, scalar out:
export fn add(a: i32, b: i32) i32 {
    return a + b;
}

// JS writes bytes into the module's linear memory, then calls this to sum them:
export fn sum(ptr: [*]const u8, len: usize) u32 {
    var total: u32 = 0;
    for (ptr[0..len]) |b| total += b;
    return total;
}

// Hand the host a pointer into the linear memory it can write into:
var scratch: [256]u8 = undefined;
export fn scratch_ptr() [*]u8 {
    return &scratch;
}
