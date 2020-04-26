import { writeFileSync, existsSync, unlinkSync } from "fs";
import { copyPathOrFile } from "./dist/function/st-cp";

try {
    writeFileSync('.test.tmp', 'test', {
        encoding: 'utf8'
    });
} catch (e) { /* doesn't care if it already exists or not */ }

copyPathOrFile('.test.tmp', {
    path: './.test.tmp.2',
    isDirectory: true
});

const ok = !existsSync('.test.tmp.2');

unlinkSync('.test.tmp.2');
unlinkSync('.test.tmp');

if (ok) {
    console.log('[!!] Test failed. Test file .test.tmp.2 does not exists.');
    process.exit(1);
} else {
    console.log('[OK] Test finished.');
}