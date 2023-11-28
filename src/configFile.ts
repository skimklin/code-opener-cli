import chalk from 'chalk';
import fs from 'fs-extra';
import _ from 'lodash';
import os from 'os';
import path from 'path';
import { Log, formatObjectJson } from './utils';

export const SETTING_COMMANDS = [
  'workspace',
  'alias',
  'workspaceOnly',
  'ignoreFolders',
  'openCMD',
  'config',
]

export interface OpenerConfig {
  workspaces: string[];
  alias: Record<string, string>;
  workspaceOnly: boolean;
  ignoreFolders: string[];
  openCMD?: string;
}

const defaultConfig: OpenerConfig = {
  workspaces: [],
  alias: {},
  ignoreFolders: ["node_modules",".git",".vscode",".DS_Store"],
  workspaceOnly: false,
}

const CONFIG_FILE_NAME = '.code-opener-config.json';
const CONFIG_PATH = path.resolve(os.homedir(), CONFIG_FILE_NAME);

export const readConfig = async (): Promise<OpenerConfig> => {
  // initial config file
  if (!await fs.pathExists(CONFIG_PATH)) {
    Log.debug('config file not exist');
    await resetConfig();
  }
  const fileString = await fs.readFile(CONFIG_PATH, { encoding: 'utf8' });
  const configJson = JSON.parse(fileString);

  return _.merge({}, defaultConfig, configJson);
}

export const writeConfig = async (userConfig: Partial<OpenerConfig>) => {
  const config = await readConfig();
  const newConfig = Object.assign({}, config, userConfig);
  await fs.writeFile(CONFIG_PATH, formatObjectJson(newConfig), 'utf8');
  Log.success(`success update config file: ${CONFIG_PATH}`);
}

export const resetConfig = async() => {
  const defaultConfigJson = formatObjectJson(defaultConfig);
  await fs.writeFile(CONFIG_PATH, defaultConfigJson, 'utf8');
  Log.success(`write config file to: ${CONFIG_PATH}`);
}

export const changeConfig = async (configKey: string, ...args: string[]) => {
  const handlers: Record<string, (oldConfig: OpenerConfig) => Promise<void>> = {
    config: async (oldConfig: OpenerConfig) => {
      Log.info(formatObjectJson(oldConfig));
    },
    workspace: async (oldConfig: OpenerConfig) => {
      const [operate, ...params] = args;
      let workspaces = _.cloneDeep(oldConfig.workspaces);
      switch (operate) {
        case 'ls':
          Log.info(workspaces.join(os.EOL));
          break;
        case 'clear':
          workspaces = _.cloneDeep(defaultConfig.workspaces);
          break;
        case 'add':
          workspaces.push(...params);
          break;
        case 'rm':
          workspaces = workspaces.filter(e => e !== params[0]);
          break;
        default:
          break;
      }
      await writeConfig({ workspaces: _.uniq(workspaces) });
    },
    alias: async (oldConfig: OpenerConfig) => {
      const [operate, alternate] = args;
      let oldAlias = _.cloneDeep(oldConfig.alias);
      switch (operate) {
        case 'print':
          Log.info(formatObjectJson(oldAlias));
          break;
        case 'clear':
          oldAlias = _.cloneDeep(defaultConfig.alias);
          break;
        default:
          if (!alternate) {
            Log.info(oldAlias[operate]);
            return;
          }

          oldAlias[alternate] = operate;
          break;
      }
      await writeConfig({ alias: oldAlias });
    },
    workspaceOnly: async () => {
      const [workspaceOnlyFlag] = args;
      await writeConfig({ workspaceOnly: Boolean(workspaceOnlyFlag) && workspaceOnlyFlag !== 'false' });
    },
    ignoreFolders: async (oldConfig: OpenerConfig) => {
      const [operate, ...params] = args;
      let folders = _.cloneDeep(oldConfig.ignoreFolders);
      switch (operate) {
        case 'ls':
          Log.info(folders.join(os.EOL));
          return;
        case 'clear':
          folders = _.cloneDeep(defaultConfig.ignoreFolders);
          break;
        case 'add':
          folders.push(...params);
          break;
        case 'rm':
          folders = folders.filter(e => e !== params[0]);
          break;
        default:
          break;
      }
      await writeConfig({ ignoreFolders: _.uniq(folders) });
    },
    openCMD: async () => {
      const [operate = ''] = args;
      await writeConfig({ openCMD: operate });
    },
  };
  const handler = handlers[configKey];
  if (handler) {
    const config = await readConfig();
    await handler(config);
  }
}