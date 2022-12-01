import { readFile } from "fs-extra";
import k from "kleur";
import { resolve } from "path";

async function run() {
    const input = String(await readFile(resolve("./src/days/1/input.txt")));
    const rawInventories = input.split(/\n\n/gm);
    const inventories = rawInventories.map(invStr =>
        invStr.split(/\n/gm)
            .map(numCalories => parseInt(numCalories.trim()))
            .filter(num => !isNaN(num)),
    );
    const added = inventories.map(inv => inv.reduce((a, c) => a + c, 0));
    const sorted = added.sort((a, b) => a < b ? 1 : -1);

    console.log(k.green("Top 1 amount: "), k.yellow(sorted.at(0) ?? "(error)"));
    console.log(k.green("Top 3 amount: "), k.yellow(sorted.slice(0, 3).reduce((a, c) => a + c, 0)));
    console.log();
}

run();
