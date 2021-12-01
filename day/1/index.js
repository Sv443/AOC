const { readFile } = require("fs-extra");
const { colors } = require("svcorelib");

const col = colors.fg;

async function run()
{
    console.log("\nCalculating result for the first half...\n");
    const result1 = await getResult1();
    console.log("\nCalculating result for the second half...\n");
    const result2 = await getResult2();

    console.log(`\n\nResult #1: Increased ${col.green}${result1}${col.rst} times`);
    console.log();
    console.log(`Result #2: Increased ${col.green}${result2}${col.rst} times\n`);

    process.exit(0);
}

async function getResult1()
{
    const rawFile = (await readFile("./day/1/first_half.txt")).toString();
    const numbers = rawFile.split(/\n/gm).map(n => parseInt(n));

    let increased, incAmt = 0;

    numbers.forEach((num, i) => {
        let textCol = "";

        if(increased !== undefined)
        {
            const lastNum = numbers[i - 1];

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

        console.log(`${num}  ${textCol}(${increased !== undefined ? (increased ? "increased" : "decreased") : "N/A"})${col.rst}`);

        if(increased === undefined)
            increased = false;
    });

    return incAmt;
}

async function getResult2()
{
    const rawFile = (await readFile("./day/1/second_half.txt")).toString();
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

        console.log(`${num}  ${textCol}(${increased !== undefined ? (increased ? "increased" : "decreased") : "N/A"})${col.rst}`);
    });

    return incAmt;
}

(() => run())();
