#!/usr/bin/env node
import { getGrass } from './lib.js'

let exitCode = 1;
async function cli() {
    if (process.argv.length < 3) {
        console.error('ERROR: undefined username.');
        return;
    }
    const user = process.argv[2];
    try {
        const res = await getGrass(user);
        console.log(res);
        exitCode = 0;
        return;
    } catch (e) {
        console.error(e.message);
        return;
    }
}

process.on("exit", function () {
    process.exit(exitCode);
});

cli();