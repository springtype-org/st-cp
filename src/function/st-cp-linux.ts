
const chalk = require("chalk");
import { execSync } from "child_process";
import { existsSync } from "fs";
import { relative, resolve, sep } from "path";
import { ICopyPathOrFile } from "../interface/i-copy-path-or-file";
import { isDirectory } from "./is-directory";
import { ICopyPathOrFileOption } from "../interface/i-copy-path-or-file-option";
import { IDestination } from "../interface/i-destination";


export const copyPathOrFile: ICopyPathOrFile = {
    resolve,
    relative,
    copyPathOrFile: (sourcePath: string, destination: IDestination, option: ICopyPathOrFileOption): void => {
        const destinationPath = destination.path;
        let recursive = "p";
        if (destination.isDirectory || (isDirectory(sourcePath) && !existsSync(destinationPath))) {
            recursive = "rp";
        } else if (existsSync(destinationPath)) {
            if (option.printWarning) {
                console.log(chalk.yellow("[!] Warning: Destination file already exists: " + relative(process.cwd(), destinationPath)));
            }
        }

        execSync(`cp -${recursive} "${sourcePath}" "${destinationPath}"`, { stdio: "inherit" });
    },
};
