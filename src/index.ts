import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { SETTING_COMMANDS, changeConfig, readConfig, writeConfig } from './configFile';
import { Log, formatObjectJson } from './utils';
import { executeOpenCMD, searchFolder } from './folderSearch';
import path from 'path';

const argv = <{ _: string[] }> yargs(hideBin(process.argv)).argv;

const [command, ...args] = argv._;

if (!command) {
  Log.error('required command')
  process.exit(1);
}

Log.info(
  formatObjectJson(path.parse(process.cwd()))
)

;(async () => {
  const config = await readConfig();
  Log.debug('config:', formatObjectJson(config));

  if (SETTING_COMMANDS.includes(command)) {
    Log.debug(command, ...args);
    changeConfig(command, ...args)
  }

  const folderName = command;
  searchFolder(config, folderName);
})();

