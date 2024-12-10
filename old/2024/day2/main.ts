import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./2024/day2/input", { encoding: "utf8" });
  //console.log(input);
  const lines = input.split("\n");
  let safep1 = 0;
  let safep2 = 0;
  for (const line of lines) {
    //console.log(line);
    const splitLine = line.split(" ");
    const ogIntArray: number[] = [];
    for (const number of splitLine) ogIntArray.push(parseInt(number));

    let intArray = [...ogIntArray];

    let unsafep1 = false;
    let unsafep2 = false;

    async function check(intArray: number[]) {
      async function incdecCheck() {
        const intArrayInc = intArray.toSorted((a, b) => {
          return a - b;
        });
        const intArrayDec = intArray.toSorted((a, b) => {
          return b - a;
        });

        const increasingCheck = intArray.toString() == intArrayInc.toString();
        const decreasingCheck = intArray.toString() == intArrayDec.toString();

        return increasingCheck || decreasingCheck;
      }

      async function diffCheck() {
        let difference = 0;
        for (let i = 0; i + 1 < intArray.length; i++) {
          difference = Math.abs(intArray[i + 1] - intArray[i]);
          /* console.log(
            `difference of ${difference} between ${intArray[i]} and ${intArray[i + 1]}`
          ); */
          if (!(difference == 1 || difference == 2 || difference == 3))
            return false;
        }
        return true;
      }

      const incdecPass = await incdecCheck();
      const diffPass = await diffCheck();

      return { incdecPass, diffPass };
    }

    const result = await check(intArray);
    //console.log(result);

    //console.log(`diff: ${result.diffPass}`);
    //console.log(`increasing: ${result.incdecPass}`);
    //console.log(`decreasing: ${result.incdecPass}`);

    //console.log(`safe: ${result.diffPass && result.incdecPass}`);

    if (!(result.diffPass && result.incdecPass)) {
      unsafep1 = true;
      unsafep2 = true;

      // lets try to fix it for part 2
      for (let i = 0; i < ogIntArray.length; i++) {
        intArray.splice(i, 1);
        //console.log(`new array: ${intArray}`);
        const result = await check(intArray);
        if (result.diffPass && result.incdecPass) {
          unsafep2 = false;
          break;
        }
        intArray = [...ogIntArray];
      }
    }

    if (!unsafep1) safep1++;
    //console.log(`part 1 safe: ${!unsafep1} line: ${ogIntArray}`);
    if (!unsafep2) safep2++;
    //console.log(`part 2 safe: ${!unsafep2} line: ${ogIntArray}\n`);
    unsafep1 = false;
    unsafep2 = false;
  }
  console.log(`part 1 total safe reports: ${safep1}`);
  console.log(`part 2 total safe reports: ${safep2}`);
})();
