import chalk from "chalk";
import { existsSync } from 'fs';
import { platform } from "os";
import { ICopyPathOrFile } from "../interface/icopy-path-or-file";
import { isDirectory } from "./is-directory";
import { copyPathOrFile as linux } from "./st-cp-linux";
import { copyPathOrFile as windows } from "./st-cp-windows";

export const copyPathOrFile = (sourcePath: string, destinationPath: string, printError: boolean = true): void => {
  try {
    const copy: ICopyPathOrFile = platform() == "win32" ? windows : linux;
    const currentPath = process.cwd();
    sourcePath = copy.resolve(currentPath, sourcePath);

    if (!existsSync(sourcePath)) {
      console.log(chalk.yellow("Warning: Source does not exist " + copy.relative(currentPath, sourcePath)));
    }
    const isFolder = isDirectory(sourcePath);

    destinationPath = copy.resolve(currentPath, destinationPath);

    console.log(chalk.cyan(`Copying ${isFolder ? "folder" : "file"} ${chalk.white(copy.relative(currentPath, sourcePath))} to ${chalk.white(copy.relative(currentPath, destinationPath))}...`));
    copy.copyPathOrFile(sourcePath, destinationPath);
  } catch (err) {
    if (printError) {
      console.log(chalk.yellow("Warning: ") + err);
    }
  }
};
