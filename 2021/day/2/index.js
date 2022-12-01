const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors } = require("svcorelib");

const col = colors.fg;

const inputFilePath = resolve("./day/2/input.txt");


/**
 * @typedef {object} Instruction
 * @prop {"forward"|"down"|"up"} command
 * @prop {number} amount
 */


async function run()
{
    const inputRaw = (await readFile(inputFilePath)).toString();
    const instructions = parseInstructions(inputRaw);

    console.log("\n\nCalculating result for part one...\n\n");
    const part1 = getPart1(instructions);
    console.log("\n\nCalculating result for part two...\n\n");
    const part2 = getPart2(instructions);

    

    console.log(`\n\nResult #1: ${col.green}${part1}${col.rst}`);
    console.log(`Result #2: ${col.green}${part2}${col.rst}\n`);
}

/**
 * @param {string} instr
 * @returns {Instruction[]}
 */
function parseInstructions(instr)
{
    const instructions = [];

    instr.split(/\n/gm).forEach(line => {
        const [command, amount] = line.split(/\s/);

        instructions.push({
            command,
            amount: parseInt(amount),
        });
    });

    return instructions;
}

//#SECTION part 1

/**
 * @param {Instruction[]} instructions
 */
function getPart1(instructions)
{
    const submarine = {
        horPos: 0,
        depth: 0,
    };

    instructions.forEach((ins, i) => {
        switch(ins.command)
        {
        case "forward":
        {
            i !== 0 && process.stdout.write(`>${ins.amount} `);
            submarine.horPos += ins.amount;
            break;
        }
        case "down":
        {
            i !== 0 && process.stdout.write(`v${ins.amount} `);
            submarine.depth += ins.amount;
            break;
        }
        case "up":
        {
            i !== 0 && process.stdout.write(`^${ins.amount} `);
            submarine.depth -= ins.amount;
            break;
        }
        default:
            throw new Error(`Unrecognized command '${ins.command}' in input file '${inputFilePath}'`);
        }

        const lastInstr = i === instructions.length - 1;

        if(i !== 0 && i % 25 == 0 || lastInstr)
            console.log(`${lastInstr ? "   " : ""} -  horPos: ${submarine.horPos} / depth: ${submarine.depth}`);
    });

    return submarine.horPos * submarine.depth;
}

//#SECTION part 2

/**
 * @param {Instruction[]} instructions
 */
function getPart2(instructions)
{
    const submarine = {
        horPos: 0,
        depth: 0,
        aim: 0,
    };

    instructions.forEach((ins, i) => {
        switch(ins.command)
        {
        case "forward":
        {
            i !== 0 && process.stdout.write(`>${ins.amount} `);
            submarine.horPos += ins.amount;
            submarine.depth += submarine.aim * ins.amount;
            break;
        }
        case "down":
        {
            i !== 0 && process.stdout.write(`v${ins.amount} `);
            submarine.aim += ins.amount;
            break;
        }
        case "up":
        {
            i !== 0 && process.stdout.write(`^${ins.amount} `);
            submarine.aim -= ins.amount;
            break;
        }
        default:
            throw new Error(`Unrecognized command '${ins.command}' in input file '${inputFilePath}'`);
        }
    
        const lastInstr = i === instructions.length - 1;
    
        if(i !== 0 && i % 25 == 0 || lastInstr)
            console.log(`${lastInstr ? "   " : ""} -  horPos: ${submarine.horPos} / depth: ${submarine.depth} / aim: ${submarine.aim}`);
    });

    return submarine.horPos * submarine.depth;
}

(() => run())();
