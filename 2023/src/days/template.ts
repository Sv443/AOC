import k from "kleur";
import { getInput } from "../../utils";

async function run() {
  const input = await getInput(3, "");
  const inputS = await getInput(3, "_s");

  //#SECTION part 1
  let sum1 = 0;
  
  //#SECTION part 2
  let sum2 = 0;

  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

run();
