import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = <{ _: string[], [k: string]: unknown }> yargs(hideBin(process.argv))
  .scriptName("openc")
  .command(
    '<folderName>',
    `Open the project using the preset commands, Similarly ** matching is possible for <folderName>, like project**`
  )
  .command(
    'config',
    'print config'
  )
  .command(
    'openCMD',
    'Setting up the open command when a folder is found, default is \'code $folder\' for vscode. \'idea $folder\' is example for IntelliJ IDEA (Make sure the command \'idea\' is available)'
  )

  .command(
    'workspace add <pathToWorkspace>',
    `Adding a list of folders to find for the \'openc\' command`
  )
  .command(
    'workspace rm <pathToWorkspace>',
    `Remove workspace from config`
  )
  .command(
    'workspace ls',
    `List config workspaces`
  )
  .command(
    'workspace clear',
    `Clear workspaces`
  )

  .command(
    'alias <alias> <originFolderName>',
    `Set an alias for a frequently used folder, so you can open it with the alias next time.`
  )
  .command(
    'alias <alias>',
    `Remove alias`
  )
  .command(
    'alias clear',
    `Clear alias`
  )
  .command(
    'alias print',
    `Print alias`
  )

  .command(
    'ignoreFolders add <matcher>',
    `Set the name of the folder to ignore, default is ["node_modules", ". **"], these folders will be ignored when searching for files.Matching functionality via \'minimatch\'`
  )
  .command(
    'ignoreFolders rm <matcher>',
    `Remove folderName from ignoreList`
  )
  .command(
    'ignoreFolders ls',
    `List ignoreFolders`
  )
  .command(
    'ignoreFolders clear',
    `Clear ignoreFolders`
  )

  .command(
    'workspaceOnly <true|false>',
    `Default is true, setting it to false will cause the \'openc\' command to globally find the folder.`
  )
  .demandCommand()
  .parse()
