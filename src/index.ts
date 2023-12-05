import { SETTING_COMMANDS, changeConfig, readConfig, writeConfig } from './configFile';
import { Log, formatObjectJson } from './utils';
import { searchFolder } from './folderSearch';
import { argv } from './cliDoc';

const [command, ...args] = argv._;

;(async () => {
  const config = await readConfig();
  Log.debug('config:', formatObjectJson(config));

  if (SETTING_COMMANDS.includes(command)) {
    Log.debug(command, ...args);
    changeConfig(command, ...args);
    return;
  }

  const folderName = command;
  searchFolder(config, folderName);
})();

