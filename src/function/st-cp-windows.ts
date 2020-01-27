import chalk from "chalk";
import {execSync} from "child_process";
import {copyFileSync, existsSync, mkdirSync} from "fs";
import {win32} from "path";
import {ICopyPathOrFile} from "../interface/i-copy-path-or-file";
import {isDirectory} from "./is-directory";
import {ICopyPathOrFileOption} from "../interface/i-copy-path-or-file-option";
import {IDestination} from "../interface/i-destination";

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
    copyPathOrFile: (sourcePath: string, destination: IDestination, option: ICopyPathOrFileOption): void => {
        const destinationPath = destination.path;
        if (isDirectory(sourcePath)) {
            const destinationPathWithOptionalFileName = existsSync(destinationPath) && isDirectory(destinationPath) ? appendFileName(destinationPath, extractFileName(sourcePath)) : destinationPath;

            execSync(`(robocopy "${sourcePath}" "${destinationPathWithOptionalFileName}" /MIR /NFL /NDL /NJH /NJS /nc /ns /np) ^& IF %ERRORLEVEL% LEQ 1 exit 0`, {stdio: "inherit"});
        } else {
            const dirName = destination.isDirectory ? destinationPath : path.dirname(destinationPath);
            if (!existsSync(dirName)) {
                mkdirSync(dirName, {
                    recursive: true,
                });
            }

            if (existsSync(destinationPath)) {
                if (destination.isDirectory) {
                    copyFileSync(sourcePath, appendFileName(destinationPath, extractFileName(sourcePath)));
                } else {
                    if (option.printWarning) {
                        console.log(chalk.yellow("[!] Warning: Destination file already exists: " + relative(process.cwd(), destinationPath)));
                    }
                }
            } else {
                copyFileSync(sourcePath, destinationPath);
            }
        }
    },
};
