const prompt = require("prompts");
const { resolve } = require("path");

const importFresh = require("import-fresh");
const { readdir } = require("fs-extra");
const { filesystem, colors } = require("svcorelib");

const col = colors.fg;


async function init()
{
    let day;

    if(!process.argv.includes("--latest") && !process.argv.includes("-l"))
    {
        day = (await prompt({
            type: "number",
            message: "Input which day's code to run (esc or 0 for latest)",
            name: "val",
            validate: num => num === undefined || (!isNaN(parseInt(num)) && num >= 0 && num <= 25),
            initial: undefined,
        })).val;
    }

    let latestDay;

    if(day === 0 || day === undefined)
    {
        const dayFolders = await readdir(resolve("./day/"));

        latestDay = dayFolders.sort((a, b) => {
            if(a < b)
                return -1;
            else if(a > b)
                return 1;
            return 0;
        }).at(-1);
    }

    const chosenDay = latestDay || day;

    const path = resolve(`./day/${chosenDay}/index.js`);

    if(!(await filesystem.exists(path)))
    {
        console.error(`\n${col.red}Error: Can't find script file of day ${chosenDay} in path '${path}'${col.rst}\n`);
        process.exit(1);
    }

    importFresh(path);
}

(() => init())();
