import { readFile } from "fs-extra";
import k from "kleur";
import { resolve } from "path";
import { halves, removeDuplicates } from "svcorelib";

const bigFile = false;
const inputPath = resolve(`./src/days/3/input${bigFile ? "_chungus" : ""}.txt`);

async function partOne() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => halves(l.split("")));
    const lookupPairs = pairs.map(([h1, h2]) => ([ h1, h2.join("") ]));

    let score = 0;
    for(const [chars, str] of lookupPairs as [string[], string][])
        score += getScore(chars, str);

    console.log(k.green("Part 1 result: ") + k.yellow(score));
    console.log(k.gray("Time:          " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

function getScore(chars: string[], str: string) {
    let letter = "";
    for(const char of chars)
        if(str.includes(char))
            letter = char;
    return getLetterScore(letter);
}

function getLetterScore(letter: string) {
    let offset = 96;
    if(letter.match(/[A-Z]/))
        offset = 38;
    return letter.charCodeAt(0) - offset;
}

//#MARKER part two

async function partTwo() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => removeDuplicates(l.split("")));
    const groups = [];

    while(pairs.length > 0)
        groups.push(pairs.splice(0, 3));

    let score = 0;
    for(const grp of groups as [string[],string[],string[]][]) {
        // optimisation: iterate over the smallest array of the three
        let commonChar = "";
        for(const char of grp[0])
            if(grp[1].find(c => c === char) && grp[2].find(c => c === char))
                commonChar = char;
        score += getLetterScore(commonChar);
    }

    console.log(k.green("Part 2 result: ") + k.yellow(score));
    console.log(k.gray("Time:          " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

(async () => {
    await partOne();
    await partTwo();
})();
