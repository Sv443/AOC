const { readFile } = require("fs-extra");
const { resolve } = require("path");
const { colors } = require("svcorelib");

const col = colors.fg;

const numbersFilePath = resolve("./day/1/numbers.txt");


async function run()
{
    console.log("\nCalculating result for the first half...\n");
    const result1 = await getResult1();
    console.log("\n\nCalculating result for the second half...\n");
    const result2 = await getResult2();

    console.log(`\n\nResult #1: Increased ${col.green}${result1}${col.rst} times`);
    console.log(`Result #2: Increased ${col.green}${result2}${col.rst} times\n`);

    process.exit(0);
}

//#SECTION result 1

async function getResult1()
{
    const rawFile = (await readFile(numbersFilePath)).toString();
    const numbers = rawFile.split(/\n/gm).map(n => parseInt(n));

    let increased, incAmt = 0;

    numbers.forEach((num, i) => {
        let textCol = "";

        const lastNum = i !== 0 ? numbers[i - 1] : undefined;

        if(increased !== undefined)
        {
            if(num > lastNum)
            {
                incAmt++;
                increased = true;
                textCol = col.blue;
            }
            else if(num < lastNum)
            {
                increased = false;
                textCol = col.rst;
            }
        }

        if(i < 10 || i > numbers.length - 10)
            console.log(`${lastNum ? lastNum : 0} -> ${num}  ${textCol}(${increased !== undefined ? (increased ? "increased" : "decreased") : "N/A"})${col.rst}`);

        if(increased === undefined)
            increased = false;
    });

    return incAmt;
}

//#SECTION result 2

async function getResult2()
{
    const rawFile = (await readFile("./day/1/numbers.txt")).toString();
    const numbers = rawFile.split(/\n/gm).map(n => parseInt(n));

    const newNums = [];

    for(let i = 0; i < numbers.length; i++)
    {
        const addNums = numbers.slice(i, i + 3);
        const num = addNums.reduce((acc, cur) => acc + cur, 0);

        newNums.push(num);
    }

    let incAmt = 0;

    newNums.forEach((num, i) => {
        const previous = i > 0 ? newNums[i - 1] : undefined;

        let increased = previous === undefined ? undefined : false;
        let textCol = "";

        if(previous && num > previous)
        {
            incAmt++;
            increased = true;
            textCol = col.blue;
        }

        if(i < 10 || i > newNums.length - 10)
            console.log(`${previous ? previous : 0} -> ${num}  ${textCol}(${increased !== undefined ? (increased ? "increased" : "decreased") : "N/A"})${col.rst}`);
    });

    return incAmt;
}

(() => run())();
