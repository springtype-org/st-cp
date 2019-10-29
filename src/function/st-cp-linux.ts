import {ICopyPathOrFile} from "../interface/icopypathorfile";
import {isDirectory} from "./isDirectory";
import {execute} from "./execute";
import {resolve, relative} from "path"
import chalk from "chalk";
import {existPath} from "./existPath";

export const copyPathOrFile: ICopyPathOrFile = {
    resolve,
    relative,
    copyPathOrFile: (sourcePath: string, destinationPath: string): void => {
        let recursive = 'p';
        if (isDirectory(destinationPath)) {
            recursive = 'rp';
        } else if (existPath(destinationPath)) {
            console.log(chalk.red('destination file already exists: ' + relative(process.cwd(), destinationPath)));
            process.exit(1);
        }


        execute(`cp -${recursive} "${sourcePath}" "${destinationPath}"`, {stdio: 'inherit'});
    }
};
