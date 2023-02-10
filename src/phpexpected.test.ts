import { describe, expect, suite, test } from 'vitest'
import { readFileSync } from 'fs';
import { join } from 'path';
import which from 'which'
import { spawn } from 'child_process';

const phpExecNotExists = (which.sync('php', { nothrow: true }) === null)

describe.skipIf(phpExecNotExists)('check php result string syntax', () => {

    const testFile = readFileSync(join(__dirname, 'index.test.ts'), 'utf-8');
    const phpdata = testFile.split("\n").reduce((pv, line) => {
        if (line.match(/const\sexpected\s*=\s*/i)) {
            const phpvariableData = new Function(`${line};return expected;`)();
            pv.push(phpvariableData)
        }
        return pv
    }, [])


    test.each(phpdata)('php syntax ok: %s', (phpvariableData: string) =>
        new Promise((done, reject) => {
            let output = ""
            const phpTestCode = '<?php $a=' + phpvariableData + ';'
            const phpTestProcess = spawn('php', ['-l'])
            phpTestProcess.stdout.on("data", (data) => {
                output += data.toString()
            })
            phpTestProcess.stderr.on("data", (data) => {
                output += data.toString()
            })
            phpTestProcess.once('error', (err: Error) => {
                reject(err);
            });
            phpTestProcess.on('close', (code) => {
                if (code == 0) {
                    done()
                } else {
                    reject('php -l :' + output)
                }
            })
            phpTestProcess.stdin.write(phpTestCode)
            phpTestProcess.stdin.end()
        })
    )

})
