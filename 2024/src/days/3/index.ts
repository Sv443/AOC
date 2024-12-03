import k from "kleur";
import { getInput } from "@/utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2) ?? 0);
  const input = await getInput(aocDay);

  //#region part 1
  let res1 = 0;
  {
    let execRes: RegExpExecArray | null;
    const re = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    while((execRes = re.exec(input)) !== null) {
      const [_, a, b] = execRes;
      res1 += Number(a) * Number(b);
    }
  }

  //#region part 2
  let res2 = 0;
  {
    let execRes: RegExpExecArray | null;
    let doEnabled = true;
    const re = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/gm;
    while((execRes = re.exec(input)) !== null) {
      const [_, match, a, b] = execRes;

      if(!match)
        continue;

      if(match.startsWith("don't"))
        doEnabled = false;
      else if(match.startsWith("do"))
        doEnabled = true;
      else if(doEnabled)
        res2 += Number(a) * Number(b);
    }
  }

  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
  console.log();
}

run();
