const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/3/input.txt");

async function run()
{
    const inputRaw = (await readFile(inputFilePath)).toString();
    const lines = inputRaw.split(/\n/gm);

    console.log("\n\nCalculating result for part one...\n\n");
    const part1 = getPart1(lines);
    console.log("\n\nCalculating result for part two...\n\n");
    const part2 = getPart2(lines);


    console.log(`\n\nResult #1: ${col.green}${part1}${col.rst}`);
    console.log(`Result #2: ${col.green}${part2}${col.rst}\n`);
}

//#SECTION part 1

/**
 * @param {string[]} lines
 */
function getPart1(lines)
{
    let gamma = "";
    let epsilon = "";

    const bitsAmt = lines[0].length;

    for(let i = 0; i < bitsAmt; i++)
    {
        let amt0 = 0;
        let amt1 = 0;

        lines.forEach(line => {
            const bit = parseInt(line[i]);

            if(bit === 0)
                amt0++;
            else if(bit === 1)
                amt1++;
        });

        const mostCommon = amt0 > amt1 ? "0" : "1";
        const leastCommon = amt1 > amt0 ? "0" : "1";

        gamma += mostCommon;
        epsilon += leastCommon;
    }

    console.log("Gamma:   ", gamma, ` (${parseInt(gamma, 2)})`);
    console.log("Epsilon: ", epsilon, ` (${parseInt(epsilon, 2)})`);

    const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);

    return powerConsumption;
}

/**
 * @param {string[]} lines
 */
function getPart2(lines)
{
    return undefined;
}

(() => run())();