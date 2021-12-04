const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors } = require("svcorelib");
const { createInterface  } = require("readline");
const { createReadStream } = require("fs");

const col = colors.fg;

const inputFilePath = resolve("./day/4/input.txt");


/**
 * @typedef {object} ParsedInputFile
 * @prop {number[]} numbers Random chosen bingo numbers
 * @prop {number[][][]} boards 3D array that contains all boards across the first dimension. The boards themselves make up the other 2 dimensions.
 */


async function run()
{
    const { numbers, boards } = readInput();

    console.log("\n\nCalculating result for part one...\n");
    const part1 = getPart1();
    console.log("\n\nCalculating result for part two...\n");
    const part2 = getPart2();


    console.log(`\n\nResult #1: ${col.green}${part1}${col.rst}`);
    console.log(`Result #2: ${col.green}${part2}${col.rst}\n`);
}

/**
 * @returns {ParsedInputFile}
 */
async function readInput()
{
    const rl = createInterface(createReadStream(inputFilePath));

    /** @type {ParsedInputFile} */
    const result = {
        numbers: [],
        boards: [],
    };

    let curBoardIdx = 0;
    let curBoardLineAmt = 0;

    let lineNbr = 0;
    for await (const line of rl)
    {
        const trimmedLine = line.trim();

        lineNbr++;

        console.log(`${col.yellow}DBG/${lineNbr}:${col.rst} ${trimmedLine}`);

        if(lineNbr === 1) // random bingo numbers
            result.numbers = trimmedLine.split(/,/g).map(n => parseInt(n));
        else if(lineNbr > 2)
        {
            if(!trimmedLine.match(/^.*\d.*$/))
                continue;

            if(!Array.isArray(result.boards[curBoardIdx]))
                result.boards[curBoardIdx] = [];

            const lineNbrs = trimmedLine.split(/\s+/g).map(n => parseInt(n));

            result.boards[curBoardIdx].push(lineNbrs);

            curBoardLineAmt++;

            if(curBoardLineAmt === 5)
            {
                curBoardLineAmt = 0;
                curBoardIdx++;
            }
        }
    }

    return result;
}

//#SECTION part 1

function getPart1()
{
    return;
}

//#SECTION part 2

function getPart2()
{
    return;
}

(() => run())();
