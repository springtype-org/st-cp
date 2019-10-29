import {execSync, ExecSyncOptions} from "child_process";

export const execute = (command: string, options?: ExecSyncOptions) => {
    execSync(command, options);
};