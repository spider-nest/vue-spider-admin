import type { Plugin } from "vite";

import compressionPlugin from "vite-plugin-compression";

export default function compressPlugin(
  compress: "gzip" | "brotli" | "none",
  filter = /\.(js|json|css|html|ttf)$/i,
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(",");
  const plugins: Plugin[] = [];

  if (compressList.includes("gzip")) {
    plugins.push(
      compressionPlugin({
        ext: ".gz",
        filter,
        deleteOriginFile,
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressionPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        filter,
        deleteOriginFile,
      })
    );
  }

  return plugins;
}
