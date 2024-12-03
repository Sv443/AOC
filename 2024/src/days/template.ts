import k from "kleur";
import { getInputLines } from "@/utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2)! ?? 0);
  const lines = await getInputLines(aocDay);
  // const input = await getInput(aocDay, "_s");

  //#region part 1
  let res1 = 0;
  {

  }

  //#region part 2
  let res2 = 0;
  {

  }

  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
}

run();
