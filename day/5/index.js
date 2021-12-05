const { createReadStream } = require("fs-extra");
const { resolve } = require("path");
const { createInterface } = require("readline");
// const { colors } = require("svcorelib");

// const col = colors.fg;

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

    console.log(input);
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

function getPart1()
{

}

(() => run())();
