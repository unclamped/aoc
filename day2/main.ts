import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./day2/input", { encoding: "utf8" });
  //console.log(input);
  const lines = input.split("\n");
  //console.log(lines)
  const inputNumbers: number[][] = [];
  let safe = 0;
  for (const line of lines) {
    //console.log(line);
    const splitLine = line.split(" ");
    //console.log(splitLine)
    const intArray: number[] = [];
    for (const number of splitLine) intArray.push(parseInt(number));
    const intArrayAscending = intArray.toSorted((a, b) => {
      return a - b;
    });
    //console.log(`intArrayAsc: ${intArrayAscending}`);
    const intArrayDescending = intArray.toSorted((a, b) => {
      return b - a;
    });
    //console.log(`intArrayDesc: ${intArrayDescending}`);
    inputNumbers.push(intArray);
    //console.log(intArray);
    //console.log(intArray.length);
    let unsafe = false;
    for (let i = 0; i + 1 < intArray.length; i++) {
      const difference = Math.abs(intArray[i + 1] - intArray[i]);
      /* console.log(intArray);
      console.log(intArrayAscending);
      console.log(intArrayDescending); */
      // is there a cleaner way to write this?
      if (
        intArray.toString() != intArrayAscending.toString() &&
        intArray.toString() != intArrayDescending.toString()
      ) {
        console.log(`line failed because of increasing decreasing`);
        unsafe = true;
        break;
      }
      if (!(difference == 1 || difference == 2 || difference == 3)) {
        console.log(
          `line failed because of difference. difference here was ${difference}`
        );
        unsafe = true;
        break;
      }
    }
    if (!unsafe) safe++;
    console.log(`safe: ${!unsafe} line: ${intArray}\n`);
    unsafe = false;
  }
  console.log(`part 1 total safe reports: ${safe}`);
})();
