export interface ICopyPathOrFile {
    resolve: (...pathSegments: string[]) => string;
    relative: (from: string, to: string) => string
    copyPathOrFile: (sourcePath: string, destinationPath: string) => void;
}