import chalk from "chalk";
import { relative, resolve } from "path";
import { ICopyPathOrFile } from "../interface/icopypathorfile";
import { execute } from "./execute";
import { existPath } from "./existpath";
import { isDirectory } from "./isdirectory";

export const copyPathOrFile: ICopyPathOrFile = {
    resolve,
    relative,
    copyPathOrFile: (sourcePath: string, destinationPath: string): void => {
        let recursive = 'p';
        if (isDirectory(destinationPath) || isDirectory(sourcePath) && !existPath(destinationPath)) {
            recursive = 'rp';
        } else if (existPath(destinationPath)) {
            console.log(chalk.red('destination file already exists: ' + relative(process.cwd(), destinationPath)));
            process.exit(1);
        }


        execute(`cp -${recursive} "${sourcePath}" "${destinationPath}"`, {stdio: 'inherit'});
    }
};
