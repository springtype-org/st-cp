import {platform} from "os"
import {copyPathOrFile as linux} from "./st-cp-linux"
import {copyPathOrFile as windows} from "./st-cp-windows"
import {ICopyPathOrFile} from "../interface/icopypathorfile";
import {existPath} from "./existpath";
import chalk from "chalk";
import {isDirectory} from "./isdirectory";

export const copyPathOrFile = (sourcePath: string, destinationPath: string, printError: boolean = true): void => {
    try {
        const copy: ICopyPathOrFile = platform() == "win32" ? windows : linux;
        const currentPath = process.cwd();
        sourcePath = copy.resolve(currentPath, sourcePath);

        //source path exist
        if (!existPath(sourcePath)) {
            console.log(chalk.red("source does not exist " + copy.relative(currentPath, sourcePath)));
            process.exit(1);
        }
        const isFolder = isDirectory(sourcePath);

        destinationPath = copy.resolve(currentPath, destinationPath);
        //do copy
        copy.copyPathOrFile(sourcePath, destinationPath);

        console.log(chalk.cyan(`Copied ${isFolder ? 'folder' : 'file'} ${chalk.white(copy.relative(currentPath, sourcePath))} to ${chalk.white(copy.relative(currentPath, destinationPath))}`))
    } catch (err) {
        if (printError) {
            console.log(chalk.red('error ') + err);
            process.exit(1);
        }
    }
};
