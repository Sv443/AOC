const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors, reserialize } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/3/input.txt");

async function run()
{
    const inputRaw = (await readFile(inputFilePath)).toString();
    const lines = inputRaw.split(/\n/gm);

    console.log("\n\nCalculating result for part one...\n");
    const part1 = getPart1(lines);
    console.log("\n\nCalculating result for part two...\n");
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
 * @param {string[]} linesRaw
 */
function getPart2(linesRaw)
{
    const bitsAmt = linesRaw[0].length;

    /**
     * @param {string[]} lines
     * @param {"least"|"most"} keepCommon
     * @param {number} [bitPos=0]
     */
    const spliceLines = (lines, keepCommon, bitPos = 0) => {
        if(lines.length === 1)
            return lines[0];

        if(bitPos === bitsAmt)
            throw new Error(`BitPos '${bitPos}' out of range (0-${bitsAmt - 1})`);

        let amt0 = 0;
        let amt1 = 0;

        lines.forEach(line => {
            const checkBit = parseInt(line[bitPos]);

            if(checkBit === 0)
                amt0++;
            else if(checkBit === 1)
                amt1++;
        });

        const keepBit = keepCommon === "most" ? (amt0 > amt1 ? 0 : 1) : (amt0 > amt1 ? 1 : 0);

        const newLines = [];

        lines.forEach(line => {
            const checkBit = parseInt(line[bitPos]);

            if(
                (amt0 === amt1 && checkBit === (keepCommon === "most" ? 1 : 0))
                || (amt0 !== amt1 && checkBit === keepBit)
            )
                newLines.push(line);
        });

        return spliceLines(newLines, keepCommon, bitPos + 1);
    };

    const oxy = spliceLines(linesRaw, "most");
    const co2 = spliceLines(linesRaw, "least");

    console.log("Oxy:", oxy, ` (${parseInt(oxy, 2)})`);
    console.log("CO2:", co2, ` (${parseInt(co2, 2)})`);

    const lifeSupp = parseInt(oxy, 2) * parseInt(co2, 2);

    return lifeSupp;
}

(() => run())();