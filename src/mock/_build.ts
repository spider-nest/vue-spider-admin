import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules = import.meta.globEager("./**/*.ts");
const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (!key.includes("/_")) {
    mockModules.push(...modules[key].default);
  }
});

export default function () {
  createProdMockServer(mockModules);
}
