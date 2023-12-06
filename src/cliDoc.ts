import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = <{ _: string[], [k: string]: unknown }> yargs(hideBin(process.argv))
  .scriptName("")
  .usage('Usage: openc <folderName>')
  .command(
    'openc <folderName>',
    `Open the project using the preset commands, Similarly ** matching is possible for <folderName>, like project**`
  )
  .command(
    'openc config',
    'print config'
  )
  .command(
    'openc openCMD',
    'Setting up the open command when a folder is found, default is \'code $folder\' for vscode. \'idea $folder\' is example for IntelliJ IDEA (Make sure the command \'idea\' is available)'
  )

  .command(
    'openc workspace add <pathToWorkspace>',
    `Adding a list of folders to find for the \'openc\' command`
  )
  .command(
    'openc workspace rm <pathToWorkspace>',
    `Remove workspace from config`
  )
  .command(
    'openc workspace ls',
    `List config workspaces`
  )
  .command(
    'openc workspace clear',
    `Clear workspaces`
  )

  .command(
    'openc alias <alias> [originFolderName]',
    `Set an alias for a frequently used folder, so you can open it with the alias next time.Empty means remove.`
  )
  .command(
    'openc alias clear',
    `Clear alias`
  )
  .command(
    'openc alias print',
    `Print alias`
  )

  .command(
    'openc ignoreFolders add <matcher>',
    `Set the name of the folder to ignore, default is ["node_modules", ". **"], these folders will be ignored when searching for files.Matching functionality via \'minimatch\'`
  )
  .command(
    'openc ignoreFolders rm <matcher>',
    `Remove folderName from ignoreList`
  )
  .command(
    'openc ignoreFolders ls',
    `List ignoreFolders`
  )
  .command(
    'openc ignoreFolders clear',
    `Clear ignoreFolders`
  )

  .command(
    'openc workspaceOnly <true|false>',
    `Default is true, setting it to false will cause the \'openc\' command to globally find the folder.`
  )
  .demandCommand()
  .help()
  .argv;
