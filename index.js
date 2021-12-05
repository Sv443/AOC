const prompt = require("prompts");
const { resolve, join } = require("path");

const importFresh = require("import-fresh");
const { readdir, copy, mkdirs } = require("fs-extra");
const { filesystem, colors, pause } = require("svcorelib");

const col = colors.fg;

const paths = {
    daysFolder: resolve("./day/"),
    templatePath: resolve("./day/template/"),
};


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

        const truncDayFolders = dayFolders.filter(fold => fold !== "template");

        latestDay = truncDayFolders.map(d => parseInt(d)).sort((a, b) => {
            if(a < b)
                return -1;
            else if(a > b)
                return 1;
            return 0;
        }).at(-1);
    }

    if(process.argv.includes("create") || process.argv.includes("new"))
    {
        const chosenDay = latestDay + 1 || day;

        const dayFolderPath = join(paths.daysFolder, String(chosenDay));

        await mkdirs(dayFolderPath);

        await copy(paths.templatePath, dayFolderPath, { recursive: true });

        console.log(`Created day ${col.green}${chosenDay}${col.rst} subfolder at path ${col.green}./day/${chosenDay}/${col.rst}\n`);

        setTimeout(() => process.exit(0), 6000);

        await pause("Press any key to exit (or wait 6s)…");

        process.exit(0);
    }
    else
    {
        const chosenDay = latestDay || day;

        const path = resolve(`./day/${chosenDay}/index.js`);

        if(!(await filesystem.exists(path)))
        {
            console.error(`\n${col.red}Error: Can't find script file of day ${chosenDay} in path '${path}'${col.rst}\n`);
            process.exit(1);
        }

        console.log(`\n${col.blue}>> Running code of day ${chosenDay}${col.rst}\n`);

        importFresh(path);
        return;
    }
}

(() => init())();
