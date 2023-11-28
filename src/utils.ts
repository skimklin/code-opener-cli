import chalk from "chalk";

const isDev = process.env.NODE_ENV === 'development';

export class Log {
  static debug(...messages: any[]) {
    if (isDev) {
      console.log(chalk.gray(...messages))
    }
  }
  static success(...messages: any[]) {
    console.log(chalk.green(...messages))
  }
  static info(...messages: any[]) {
    console.log(chalk.cyan(...messages))
  }
  static error(...messages: any[]) {
    console.log(chalk.red(...messages))
  }
}

export const formatObjectJson = (obj: Record<any, any>) => JSON.stringify(obj, null, 2)