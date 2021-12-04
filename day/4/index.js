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
    const input = await readInput();

    console.log("\n\nCalculating result for part one...\n");
    const part1 = await getPart1(input);
    console.log("\n\nCalculating result for part two...\n");
    const part2 = getPart2(input);


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

        // console.log(`${col.yellow}DBG/${lineNbr}:${col.rst} ${trimmedLine}`);

        if(lineNbr === 1) // random bingo numbers
        {
            result.numbers = trimmedLine.split(/,/g).map(n => parseInt(n));
        }
        else if(lineNbr > 2) // part of the boards or a blank line between them
        {
            if(!trimmedLine.match(/^.*\d.*$/))
                continue; // if blank line, ignore

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

/**
 * @param {ParsedInputFile} input
 * @returns {Promise<number>}
 */
function getPart1(input)
{
    return new Promise(async (res) => {
        const { numbers, boards } = input;

        /** @type {number[]} */
        const drawnNumbers = [];

        /** @param {number[][]} board */
        const hasCompletedRowCol = board => {
            // TODO: check for completed row or column, return bool
            // return drawnNumbers.length == 40;

            let bingoed = false;

            board.forEach((row, rowIdx) => {
                if(bingoed) // short-circuit
                    return;

                // check if row is bingoed:
                if(row.filter(num => drawnNumbers.includes(num)).length === 5)
                    bingoed = true;

                // check if column is bingoed:
                row.forEach((num, colIdx) => {
                    let colMatches = 0;

                    if(drawnNumbers.includes(num))
                        colMatches++;

                    board.forEach((row, i) => {
                        if(i === rowIdx)
                            return;

                        const checkNum = row[colIdx];

                        if(drawnNumbers.includes(checkNum))
                            colMatches++;
                    });

                    if(colMatches === 5)
                        bingoed = true;
                });
            });

            return bingoed;
        };

        /** @param {number[][]} board */
        const calculateResult = board => {
            const flatBoard = board.flat(1);
            const notDrawn = flatBoard.filter(fbNum => !drawnNumbers.includes(fbNum));

            const sumNotDrawn = notDrawn.reduce((acc, cur) => acc + cur, 0);

            const lastNum = drawnNumbers.at(-1);

            const result = sumNotDrawn * lastNum;

            console.log(`\nResult: ${sumNotDrawn} * ${lastNum} = ${col.blue}${result}${col.rst}   ${col.black}(result = sumNotDrawnNums * lastDrawnNum)${col.rst}`);

            return result;
        };

        process.stdout.write(`${col.green}Drawing numbers:${col.rst}`);

        for(const num of numbers)
        {
            process.stdout.write(`${drawnNumbers.length === 0 ? "" : ","} ${num}`);

            drawnNumbers.push(num);

            let boardNum = 0;

            for(const board of boards)
            {
                boardNum++;

                if(hasCompletedRowCol(board))
                {
                    process.stdout.write("\n\n");

                    console.log(`Board ${col.blue}#${boardNum}${col.rst} has completed a row or column after ${col.blue}${drawnNumbers.length}${col.rst} randomly drawn numbers:\n`);

                    const padNum = num => `${num < 10 ? " " : ""}${num}`;

                    const boardLines = board.map(line => line.reduce((acc, cur) => acc += `${drawnNumbers.includes(cur) ? col.blue : ""}${padNum(cur)}${col.rst}  `, ""));

                    console.log(boardLines.join("\n"));

                    const result = calculateResult(board);

                    return res(result);
                }
            }
        }
    });
}

//#SECTION part 2

/**
 * @param {ParsedInputFile} input
 */
function getPart2(input)
{
    return;
}

(() => run())();
