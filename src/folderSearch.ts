import { OpenerConfig } from "./configFile"
import { execa } from 'execa';
import { Log } from "./utils";

const CMD_HOLDER = '$folder';

export const executeOpenCMD = async (config: OpenerConfig, path: string) => {
  const { openCMD } = config;

  if (openCMD) {
    await execa(openCMD.replaceAll(CMD_HOLDER, path))
  } else {
    await execa('code', [path])
  }
}

export const searchFolder = async (config: OpenerConfig, folder: string) => {
  const { workspaceOnly, alias } = config;
  const folderName = alias[folder] || folder;
  if (workspaceOnly) {
    searchWorkspace(config, folderName);
  } else {
    searchGlobally(config, folderName);
  }
}

export const searchGlobally = (config: OpenerConfig, folderName: string) => {
  const { workspaces, ignoreFolders } = config;
  Log.debug(folderName);
}

export const searchWorkspace = (config: OpenerConfig, folderName: string) => {
  const { workspaces, ignoreFolders } = config;
  Log.debug(folderName);
}