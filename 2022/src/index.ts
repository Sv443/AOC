import { pathExists, readdir } from "fs-extra";
import k from "kleur";
import { join, resolve } from "path";
import prompt from "prompts";

const daysPath = resolve("./src/days/");
const outDaysPath = resolve("./out/src/days/");

async function run() {
    let runDayNum: number;

    const dayArg = process.argv.find(v => v.match(/^\d+$/gm));
    const latest = process.argv.find(v => v.match(/^--?l(atest)?$/gm));

    if(!dayArg || latest) {
        const days = await getDays();

        if(!latest) {
            const { runDay } = await prompt({
                type: "select",
                name: "runDay",
                message: "Choose which day to run",
                choices: days.map(day => ({ title: `Day ${day}`, value: day })),
            });

            runDayNum = parseInt(runDay);
        }
        else {
            runDayNum = Number(days.at(-1) ?? NaN);
        }
    }
    else
        runDayNum = parseInt(dayArg);

    if(runDayNum === undefined || isNaN(runDayNum)) {
        console.error(k.yellow("No day chosen. Exiting."));
        process.exit(0);
    }

    const importPath = join(outDaysPath, `/${runDayNum}/index.js`);
    if(!(await pathExists(importPath))) {
        console.error(k.red(`Couldn't run day ${runDayNum}:\n`) + `File '${importPath}' doesn't exist\n`);
        process.exit(1);
    }

    console.log(`Running the code of day ${runDayNum}...\n`);
    await import(importPath);
}

async function getDays() {
    return (await readdir(daysPath))
        .sort((a, b) => parseInt(a) < parseInt(b) ? -1 : 1)
        .map(day => parseInt(day));
}

run();
