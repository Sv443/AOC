const { createReadStream } = require("fs-extra");
const { resolve } = require("path");
const { createInterface } = require("readline");
const { colors, reserialize } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/5/input.txt"); //#DEBUG


/**
 * @typedef {object} Position
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @typedef {object} ParsedInput
 * @prop {Position} from
 * @prop {Position} to
 */


async function run()
{
    const input = await readInput();

    console.log("\n\nCalculating results...\n");
    const { first, second } = getResults(input);
    // const second = await getPart2(input);

    console.log(`\n\nResult #1: ${col.green}${first}${col.rst}`);
    console.log(`Result #2: ${col.green}${second}${col.rst}\n`);
}

/**
 * @returns {ParsedInput[]}
 */
async function readInput()
{
    const rl = createInterface(createReadStream(inputFilePath));

    /** @type {ParsedInput[]} */
    const ventPositions = [];

    // let lineNbr = 0;
    for await (const line of rl)
    {
        const trimmedLine = line.trim();

        // lineNbr++;

        const halves = trimmedLine.split(/\s+->\s+/);

        const nums = halves.map(side => side.split(/,/).map(n => parseInt(n)));

        /** @type {Position} */
        const from = {
            x: nums[0][0],
            y: nums[0][1],
        };

        /** @type {Position} */
        const to = {
            x: nums[1][0],
            y: nums[1][1],
        };

        ventPositions.push({ from, to });
    }

    return ventPositions;
}

//#SECTION part 1

/**
 * @param {ParsedInput[]} input 
 * @returns {{ first: number, second: number }}
 */
function getResults(input)
{
    // filter out diagonal lines
    const inputNoDiag = input.filter(line => line.from.x === line.to.x || line.from.y === line.to.y);

    /** `[x, y]` or `[w, h]` */
    const gridSize = [0, 0];

    // calculate grid size
    inputNoDiag.forEach(line => {
        const largestX = Math.max(line.from.x, line.to.x);
        const largestY = Math.max(line.from.y, line.to.y);

        if(gridSize[0] < largestX)
            // gridSize[0] = Math.max(largestX, 1000);
            gridSize[0] = largestX;
        if(gridSize[1] < largestY)
            // gridSize[1] = Math.max(largestY, 1000);
            gridSize[1] = largestY;
    });

    console.log("Grid size:", gridSize.join("x"));

    // zero fill grid
    /** @type {number[][]} */
    const grid = [];

    for(let y = 0; y < gridSize[1] + 1; y++)
    {
        grid.push([]);

        for(let x = 0; x < gridSize[0] + 1; x++)
        {
            grid[y].push(0);
        }
    }

    const grids = {
        /** @type {number[][]} */
        first: reserialize(grid),
        /** @type {number[][]} */
        second: reserialize(grid),
    };

    // increment grid numbers based on input lines

    // part 1
    inputNoDiag.forEach((line) => {
        const { from, to } = line;

        const x = [ Math.min(from.x, to.x), Math.max(from.x, to.x) ];
        const y = [ Math.min(from.y, to.y), Math.max(from.y, to.y) ];

        // i == 0 && console.log(`Current line: [${from.x}, ${from.y}] -> [${to.x}, ${to.y}]`);

        if(from.x === to.x)
            for(let yPos = y[0]; yPos < y[1] + 1; yPos++)
                grids.first[yPos][from.x] += 1;

        else if(from.y === to.y)
            for(let xPos = x[0]; xPos < x[1] + 1; xPos++)
                grids.first[from.y][xPos] += 1;
    });

    // part 2
    input.forEach(line => {
        const { from, to } = line;

        const x = [ Math.min(from.x, to.x), Math.max(from.x, to.x) ];
        const y = [ Math.min(from.y, to.y), Math.max(from.y, to.y) ];

        // i == 0 && console.log(`Current line: [${from.x}, ${from.y}] -> [${to.x}, ${to.y}]`);

        // TODO:
    });

    // count grid numbers >= 2

    const unsafeTilesAmt = {
        first: 0,
        second: 0,
    };

    grids.first.forEach((line, y) => {
        line.forEach((num, x) => {
            if(typeof num !== "number")
                num = parseInt(num);

            if(isNaN(num))
                throw new TypeError(`Grid contains non-number at x=${x}, y=${y}`);

            if(num >= 2)
                unsafeTilesAmt.first++;
        });
    });

    return unsafeTilesAmt;
}

(() => run())();
