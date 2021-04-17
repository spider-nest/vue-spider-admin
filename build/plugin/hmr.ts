import type { Plugin } from "vite";

export default function hmrPlugin(): Plugin {
  return {
    name: "singleHMR",
    handleHotUpdate({ modules, file }) {
      if (file.match(/xml$/)) return [];
      modules.forEach((m) => {
        m.importedModules = new Set();
        m.importers = new Set();
      });
      return modules;
    },
  };
}
