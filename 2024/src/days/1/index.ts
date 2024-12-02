import k from "kleur";
import { getInput } from "../../utils.js";

async function run() {
  const aocDay = Number(import.meta.url.split("/").at(-2)! ?? 0);
  const input = await getInput(aocDay);

  //#SECTION part 1
  let res1 = 0;
  {
    const list1 = [] as number[];
    const list2 = [] as number[];

    for(const line of input) {
      const [num1, num2] = line.split(/\s+/).map(Number);
      typeof num1 === "number" && list1.push(num1);
      typeof num2 === "number" && list2.push(num2);
    }

    list1.sort();
    list2.sort();

    for(let i = 0; i < list1.length; i++)
      res1 += Math.abs(list1[i]! - list2[i]!);
  }

  //#SECTION part 2
  let res2 = 0;
  {
    const list1 = [] as number[];
    const list2 = [] as number[];

    for(const line of input) {
      const [num1, num2] = line.split(/\s+/).map(Number);
      typeof num1 === "number" && list1.push(num1);
      typeof num2 === "number" && list2.push(num2);
    }

    for(const num of list1)
      res2 += num * list2.filter(n => n === num).length;
  }


  console.log(`${k.green("Part 1:")} ${k.yellow(res1)}`);
  console.log(`${k.green("Part 2:")} ${k.yellow(res2)}`);
}

run();
