import fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import clipboard from 'clipboardy';
import chalk from 'chalk';
import { readConfig, writeConfig } from './configFile';

// 扫描文件
// import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'

const argv = <{ _: string[] }> yargs(hideBin(process.argv)).argv;

const [command, ...args] = argv._;

console.log(command, args)

if (!command) {
  chalk.red('required command')
  process.exit(1);
}

if (['workspace', 'alias'].includes(command)) {
  console.log(chalk.cyan(command, ...args))
}

;(async () => {
  const config = await readConfig();
  console.log('config:', config);
})();

