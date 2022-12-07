import { pathExists, readFile } from "fs-extra";
import { resolve } from "path";
import { PerfMeter, runSequentially } from "src/utils";


const bigFile = false;

async function partOne() {
    const perf = new PerfMeter();
    perf.fsDone();
    let { stacks, moves } = await parseInput();
    perf.remapDone();

    for(const move of moves)
        stacks = processMove(stacks, move);

    const topCrates = getTopCrates(stacks);

    perf.allDone();
    console.log(`Top Crates: ${topCrates.length > 32 ? "\n" : ""}${topCrates}`);
    perf.print();
}

async function partTwo() {
    void 0;
}

// stacks:
//   input.txt representation:
//
//    ^    [B] [D] [F] [H]
//    |    [A] [C] [E] [G]
//   dim2   1   2   3   4 
//   dim1-->
//
//   `stacks` representation:
//   [
//       ["A", "B"],
//       ["C", "D"],
//       ["E", "F"],
//       ["G", "H"],
//   ]

// moves:
//   input.txt representation:
//   move `moveAmount` from `fromNum` to `toNum`
//
//   `moves` representation:
//   [moveAmount, fromNum, toNum]

async function parseInput() {
    const [inputStacks, inputMoves] = getInputLines();

    const stacksVerAmt = 8;
    const stacksHorAmt = 9;

    const stacks: string[][] = [];
    const moves: [number, number, number][] = [];

    for(let stackLine = 0; stackLine <= stacksVerAmt; stackLine++) {
        stacks.push([...Array(stacksVerAmt)].fill(null));
        for(let i = 1; i <= (1 + stacksHorAmt * 4); i += 4)
            stacks[(i - 1) / 4]![stackLine] = inputStacks[stackLine][i];
    }
    console.log();

    return { stacks, moves };
}

async function getInputLines() {
    const inputPath = resolve(`./src/days/${5}/input${bigFile ? "_chungus" : ""}.txt`);
    const file = String(await readFile(inputPath));

    const [stacksRaw, movesRaw] = file.split(/\n{2}/m);

    const lines = file
        .split(/\n/gm);

    return lines.filter(l => l.length > 0);
}

runSequentially(partOne, partTwo);
