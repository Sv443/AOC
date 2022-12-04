import { pathExists, readFile } from "fs-extra";
import { resolve } from "path";
import { performance } from "perf_hooks";
import k from "kleur";

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
    public startTs;
    public fsTs = 0;
    public remapTs = 0;
    public allDoneTs = 0;

    readonly decimals;

    /** Measures performance from instantiation to execution of `stop()` */
    constructor(decimals = 3) {
        this.startTs = performance.now();
        this.decimals = decimals;
    }

    /** Call to measure when all file system stuff is done */
    public fsDone() {
        this.fsTs = performance.now();
    }

    /** Call to measure when data remapping is done */
    public remapDone() {
        this.remapTs = performance.now();
    }

    /** Call to measure when everything is done */
    public allDone() {
        this.allDoneTs = performance.now();
    }

    /** Prints the measured times in seconds */
    public print() {
        console.log(k.gray([
            "> Performance",
            `>   No FS:    ${this.fsTs ? this.formatOffsetTS(this.allDoneTs - this.fsTs) : "--- "}s`,
            `>   No Remap: ${this.remapTs ? this.formatOffsetTS(this.allDoneTs - this.remapTs) : "--- "}s`,
            `>   Total:    ${this.formatOffsetTS(this.allDoneTs - this.startTs)}s`,
        ].join("\n")));
    }

    private formatOffsetTS(timestamp: number) {
        return parseFloat((timestamp / 1000).toFixed(this.decimals));
    }
}
