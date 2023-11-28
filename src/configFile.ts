import chalk from 'chalk';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

export interface Commands {
  workspace: '';
  alias: '';
  lookForWorkspaceOnly: boolean;
}

export interface OpenerConfig {
  workspaces: string[];
  alias: Record<string, string>;
  lookForWorkspaceOnly: boolean;
  openCMD?: string;
}

const defaultConfig: OpenerConfig = {
  workspaces: [],
  alias: {},
  lookForWorkspaceOnly: false,
}

const CONFIG_FILE_NAME = '.code_opener_config.json';
const CONFIG_PATH = path.resolve(os.homedir(), CONFIG_FILE_NAME);

export const readConfig = async (): Promise<OpenerConfig> => {
  // initial config file
  if (!await fs.pathExists(CONFIG_PATH)) {
    console.log(chalk.gray('config file not exist'));
    await resetConfig();
  }
  const fileString = await fs.readFile(CONFIG_PATH, { encoding: 'utf8' });
  const configJson = JSON.parse(fileString);
  return Object.assign({}, defaultConfig, configJson);
}

export const writeConfig = async (userConfig: Partial<OpenerConfig>) => {
  const config = await readConfig();
  const newConfig = Object.assign({}, config, userConfig);
  await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig), 'utf8');
  console.log(chalk.green(`success update config file: ${CONFIG_PATH}`));
}

export const resetConfig = async() => {
  const defaultConfigJson = JSON.stringify(defaultConfig);
  await fs.writeFile(CONFIG_PATH, defaultConfigJson, 'utf8');
  console.log(chalk.green(`write config file to: ${CONFIG_PATH}`));
}