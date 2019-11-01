import chalk from "chalk";
import { execSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { win32 } from "path";
import { ICopyPathOrFile } from "../interface/icopy-path-or-file";
import { isDirectory } from "./is-directory";

const path = win32;
const resolve = win32.resolve;
const relative = win32.relative;

const extractFileName = (sourcePath: string): string => {
  return path.basename(sourcePath);
};

const appendFileName = (destinationPath: string, fileName: string): string => {
  return destinationPath + path.sep + fileName;
};

export const copyPathOrFile: ICopyPathOrFile = {
  resolve,
  relative,
  copyPathOrFile: (sourcePath: string, destinationPath: string): void => {
    if (isDirectory(sourcePath)) {
      const destinationPathWithOptionalFileName = existsSync(destinationPath) && isDirectory(destinationPath) ? appendFileName(destinationPath, extractFileName(sourcePath)) : destinationPath;

      execSync(`(robocopy "${sourcePath}" "${destinationPathWithOptionalFileName}" /MIR /NFL /NDL /NJH /NJS /nc /ns /np) ^& IF %ERRORLEVEL% LEQ 1 exit 0`, { stdio: "inherit" });
    } else {
      const dirName = path.dirname(destinationPath);

      if (!existsSync(dirName)) {
        mkdirSync(dirName, {
          recursive: true,
        });
      }

      if (existsSync(destinationPath)) {
        if (isDirectory(destinationPath)) {
          copyFileSync(sourcePath, appendFileName(destinationPath, extractFileName(sourcePath)));
        } else {
          console.log(chalk.yellow("Warning: Destination file already exists: " + relative(process.cwd(), destinationPath)));
        }
      } else {
        copyFileSync(sourcePath, destinationPath);
      }
    }
  },
};
