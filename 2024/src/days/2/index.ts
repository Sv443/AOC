import k from "kleur";
import { getInputLines } from "@/utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2) ?? 0);
  const lines = await getInputLines(aocDay);

  //#region part 1
  let res1 = 0;
  {
    for(const report of lines) {
      let safe = true;
      const nums = report.split(/\s+/).map(Number);

      let dir = 0;
      for(let i = 0; i < nums.length; i++) {
        if(i === 0)
          continue;

        const num1 = nums[i - 1]!;
        const num2 = nums[i]!;

        if(num2 >= num1) {
          if(dir === 0)
            dir = 1;
          else if(dir === -1) {
            safe = false;
            continue;
          }

          if(num2 - num1 > 3 || num2 - num1 < 1) {
            safe = false;
            continue;
          }
        }
        else if(num2 <= num1) {
          if(dir === 0)
            dir = -1;
          else if(dir === 1) {
            safe = false;
            continue;
          }

          if(num1 - num2 > 3 || num1 - num2 < 1) {
            safe = false;
            continue;
          }
        }
      }
      safe && res1++;
    }
  }

  //#region part 2
  let res2 = 0;
  {

  }

  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
  console.log();
}

run();
