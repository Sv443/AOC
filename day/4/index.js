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

    console.log("\n\nCalculating results...\n");
    const { first, last } = await getResults(input);


    console.log(`\n\nResult #1: ${col.green}${first}${col.rst}`);
    console.log(`Result #2: ${col.green}${last}${col.rst}\n`);
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

//#SECTION both parts

/**
 * @param {ParsedInputFile} input
 * @returns {Promise<{first: number, last: number}>}
 */
function getResults(input)
{
    return new Promise(async (res) => {
        /** The final results */
        const results = {
            first: undefined,
            last: undefined,
        };

        const { numbers, boards } = input;

        /** @type {number[]} */
        const drawnNumbers = [];

        const padNum = num => `${num < 10 ? " " : ""}${num}`;

        /** @param {number[][]} board */
        const hasCompletedRowCol = board => {
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

        // last
        // 46 11 41 86 21
        // 31 82 38 23 53
        // 66 52 39  6  1
        // 16 95 36  0 69
        // 28 54 91 99 60

        /**
         * @param {number[][]} board
         * @param {number} lastNum
         */
        const calculateResult = (board, lastNum) => {
            const drawnNums = [];
            let finalNumReached = false;
            drawnNumbers.forEach(n => {
                if(finalNumReached)
                    return;

                drawnNums.push(n);

                if(n === lastNum)
                    finalNumReached = true;
            });

            const flatBoard = board.flat(1);
            const notDrawn = flatBoard.filter(fbNum => !drawnNums.includes(fbNum));

            const sumNotDrawn = notDrawn.reduce((acc, cur) => acc + cur, 0);

            const result = sumNotDrawn * lastNum;

            console.log(`\nResult: ${sumNotDrawn} * ${lastNum} = ${col.blue}${result}${col.rst}   ${col.black}(result = sumNotDrawnNums * lastDrawnNum)${col.rst}`);

            return result;
        };

        let completedBoards = [];

        for(const num of numbers)
        {
            drawnNumbers.push(num);

            let boardNum = 0;

            for(const board of boards)
            {
                const boardIdx = boardNum;

                boardNum++;

                if(hasCompletedRowCol(board))
                {
                    if(!completedBoards.find(comp => comp[0] === boardIdx))
                        completedBoards.push([boardIdx, num]);

                    if(results.first)
                        continue;

                    console.log(`Board ${col.blue}#${boardNum}${col.rst} has completed a row or column after ${col.blue}${drawnNumbers.length}${col.rst} randomly drawn numbers:\n`);

                    const boardLines = board.map(line => line.reduce((acc, cur) => acc += `${drawnNumbers.includes(cur) ? col.blue : ""}${padNum(cur)}${col.rst}  `, ""));

                    console.log(boardLines.join("\n"));

                    const result = calculateResult(board, drawnNumbers.at(-1));

                    results.first = result;
                }
            }
        }

        const lastCompleted = completedBoards.at(-1);

        const lastBoard = boards[lastCompleted[0]];

        console.log(`\n\nThe last board to complete a row or column is board ${col.blue}#${lastCompleted[0]}${col.rst}`);

        results.last = calculateResult(lastBoard, lastCompleted[1]);


        return res(results);
    });
}

(() => run())();
