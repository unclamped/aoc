import * as fs from "node:fs/promises";

(async () => {
  const input = await fs.readFile("./day3/input", { encoding: "utf8" });

  let p1result = 0;
  let p2result = 0;

  // console.log(input);
  const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const doPattern = /(do|don't)\(\)/dg;

  let doArray;
  let current = "do()";
  const indexArray: number[] = [];
  while ((doArray = doPattern.exec(input)) !== null) {
    //console.log(doArray);
    /* console.log(
      `Found ${doArray[0]} at index ${doArray.index} that ends at index ${doArray.indices![0][1]}. `
    ); */
    if (current != doArray[0]) {
      indexArray.push(doArray.index);
      current = doArray[0];
    }
  }
  // console.log(`\n`);

  let mulArray;
  while ((mulArray = mulPattern.exec(input)) !== null) {
    p1result += parseInt(mulArray[1]) * parseInt(mulArray[2]);

    const index = mulArray.index;
    /* console.log(
      `Found ${mulArray[0]} at index ${index}! checking if we're enabled...`
    ); */

    async function check() {
      // if there's no next element, then the last was a do()
      if (!indexArray[0]) {
        //console.log(`yes! no next element`);
        return true;
      }

      if (index < indexArray[0]) {
        //console.log(`yes! under first don't`);
        return true;
      }
      if (indexArray[0] && !indexArray[1]) {
        //console.log(`nop, one element left`);
        return false;
      }
      if (index > indexArray[0] && index < indexArray[1]) {
        //console.log(`nop, above first element and under last element`);
        return false;
      }
      if (index > indexArray[1]) {
        //console.log(`maybe, above last element. checking again`);
        indexArray.splice(0, 2);
        return await check();
      }
      // we shouldn't have reached this point, wtf?
      // no one's gonna read this, but I wonder if there's
      // any edge case where this could possibly be reached
      return false;
    }

    if (await check())
      p2result += parseInt(mulArray[1]) * parseInt(mulArray[2]);
  }
  console.log(`part 1 multiplication sum: ${p1result}`);
  console.log(`part 2 multiplication sum: ${p2result}`);
})();
