import {PathLike, lstatSync} from "fs";
import {existPath} from "./existPath";

export const isDirectory =  (path: PathLike) => {
   return existPath(path) && lstatSync(path).isDirectory();
};