import k from "kleur";
import { getInput } from "../../utils.js";

async function run() {
  //#SECTION part 1
  const input1 = await getInput(1);


  //#SECTION part 2
  let input2 = await getInput(1);


  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

run();
