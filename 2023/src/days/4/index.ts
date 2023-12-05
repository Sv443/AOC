import k from "kleur";
import { getInput } from "../../utils.js";

const aocDay = Number(import.meta.url.split("/").at(-2)! ?? 0);

async function run() {
  const input = await getInput(aocDay, "");
  // const input = await getInput(aocDay, "_s");

  //#SECTION part 1

  const cardSums = [] as number[];

  for(const line of input) {
    let cardPoints = 0;

    const numsStr = line.split(":")[1]!.trim();
    const [winningStr, cardStr] = numsStr.split("|").map(s => s.trim()) as [string, string];

    const winningNums = winningStr.split(/\s+/g).map(Number);
    const cardNums = cardStr.split(/\s+/g).map(Number);

    for(const cardNum of cardNums) {
      if(winningNums.includes(cardNum))
        cardPoints = (cardPoints === 0 ? 0.5 : cardPoints) * 2;
    }
    cardSums.push(cardPoints);
  }

  const sum1 = cardSums.reduce((a, b) => a + b, 0);
  
  // //#SECTION part 2
  // let sum2 = 0;

  console.log(`${k.green("Part 1:")} ${k.yellow(sum1)}`);
  // console.log(`${k.green("Part 2:")} ${k.yellow(sum2)}`);
}

run();
