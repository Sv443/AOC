import { readFile } from "fs-extra";
import k from "kleur";
import { resolve } from "path";

type Range = [number, number];

const bigFile = true;
const inputPath = resolve(`./src/days/4/input${bigFile ? "_chungus" : ""}.txt`);

async function partOne() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => l.split(","));

    const splitAndParse = (range?: string) => range?.split("-")?.map(v => parseInt(v));
    const ranges = pairs.map(([r1, r2]) => ([ splitAndParse(r1), splitAndParse(r2) ]));

    let containedRanges = 0;
    for(const [range1, range2] of ranges as [Range, Range][])
        if(isRangeContained(range1, range2) || isRangeContained(range2, range1))
            containedRanges++;

    console.log(k.green("Part 1 result: ") + k.yellow(containedRanges));
    console.log(k.gray("Time:          " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

function isRangeContained(innerRange: Range, outerRange: Range) {
    return innerRange[0] >= outerRange[0] && innerRange[1] <= outerRange[1];
}

//#MARKER part two

async function partTwo() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => l.split(","));

    const splitAndParse = (range?: string) => range?.split("-")?.map(v => parseInt(v));
    const ranges = pairs.map(([r1, r2]) => ([ splitAndParse(r1), splitAndParse(r2) ]));

    let overlappingRanges = 0;
    for(const [range1, range2] of ranges as [Range, Range][])
        if(doRangesOverlap(range1, range2))
            overlappingRanges++;

    console.log(k.green("Part 2 result: ") + k.yellow(overlappingRanges));
    console.log(k.gray("Time:          " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

function doRangesOverlap(range1: Range, range2: Range) {
    return Math.max(range1[0], range2[0]) <= Math.min(range1[1], range2[1]);
}

(async () => {
    await partOne();
    await partTwo();
})();
