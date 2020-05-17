import {existsSync, mkdirSync, writeFileSync} from "fs";
import {exec} from "child_process";

const TEST_FOLDER = '.test';

const createTestFile = () => {
    try {
        if (!existsSync(TEST_FOLDER)) {
            mkdirSync(TEST_FOLDER);
        }
        if (!existsSync(`${TEST_FOLDER}/test-folder`)) {
            mkdirSync(`${TEST_FOLDER}/test-folder`);
        }
        if (!existsSync(`${TEST_FOLDER}/existing-folder`)) {
            mkdirSync(`${TEST_FOLDER}/existing-folder`);
        }
        writeFileSync(`${TEST_FOLDER}/testFile`, 'test', {
            encoding: 'utf8'
        });
    } catch (e) { /* doesn't care if it already exists or not */
    }

}

const execPromise = async (cmd: string): Promise<any> => {
    await new Promise((resolve,reject) => {
        exec(cmd, (error, stdout,stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(error);
            }
            resolve();
        });
    })
}

const copyFileAsDirectory = async () => {
   await execPromise(`node dist/cli.js ${TEST_FOLDER}/testFile ${TEST_FOLDER}/folder1/folder2/`);

    const ok = !existsSync(`${TEST_FOLDER}/folder1/folder2/testFile`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy file to folder\'s that not exist error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFileAsDirectory finished.');
    }
}

const copyFileNotAsDirectory = async () => {

    await execPromise(`node dist/cli.js ${TEST_FOLDER}/testFile ${TEST_FOLDER}/folder1/newTestFile`);

    const ok = !existsSync(`${TEST_FOLDER}/folder1/newTestFile`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy file to folder\'s with specific name error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFileNotAsDirectory finished.');
    }
}
const copyFolderAsDirectory = async () => {
    await execPromise(`node dist/cli.js ${TEST_FOLDER}/test-folder ${TEST_FOLDER}/test-folder-1/`);

    const ok = !existsSync(`${TEST_FOLDER}/test-folder-1/test-folder`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy folder as directory error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFolderAsDirectory finished.');
    }
}
const copyFolderNotAsDirectory = async () => {
    await execPromise(`node dist/cli.js ${TEST_FOLDER}/test-folder ${TEST_FOLDER}/test-folder-2`);

    const ok = !existsSync(`${TEST_FOLDER}/test-folder-2`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy folder not as directory error');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFolderNotAsDirectory finished.');
    }
}

const copyFileToFolderThatAllReadyExist = async () => {
    await execPromise(`node dist/cli.js ${TEST_FOLDER}/testFile ${TEST_FOLDER}/existing-folder`);

    const ok = !existsSync(`${TEST_FOLDER}/existing-folder/testFile`);
    if (ok) {
        console.log('[❌ FAIL]] Test failed. Copy File to folder that already exist, force file to folder');
        process.exit(1);
    } else {
        console.log('[✅ OK] Test copyFileToFolderThatAllReadyExist finished.');
    }
}

(async ()=> {

await createTestFile();
await copyFileAsDirectory();
await copyFileNotAsDirectory();

await copyFolderAsDirectory();
await copyFolderNotAsDirectory();
await copyFileToFolderThatAllReadyExist();
})()

