const prompt = require("prompts");
const { resolve } = require("path");

const importFresh = require("import-fresh");


async function init()
{
    const { day } = await prompt({
        type: "number",
        message: "Input which day's code to run",
        name: "day",
        validate: num => !isNaN(parseInt(num)) && num > 0 && num < 25,
    });

    const path = resolve(`./${day}/index.js`);

    importFresh(path);
}

(() => init())();
