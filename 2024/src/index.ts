import { readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import k from "kleur";
import prompt from "prompts";
import { fileExists } from "./utils.js";

const daysPath = resolve("./src/days/");

async function run() {
  let runDayNum: number;

  const dayArg = process.argv.find(v => /^\d+$/gm.test(v.trim()));
  const latest = process.argv.find(v => /^--?l(atest)?$/gm.test(v.trim()));

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
    else
      runDayNum = Number(days[0]);
  }
  else
    runDayNum = parseInt(dayArg);

  if(runDayNum === undefined || isNaN(runDayNum)) {
    console.error(k.yellow("No day chosen. Exiting."));
    process.exit(0);
  }

  const importPath = join(daysPath, `/${runDayNum}/index.ts`);
  if(!(await fileExists(importPath))) {
    console.error(k.red(`Couldn't run day ${runDayNum}:\n`) + `File '${importPath}' doesn't exist\n`);
    process.exit(1);
  }

  console.log(`Running day ${runDayNum}'s code (at '${relative(".", importPath)}'):\n`);
  await import(importPath.startsWith("file") ? importPath : `file://${importPath}`);
}

/** Returns an array of all available days */
async function getDays(reverse = true) {
  const revFac = reverse ? -1 : 1;
  return (await readdir(daysPath))
    .sort((a, b) => parseInt(a) < parseInt(b) ? -1 * revFac : 1 * revFac)
    .map(day => parseInt(day))
    .filter(day => !isNaN(day));
}

run();
