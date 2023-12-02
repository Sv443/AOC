import k from "kleur";
import { getInput } from "../../utils";

const cubesInBag = {
  red: 12,
  green: 13,
  blue: 14,
};

async function run() {
  //#SECTION part 1
  const input = await getInput(2, "");
  let sum1 = 0;

  for(const line of input) {
    const gameNumRegex = /Game (\d+)/g;
    const gameNum = Number(gameNumRegex.exec(line)?.[1]);

    const gameScores = line.split(":")[1]!
      .split(";")
      .map(s => 
        s.split(",").map(v => v.trim()),
      );

    let gameValid = true;
    for(const score of gameScores) {
      const cubesGrabbed = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for(const cube of score) {
        const [amount, color] = cube.split(" ");
        cubesGrabbed[color as keyof typeof cubesGrabbed] += Number(amount);
      }
      for(const [color, value] of Object.entries(cubesGrabbed)) {
        if(value > cubesInBag[color as keyof typeof cubesInBag])
          gameValid = false;
      }
    }
    if(gameValid)
      sum1 += gameNum;
  }

  //#SECTION part 2

  let sum2 = 0;

  for(const line of input) {
    const gameScores = line.split(":")[1]!
      .split(";")
      .map(s => 
        s.split(",").map(v => v.trim()),
      );

    const fewestCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for(const score of gameScores) {
      const cubesGrabbed = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for(const cube of score) {
        const [amount, color] = cube.split(" ");
        cubesGrabbed[color as keyof typeof cubesGrabbed] += Number(amount);
      }
      for(const [color, value] of Object.entries(cubesGrabbed)) {
        if(value > fewestCubes[color as keyof typeof fewestCubes] && value > 0)
          fewestCubes[color as keyof typeof fewestCubes] = value;
      }
    }

    const vals = Object.values(fewestCubes);
    const initVal = vals.shift()!;
    sum2 += vals.reduce((a, c) => a * c, initVal);
  }

  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

run();
