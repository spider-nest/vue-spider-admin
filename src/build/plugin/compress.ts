import type { Plugin } from "vite";

import compressionPlugin from "vite-plugin-compression";

export default function compressPlugin(): Plugin | Plugin[] {
  const plugins: Plugin[] = [];
  const filter = /\.(js|json|css|html|ttf)$/i;
  const deleteOriginFile = false;

  // gzip
  plugins.push(
    compressionPlugin({
      ext: ".gz",
      filter,
      deleteOriginFile,
    })
  );

  // brotli
  plugins.push(
    compressionPlugin({
      ext: ".br",
      algorithm: "brotliCompress",
      filter,
      deleteOriginFile,
    })
  );

  return plugins;
}
