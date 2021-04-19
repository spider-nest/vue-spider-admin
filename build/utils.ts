import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function isReportMode(): boolean {
  return process.env.REPORT === "true";
}

export function getEnvConfig(
  match = "VITE_",
  confFiles = [".env", ".env.production"]
) {
  let envConfig = {};
  confFiles.map((item) => {
    try {
      const env = dotenv.parse(
        fs.readFileSync(path.resolve(process.cwd(), item))
      );
      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });

  Object.keys(envConfig).map((key) => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_APP_SHORTNAME || "__APP"}__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
};

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }

    ret[envName] = realName;
    process.env[envName] = realName;
  }

  return ret;
}
