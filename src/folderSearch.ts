import { OpenerConfig } from "./configFile"
import { execa } from 'execa';
import { Log, formatObjectJson } from "./utils";
import fs from 'fs-extra';
import { minimatch } from 'minimatch'
import os from 'os';
import path from 'path';
import _ from "lodash";
import { select } from '@inquirer/prompts';
import systemInfo from 'systeminformation';

const CMD_HOLDER = '$folder';

export const executeOpenCMD = async (config: OpenerConfig, path: string) => {
  const { openCMD } = config;

  const command = openCMD ? openCMD.replaceAll(CMD_HOLDER, path) : `code ${path}`;
  Log.info(`executing command: ${command}`);
  await execa(command);
}

export const handleFindResult = async (originSearchString: string, config: OpenerConfig, findFolders?: string[]) => {
  if (!findFolders?.length) {
    Log.error(`${originSearchString} not found`);
    return;
  }
  const targetFolder = findFolders.length === 1
    ? findFolders[0]
    : (await select({
        message: 'Which folder do you wish to open?',
        choices: findFolders.map(value => ({value})),
      }))
  if (targetFolder) {
    executeOpenCMD(config, targetFolder)
  }
}

export const searchFolder = async (config: OpenerConfig, folder: string) => {
  const { workspaceOnly, alias } = config;
  const folderName = alias[folder] || folder;
  Log.debug(folderName);
  if (workspaceOnly) {
    searchWorkspace(config, folderName);
  } else {
    searchGlobally(config, folderName);
  }
}

export const searchGlobally = async (config: OpenerConfig, folderName: string) => {
  const { ignoreFolders } = config;
  Log.debug(folderName);
  const rootDirs = await getRootDirs();
  const results: string[] = [];
  const folderMatcher = (folder: FolderItem) => {
    if (minimatch(folder.currentFolder, folderName)) {
      results.push(folder.fullPath);
    }
  }
  await bfsTravelFolder(
    rootDirs,
    folderMatcher,
    (folder) => ignoreFolders.some(e => minimatch(folder, e))
  );
  handleFindResult(folderName, config, results);
}

interface FolderItem {
  fullPath: string;
  currentFolder: string;
}

export const searchWorkspace = async (config: OpenerConfig, folderName: string) => {
  const { workspaces, ignoreFolders } = config;
  const results: string[] = [];
  const folderMatcher = (folder: FolderItem) => {
    if (minimatch(folder.currentFolder, folderName)) {
      results.push(folder.fullPath);
    }
  }
  await bfsTravelFolder(
    workspaces,
    folderMatcher,
    (folder) => ignoreFolders.some(e => minimatch(folder, e))
  );
  handleFindResult(folderName, config, results);
}


export const bfsTravelFolder = async (
  folderPathList: string[],
  callback: (folder: FolderItem) => void,
  shouldIgnore: (folder: string) => boolean) => {
  const folders = _.flattenDeep(await Promise.all(folderPathList.map(async folderPath => {
    try {
      const underlayFolder = await fs.readdir(folderPath, { withFileTypes: true })
      return underlayFolder.filter(e => e.isDirectory() && !shouldIgnore(e.name)).map(e => ({
        fullPath: path.resolve(e.path, e.name),
        currentFolder: e.name,
      }))
    } catch (error) {
      Log.error(error)
      return []
    }
  })))
  folders.forEach(folder => {
    callback(folder);
  })
  if (folders.length > 0) {
    await bfsTravelFolder(folders.map(e => e.fullPath), callback, shouldIgnore);
  }
}

export const getRootDirs = async () => {
  const isWin = os.platform() === 'win32';
  const roots = isWin ? (await systemInfo.blockDevices()).slice(1).map(e => `${e.identifier}${path.sep}`) : ['/'];
  return roots;
}
