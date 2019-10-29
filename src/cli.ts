#!/usr/bin/env node

import {copyPathOrFile} from "./function/st-cp";

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

const sourcePaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const destinationPath = sourcePaths.pop() || '';

(async () => {

    if (sourcePaths.length == 0) {
        console.log(chalk.red('Nothing to copy.'));
    } else {
        console.log(chalk.green('Start copying paths:'), sourcePaths);
        for (const sourcePath of sourcePaths) {
           copyPathOrFile(sourcePath, destinationPath)
        }
    }
})();


