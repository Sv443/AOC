import k from "kleur";
import { getInputLines } from "@/utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2) ?? 0);
  const lines = await getInputLines(aocDay);

  //#region part 1
  const res1 = doPart1(lines);

  //#region part 2
  let res2 = 0;
  {

  }

  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
  console.log();
}

enum Rot {
  Up,
  Right,
  Down,
  Left,
}

async function doPart1(lines: string[]): number {
  let grdX = 0,
    grdY = 0,
    grdR = Rot.Up;

  const pos = new Set<string>();
  // pos.add(`${x},${y}`);

  // find initial guard pos
  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[0].length; x++) {
      if(lines?.[y]?.[x] === "^") {
        grdX = x;
        grdY = y;
      }
    }
  }

  let iters = 0;
  while(true) {
    iters++;
    if(iters > 10000)
      break;

    // add visited pos
    pos.add(`${grdX},${grdY}`);

    let newX = grdX,
      newY = grdY;

    // try to move guard
    if(grdR === 0)
      newY--;
    else if(grdR === 1)
      newX++;
    else if(grdR === 2)
      newY++;
    else if(grdR === 3)
      newX--;

    // if new pos is obstacle, backtrack and rotate CW
    if(lines?.[grdY]?.[grdX] === "#") {
      if(grdR === 0)
        newY++;
      else if(grdR === 1)
        newX--;
      else if(grdR === 2)
        newY--;
      else if(grdR === 3)
        newX++;

      grdR++;
      if(grdR >= 4)
        grdR = 0;
    }

    // guard reached edge
    if(newX > lines.length || newX < 0
      || newY > lines[0].length || newY < 0)
      break;
  }

  return [...pos].reduce((a, c) => a + c, 0);
}

run();
