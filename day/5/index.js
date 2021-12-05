const { createReadStream } = require("fs-extra");
const { resolve } = require("path");
const { createInterface } = require("readline");
const { colors } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/5/input.txt");


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
    const first = getPart1(input);
    // const second = await getPart2(input);

    console.log(`\n\nResult #1: ${col.green}${first}${col.rst}`);
    // console.log(`Result #2: ${col.green}${second}${col.rst}\n`);
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
 */
function getPart1(input)
{
    const gridSize = [0, 0];

    // calculate grid size
    input.forEach(line => {
        const largestX = Math.max(line.from.x, line.to.x);
        const largestY = Math.max(line.from.y, line.to.y);

        if(gridSize[0] < largestX)
            gridSize[0] = largestX;
        if(gridSize[1] < largestY)
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

    // increment grid numbers based on input lines

    input.forEach((line, i) => {
        const x = [ Math.min(line.from.x, line.to.x), Math.max(line.from.x, line.to.x) ];
        const y = [ Math.min(line.from.y, line.to.y), Math.max(line.from.x, line.to.x) ];

        i == 0 && console.log(`Current line: [${line.from.x}, ${line.from.y}], [${line.to.x}, ${line.to.y}]`);

        for(let yPos = y[0]; yPos < y[1]; yPos++)
        {
            for(let xPos = x[0]; xPos < x[1]; xPos++)
            {
                i == 0 && console.log(`Incrementing pos ${xPos}, ${yPos}`);

                grid[yPos][xPos] += 1;
            }
        }
    });

    // count grid numbers >= 2

    let unsafeTilesAmt = 0;

    grid.forEach(line => {
        line.forEach(num => {
            if(num > 1)
                unsafeTilesAmt++;
        });
    });

    return unsafeTilesAmt;
}

(() => run())();
