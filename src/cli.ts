#!/usr/bin/env node

import chalk from "chalk";
import { copyPathOrFile } from "./function/st-cp";

const sourcePaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const destinationPath = sourcePaths.pop() || "";

(async () => {
  if (sourcePaths.length == 0) {
    console.log("Nothing to copy.");
  } else {
    console.log(chalk.green("Start copying paths:"), sourcePaths);
    for (const sourcePath of sourcePaths) {
      copyPathOrFile(sourcePath, destinationPath);
    }
  }
})();
