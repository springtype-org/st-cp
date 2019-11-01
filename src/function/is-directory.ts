import { existsSync, lstatSync, PathLike } from "fs";

export const isDirectory = (path: PathLike) => {
  return existsSync(path) && lstatSync(path).isDirectory();
};
