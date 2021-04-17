import chalk from "chalk";
import fs, { writeFileSync } from "fs-extra";

import pkg from "../package.json";
import { getRootPath, getEnvConfig, getConfigFileName } from "./utils";

export const GLOB_CONFIG_FILE_NAME = "_app.config.js";

export const OUTPUT_DIR = "dist";

function createConfig(
  {
    configName,
    config,
    configFileName = GLOB_CONFIG_FILE_NAME,
  }: { configName: string; config: any; configFileName?: string } = {
    configName: "",
    config: {},
  }
) {
  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, "");
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(
      chalk.cyan(`✨ [${pkg.name}]`) +
        ` - configuration file is build successfully:`
    );
    console.log(
      chalk.gray(`${OUTPUT_DIR}/${chalk.green(configFileName)}`) + "\n"
    );
  } catch (error) {
    console.log(
      chalk.red(
        "configuration file configuration file failed to package:\n" + error
      )
    );
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName });
}
