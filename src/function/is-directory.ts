import { existsSync, lstatSync } from "fs";

export const isDirectory = (path: string) => {
  return existsSync(path) && lstatSync(path).isDirectory() || path.endsWith('/');
};
