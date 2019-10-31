import {existsSync, PathLike} from "fs";

export const existPath = (path: PathLike): boolean => {
    return existsSync(path);
};