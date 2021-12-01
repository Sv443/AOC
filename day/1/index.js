const { readFile } = require("fs-extra");
const { colors } = require("svcorelib");

const col = colors.fg;


async function run()
{
    const rawFile = (await readFile("./day/1/numbers.txt")).toString();
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
                textCol = col.green;
            }
            else if(num < lastNum)
            {
                increased = false;
                textCol = col.yellow;
            }
        }

        console.log(`${num}  ${textCol}(${increased !== undefined ? (increased ? "increased" : "decreased") : "N/A"})${col.rst}`);

        if(increased === undefined)
            increased = false;
    });

    console.log(`\n\nResult: Increased ${col.green}${incAmt}${col.rst} times\n`);
}

(() => run())();
