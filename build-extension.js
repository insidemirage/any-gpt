import esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: [path.resolve(__dirname, "./src-ext/extension.ts")],
  outfile: path.resolve(__dirname, "./dist/extension.cjs"),
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  external: ["vscode"],
  sourcemap: true,
  minify: false,
};

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(buildOptions);
}
