import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { relative, resolve } from "path";
import { ICopyPathOrFile } from "../interface/icopy-path-or-file";
import { isDirectory } from "./is-directory";

export const copyPathOrFile: ICopyPathOrFile = {
  resolve,
  relative,
  copyPathOrFile: (sourcePath: string, destinationPath: string): void => {
    let recursive = "p";
    if (isDirectory(destinationPath) || (isDirectory(sourcePath) && !existsSync(destinationPath))) {
      recursive = "rp";
    } else if (existsSync(destinationPath)) {
      console.log(chalk.yellow("Warning: Destination file already exists: " + relative(process.cwd(), destinationPath)));
    }

    execSync(`cp -${recursive} "${sourcePath}" "${destinationPath}"`, { stdio: "inherit" });
  },
};
