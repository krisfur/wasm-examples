import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

const $ = (id) => document.getElementById(id);
const ffmpeg = new FFmpeg();

ffmpeg.on("log", ({ message }) => console.log("[ffmpeg]", message));
ffmpeg.on("progress", ({ progress }) => {
  $("progress").hidden = false;
  $("progress").value = progress;
});

await ffmpeg.load({
  coreURL: `${baseURL}/ffmpeg-core.js`,
  wasmURL: `${baseURL}/ffmpeg-core.wasm`,
});

$("status").textContent = "Ready — pick a video file.";
$("run").disabled = false;

let inputName = null;

$("file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  inputName = file.name;
  $("in").src = URL.createObjectURL(file);
});

$("run").addEventListener("click", async () => {
  const file = $("file").files[0];
  if (!file) return;

  $("run").disabled = true;
  $("status").textContent = "Converting…";

  await ffmpeg.writeFile(inputName, await fetchFile(file));
  await ffmpeg.exec(["-i", inputName, "-c:v", "libx264", "output.mp4"]);
  const data = await ffmpeg.readFile("output.mp4");

  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" }),
  );
  $("out").src = url;
  $("status").textContent = "Done.";
  $("run").disabled = false;
});
