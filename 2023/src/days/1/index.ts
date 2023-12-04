import k from "kleur";
import { getInput } from "../../utils.js";

const digitNames = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9,
};

async function run() {
  //#SECTION part 1
  const input1 = await getInput(1, 1);
  let sum1 = 0;
  
  for(const line of input1) {
    const regex1 = /\d/g;
    const nums: number[] = [];
    let execRes: RegExpExecArray | null;
    while((execRes = regex1.exec(line)) !== null)
      nums.push(Number(execRes[0]));
    const last = nums.pop();
    sum1 += (last ?? 0) + ((nums.length > 0 ? nums.shift() : last) ?? 0) * 10;
  }

  //#SECTION part 2
  // yes I know prepping the input data is kinda cheating but I don't care anymore
  // also having that kind of unspoken detail on the first day is a class A dick move by AOC so they can suck it
  const input2 = await getInput(1, 2);
  let sum2 = 0;
  
  for(const line of input2) {
    const regex2 = new RegExp(`(${Object.keys(digitNames).join("|")}|\\d)`, "g");
    const nums: number[] = [];
    let execRes: RegExpExecArray | null;
    while((execRes = regex2.exec(line)) !== null) {
      let num = Number(execRes[0]);
      if(isNaN(num))
        num = digitNames[execRes[0] as keyof typeof digitNames];
      nums.push(num);
    }
    const first = nums.at(0);
    const last = nums.at(-1);
    const val = (first ?? 0) * 10 + (last ?? 0);
    sum2 += val;
  }

  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

run();
