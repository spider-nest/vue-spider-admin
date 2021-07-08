import type { Plugin } from "vite";

import { viteMockServe } from "vite-plugin-mock";

export default function mockPlugin(isBuild: boolean): Plugin {
  return viteMockServe({
    ignore: /^_/,
    mockPath: "./src/mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import buildMock from './mock/_build';

      buildMock();
      `,
  });
}
