import {ICopyPathOrFileOption} from "./i-copy-path-or-file-option";
import {IDestination} from "./i-destination";

export interface ICopyPathOrFile {
  resolve: (...pathSegments: string[]) => string;
  relative: (from: string, to: string) => string;
  copyPathOrFile: (sourcePath: string, destination: IDestination, option: ICopyPathOrFileOption) => void;
}
