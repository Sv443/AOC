import k from "kleur";
import { getInput, PerfMeter, runSequentially } from "../../utils";

const bigFile = false;

type Range = [number, number];

async function partOne() {
    const perf = new PerfMeter();
    const lines = await getInput(4, bigFile);
    const pairs = lines.map(l => l.split(","));

    const splitAndParse = (range?: string) => range?.split("-")?.map(v => parseInt(v));
    const ranges = pairs.map(([r1, r2]) => ([ splitAndParse(r1), splitAndParse(r2) ]));

    let containedRanges = 0;
    for(const [range1, range2] of ranges as [Range, Range][])
        if(isRangeContained(range1, range2) || isRangeContained(range2, range1))
            containedRanges++;

    console.log(k.green("Part 1 result: ") + k.yellow(containedRanges));
    console.log(k.gray(`Time:          ${perf.stop()}s`));
    console.log();
}

function isRangeContained(innerRange: Range, outerRange: Range) {
    return innerRange[0] >= outerRange[0] && innerRange[1] <= outerRange[1];
}

//#MARKER part two

async function partTwo() {
    const perf = new PerfMeter();
    const lines = await getInput(4, bigFile);
    const pairs = lines.map(l => l.split(","));

    const splitAndParse = (range?: string) => range?.split("-")?.map(v => parseInt(v));
    const ranges = pairs.map(([r1, r2]) => ([ splitAndParse(r1), splitAndParse(r2) ]));

    let overlappingRanges = 0;
    for(const [range1, range2] of ranges as [Range, Range][])
        if(doRangesOverlap(range1, range2))
            overlappingRanges++;

    console.log(k.green("Part 2 result: ") + k.yellow(overlappingRanges));
    console.log(k.gray(`Time:          ${perf.stop()}s`));
    console.log();
}

function doRangesOverlap(range1: Range, range2: Range) {
    return Math.max(range1[0], range2[0]) <= Math.min(range1[1], range2[1]);
}

runSequentially(partOne, partTwo);
