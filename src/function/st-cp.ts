import chalk from "chalk";
import {existsSync} from 'fs';
import {platform} from "os";
import {ICopyPathOrFile} from "../interface/i-copy-path-or-file";
import {isDirectory} from "./is-directory";
import {copyPathOrFile as linux} from "./st-cp-linux";
import {copyPathOrFile as windows} from "./st-cp-windows";
import {ICopyPathOrFileOption} from "../interface/i-copy-path-or-file-option";
import {IDestination} from "../interface/i-destination";

const DEFAULT_COPY_PATH_OR_FILE_OPTION: ICopyPathOrFileOption = {
    printInfo: true,
    printWarning: true,
    printError: true
};

export const copyPathOrFile = (sourcePath: string, destination: IDestination, option: ICopyPathOrFileOption = DEFAULT_COPY_PATH_OR_FILE_OPTION): void => {
    try {
        const copy: ICopyPathOrFile = platform() == "win32" ? windows : linux;
        const currentPath = process.cwd();
        sourcePath = copy.resolve(currentPath, sourcePath);

        if (!existsSync(sourcePath)) {
            if (option.printError) {
                console.log(chalk.red("[!] Warning: Source does not exist " + copy.relative(currentPath, sourcePath)));
            }
            return;
        }
        const isFolder = isDirectory(sourcePath);
       const destinationPath = copy.resolve(currentPath, destination.path);

        if (option.printInfo) {
            console.log(chalk.cyan(`[*] Copying ${isFolder ? "folder" : "file"} ${chalk.white(copy.relative(currentPath, sourcePath))} to ${chalk.white(copy.relative(currentPath, destinationPath))}...`));
        }
        copy.copyPathOrFile(sourcePath, {...destination, path: destinationPath }, option);
    } catch (err) {
        if (option.printError) {
            console.log(chalk.red("[!] Warning: ") + err);
        }
    }
};
