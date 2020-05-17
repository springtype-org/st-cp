import {existsSync, mkdirSync, writeFileSync} from "fs";
import {copyPathOrFile} from "./dist/function/st-cp";

const TEST_FOLDER = '.test';

const createTestFile = () => {
    try {
        if (!existsSync(TEST_FOLDER)) {
            mkdirSync(TEST_FOLDER);
        }
        if (!existsSync(`${TEST_FOLDER}/test-folder`)) {
            mkdirSync(`${TEST_FOLDER}/test-folder`);
        }
        writeFileSync(`${TEST_FOLDER}/testFile`, 'test', {
            encoding: 'utf8'
        });
    } catch (e) { /* doesn't care if it already exists or not */
    }

}

const copyFileAsDirectory = () => {
    copyPathOrFile(`${TEST_FOLDER}/testFile`, {
        path: `${TEST_FOLDER}/folder1/folder2`,
        isDirectory: true
    });

    const ok = !existsSync(`${TEST_FOLDER}/folder1/folder2/testFile`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy file to folder\'s that not exist error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFileAsDirectory finished.');
    }
}

const copyFileNotAsDirectory = () => {
    copyPathOrFile(`${TEST_FOLDER}/testFile`, {
        path: `${TEST_FOLDER}/folder1/newTestFile`,
        isDirectory: false
    });

    const ok = !existsSync(`${TEST_FOLDER}/folder1/newTestFile`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy file to folder\'s with specific name error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFileNotAsDirectory finished.');
    }
}
const copyFolderAsDirectory= () => {
    copyPathOrFile(`${TEST_FOLDER}/test-folder`, {
        path: `${TEST_FOLDER}/test-folder-1`,
        isDirectory: true
    });

    const ok = !existsSync(`${TEST_FOLDER}/test-folder-1/test-folder`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy folder as directory error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFolderAsDirectory finished.');
    }
}
const copyFolderNotAsDirectory= () => {
    copyPathOrFile(`${TEST_FOLDER}/test-folder`, {
        path: `${TEST_FOLDER}/test-folder-2`,
        isDirectory: false
    });

    const ok = !existsSync(`${TEST_FOLDER}/test-folder-2`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy folder not as directory error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFolderNotAsDirectory finished.');
    }
}

createTestFile();
copyFileAsDirectory();
copyFileNotAsDirectory();

copyFolderAsDirectory();
copyFolderNotAsDirectory();

