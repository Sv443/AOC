import k from "kleur";
import { clamp } from "svcorelib";
import { getInput } from "../../utils";

const symbolRegex = /[^\d.]/gm;

async function run() {
  const input = await getInput(3, "");
  // const input = await getInput(3, "_s");

  //#SECTION part 1
  let sum1 = 0;
  const line1Regex = /\d+/g;

  input.forEach((line, lineIdx) => {
    const startIndices = [] as number[];
    let execRes: RegExpExecArray | null;
    while((execRes = line1Regex.exec(line)) !== null)
      startIndices.push(Number(execRes.index));

    for(const startIdx of startIndices) {
      let endIdx;
      for(let i = startIdx; i < line.length; i++) {
        if(line[i]?.match(/\d/))
          endIdx = i;
        else break;
      }

      if(endIdx) {
        const num = Number(line.slice(startIdx, endIdx + 1));
        if(symbolAdjacent(input, lineIdx, startIdx, endIdx)) {
          sum1 += num;
        }
      }
    }
  });
  
  //#SECTION part 2
  const line2Regex = /\d+/g;
  const gearData = [] as ({ gearX: number, gearY: number, numbers: number[] })[];

  input.forEach((line, lineIdx) => {
    const startIndices = [] as number[];
    let execRes: RegExpExecArray | null;
    while((execRes = line2Regex.exec(line)) !== null)
      startIndices.push(Number(execRes.index));

    for(const startIdx of startIndices) {
      let endIdx;
      for(let i = startIdx; i < line.length; i++) {
        if(line[i]?.match(/\d/))
          endIdx = i;
        else break;
      }

      if(endIdx) {
        const num = Number(line.slice(startIdx, endIdx + 1));
        const gearIndices = adjacentGearIndices(input, lineIdx, startIdx, endIdx);
        if(gearIndices !== null) {
          const [gearY, gearX] = gearIndices;

          const gearDataIdx = gearData.findIndex(gear => gear.gearX === gearX && gear.gearY === gearY);
          if(gearDataIdx >= 0) {
            gearData[gearDataIdx]!.numbers.push(num);
          }
          else {
            gearData.push({
              gearX,
              gearY,
              numbers: [num],
            });
          }
        }
      }
    }
  });

  const validGearData = gearData.filter(gear => gear.numbers.length === 2);
  const sum2 = validGearData.reduce((acc, gear) => acc + (gear.numbers[0]! * gear.numbers[1]!), 0);

  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

/** Checks if a symbol is adjacent in a 3x3 area */
function symbolAdjacent(lines: string[], lineIdx: number, startIdx: number, endIdx: number): boolean {
  const linesMaxIdx = lines.length - 1;
  for(let y = clamp(lineIdx - 1, 0, linesMaxIdx); y <= clamp(lineIdx + 1, 0, linesMaxIdx); y++) {
    const line = lines[y]!;
    for(let x = clamp(startIdx - 1, 0, line.length - 1); x <= clamp(endIdx + 1, 0, line.length - 1); x++) {
      const char = line[x]!;
      if(char.match(symbolRegex))
        return true;
    }
  }
  return false;
}

/** Checks if a gear (*) is adjacent in a 3x3 area and returns its indices [y, x] or else null */
function adjacentGearIndices(lines: string[], lineIdx: number, startIdx: number, endIdx: number): [number, number] | null {
  const linesMaxIdx = lines.length - 1;
  for(let y = clamp(lineIdx - 1, 0, linesMaxIdx); y <= clamp(lineIdx + 1, 0, linesMaxIdx); y++) {
    const line = lines[y]!;
    for(let x = clamp(startIdx - 1, 0, line.length - 1); x <= clamp(endIdx + 1, 0, line.length - 1); x++) {
      const char = line[x]!;
      if(char === "*")
        return [y, x];
    }
  }
  return null;
}

run();
