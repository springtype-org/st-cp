import {ICopyPathOrFile} from "../interface/icopypathorfile";
import {isDirectory} from "./isDirectory";
import {execute} from "./execute";
import {win32} from "path";
import {existPath} from "./existPath";
import {copyFileSync, mkdirSync} from "fs";
import chalk from "chalk";

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
    copyPathOrFile: (sourcePath: string, destinationPath: string): void => {
        if (isDirectory(sourcePath)) {
            const destinationPathWithOptionalFileName = existPath(destinationPath) && isDirectory(destinationPath) ?
                appendFileName(destinationPath, extractFileName(sourcePath)) :
                destinationPath;

            execute(`(robocopy "${sourcePath}" "${destinationPathWithOptionalFileName}" /MIR /NFL /NDL /NJH /NJS /nc /ns /np) ^& IF %ERRORLEVEL% LEQ 1 exit 0`, {stdio: 'inherit'});

        } else {
            const dirName = path.dirname(destinationPath);

            if (!existPath(dirName)) {
                mkdirSync(dirName, {
                    recursive: true
                });
            }

            if (existPath(destinationPath)) {
                if (isDirectory(destinationPath)) {
                    copyFileSync(sourcePath, appendFileName(destinationPath, extractFileName(sourcePath)));
                } else {
                    console.log(chalk.red('destination file already exists: ' + relative(process.cwd(), destinationPath)));
                    process.exit(1);
                }
            } else {
                copyFileSync(sourcePath, destinationPath);
            }

        }
    }
};