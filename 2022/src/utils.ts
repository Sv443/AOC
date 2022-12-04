import { pathExists, readFile } from "fs-extra";
import { resolve } from "path";
import { performance } from "perf_hooks";

/** Parses the given input file and returns its lines (if splitRegex is left on its default) */
export async function getInput(day: number, bigFile = false, allowEmptyLines = false, splitRegex = /\n/gm) {
    const inputPath = resolve(`./src/days/${day}/input${bigFile ? "_chungus" : ""}.txt`);

    if(!pathExists(inputPath))
        throw new Error(`Can't get lines from input${bigFile ? "_chungus" : ""}.txt for day ${day} as file doesn't exist`);

    const lines = String(await readFile(inputPath))
        .split(splitRegex);

    return allowEmptyLines ? lines : lines.filter(l => l.length > 0);
}

/** Executes the passed async functions sequentially */
export async function runSequentially(...promises: (() => Promise<unknown>)[]) {
    for(const prom of promises)
        await prom();
}

/** Measures performance from instantiation to execution of `stop()` */
export class PerfMeter {
    public readonly startTs;

    /** Measures performance from instantiation to execution of `stop()` */
    constructor() {
        this.startTs = performance.now();
    }

    /** Stops the PerfMeter and returns the measured time in seconds */
    public stop(decimals = 3) {
        return parseFloat(((performance.now() - this.startTs) / 1000).toFixed(decimals));
    }
}
