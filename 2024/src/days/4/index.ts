import k from "kleur";
import { getInputLines } from "@/utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2) ?? 0);
  // const lines = await getInputLines(aocDay);
  const lines = await getInputLines(aocDay, "_s");

  //#region part 1
  let res1 = 0;
  {
    const grid: string[][] = [];

    const rowLength = lines[0]!.length;
    const emptyRow = Array.from({ length: rowLength + 2 }).map(() => "_");

    grid.push(emptyRow);
    for(const line of lines)
      grid.push(["_", ...line.split(""), "_"]);
    grid.push(emptyRow);

    for(let y = 1; y < grid.length - 1; y++)
      for(let x = 1; x < rowLength - 1; x++)
        if(hasXmasRecursive(grid, x, y))
          res1++;
  }

  //#region part 2
  let res2 = 0;
  {

  }

  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
  console.log();
}

const xmasChars = ["X", "M", "A", "S"];

function hasXmasRecursive(grid: string[][], x: number, y: number, charIdx = 0, dirX = 0, dirY = 0): boolean {
  // if charIdx === 4 then return true
  // if charIdx === 0 && grid[y][x] === xmasChars[0] then recurse, else return false
  // check if xmasChars[charIdx] is in any of the 8 neighbors of grid[y][x] then recurse with coords of neighbor, else return false

  if(charIdx === 4) {
    console.log(">>>>>>>> has xmas");
    return true;
  }
  else if(charIdx === 0 && grid[y][x] === xmasChars[0]) {
    console.log("> start", x, y, "has char", grid[y][x]);
    return hasXmasRecursive(grid, x, y, charIdx + 1, dirX, dirY);
  }
  else if(charIdx > 0) {
    console.log("  > chk", x, y, "for char", xmasChars[charIdx], "in dir", dirX, dirY);

    for(const [nx, ny] of getNeighborCoords(x, y, dirX, dirY)) {
      console.log("    > gc", x, y, "nc", nx, ny, "-", grid[ny][nx], "=", xmasChars[charIdx], grid[ny][nx] === xmasChars[charIdx]);
      if(grid[ny][nx] === xmasChars[charIdx])
        return hasXmasRecursive(grid, nx, ny, charIdx + 1, nx - x, ny - y);
    }
  }

  return false;
}

function getNeighborCoords(x: number, y: number, dirX: number, dirY: number): [x: number, y: number][] {
  if(dirX !== 0 || dirY !== 0)
    return [[x + dirX, y + dirY]];
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];
}

run();
