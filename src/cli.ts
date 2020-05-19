#!/usr/bin/env node
import {isDirectory} from "./function/is-directory";

const chalk = require("chalk");
import { copyPathOrFile } from "./function/st-cp";
import {existsSync} from "fs";

const sourcePaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const destinationPath = sourcePaths.pop() || "";

(async () => {
    if (sourcePaths.length == 0) {
        console.log("[*] Nothing to copy.");
    } else {
        const length = sourcePaths.length;
        const isDestinationDirectory = length > 1 || destinationPath.endsWith('/') ||  existsSync(destinationPath) && isDirectory(destinationPath);
        console.log(chalk.cyan(`Copying ${length} ${length == 1 ? 'file' : 'files'} to ${chalk.white(destinationPath)}  [${sourcePaths.map(v => chalk.white(v)).join(',')}]`));
        for (let i = 0; i < length; i++) {
            const sourcePath = sourcePaths[i];
            copyPathOrFile(sourcePath, { path: destinationPath, isDirectory: isDestinationDirectory }, {
                printInfo: false,
                printWarning: false,
                printError: true,
            })
        }
    }
})();
