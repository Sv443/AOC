const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/4/input.txt");


async function run()
{
    const inputRaw = (await readFile(inputFilePath)).toString();

    console.log("\n\nCalculating result for part one...\n");
    const part1 = getPart1();
    console.log("\n\nCalculating result for part two...\n");
    const part2 = getPart2();


    console.log(`\n\nResult #1: ${col.green}${part1}${col.rst}`);
    console.log(`Result #2: ${col.green}${part2}${col.rst}\n`);
}

function getPart1()
{
    return;
}

function getPart2()
{
    return;
}

(() => run())();
