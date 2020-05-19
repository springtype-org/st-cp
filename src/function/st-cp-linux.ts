const chalk = require("chalk");
import {execSync} from "child_process";
import {existsSync, mkdirSync} from "fs";
import {relative, resolve, sep} from "path";
import {ICopyPathOrFile} from "../interface/i-copy-path-or-file";
import {isDirectory} from "./is-directory";
import {ICopyPathOrFileOption} from "../interface/i-copy-path-or-file-option";
import {IDestination} from "../interface/i-destination";


export const copyPathOrFile: ICopyPathOrFile = {
    resolve,
    relative,
    copyPathOrFile: (sourcePath: string, destination: IDestination, option: ICopyPathOrFileOption): void => {
        const destinationPath = destination.path;

        //create folder if not exist
        if (destination.isDirectory) {
            if (!existsSync(destinationPath)) {
                mkdirSync(destinationPath, {
                    recursive: true,
                });
            }
        } else {
            if (destinationPath.indexOf(sep) > 0) {
                mkdirSync(destinationPath.substring(0, destinationPath.lastIndexOf(sep)), {
                    recursive: true,
                })
            }
        }

        let recursive = "p";
        if (destination.isDirectory || (isDirectory(sourcePath) && !existsSync(destinationPath))) {
            recursive = "rp";
        } else if (existsSync(destinationPath)) {
            if (option.printWarning) {
                console.log(chalk.yellow("[!] Warning: Destination file already exists: " + relative(process.cwd(), destinationPath)));
            }
        }

        execSync(`cp -${recursive} "${sourcePath}" "${destinationPath}"`, {stdio: "inherit"});

    }
};
