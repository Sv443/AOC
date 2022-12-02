import { readFile } from "fs-extra";
import k from "kleur";
import { resolve } from "path";

// A & X - Rock     - 1 point
// B & Y - Paper    - 2 points
// C & Z - Scissors - 3 points

// outcomes:
// lose: 0 points
// draw: 3 points
// win:  6 points

const bigFile = false;
const inputPath = resolve(`./src/days/2/input${bigFile ? "_chungus" : ""}.txt`);

async function partOne() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => ([ l.split(/\s/)[0]!, l.split(/\s/)[1]! ]));

    let score = 0;
    for(const [opp, my] of pairs as [string, string][])
        score += calcScore(opp, my);

    console.log(k.green("Part 1 score: ") + k.yellow(score));
    console.log(k.gray("Time:         " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

function isDraw(opp: string, my: string) {
    return opp === "A" && my === "X"
        || opp === "B" && my === "Y"
        || opp === "C" && my === "Z";
}

function calcScore(opp: string, my: string) {
    let score = 0;

    switch(my) {
    case "X":
        score += 1;
        if(opp === "C")
            score += 6;
        break;
    case "Y":
        score += 2;
        if(opp === "A")
            score += 6;
        break;
    case "Z":
        score += 3;
        if(opp === "B")
            score += 6;
        break;
    }

    if(isDraw(opp, my))
        score += 3;

    return score;
}


//#MARKER part 2


const winTable: Record<string, string> = {
    "A": "Y",
    "B": "Z",
    "C": "X",
};
const lossTable: Record<string, string> = {
    "A": "Z",
    "B": "X",
    "C": "Y",
};
const oppToMy: Record<string, string> = {
    "A": "X",
    "B": "Y",
    "C": "Z",
};

async function partTwo() {
    const startTs = Date.now();
    const input = String(await readFile(inputPath));
    const lines = input.split(/\n/gm);
    const pairs = lines.map(l => ([ l.split(/\s/)[0]!, l.split(/\s/)[1]! ]));

    let score = 0;
    for(const [opp, act] of pairs as [string, string][]) {
        let my = "";
        switch(act) {
        case "X": // lose
            my = lossTable[opp]!;
            break;
        case "Y": // draw
            my = oppToMy[opp]!;
            break;
        case "Z": // win
            my = winTable[opp]!;
            break;
        }
        score += calcScore(opp, my);
    }

    console.log(k.green("Part 2 score: ") + k.yellow(score));
    console.log(k.gray("Time:         " + ((Date.now() - startTs) / 1000).toFixed(3) + "s"));
    console.log();
}

(async () => {
    await partOne();
    await partTwo();
})();
