import * as fs from "node:fs/promises";

(async () => {
  const input = await fs.readFile("./day3/input", { encoding: "utf8" });
  //console.log(input);
  //const lines = input.split("\n");

  /* async function check() {}
  const mul = "mul(";

  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      for (let x = 0; i < mul.length; i++) {
        if (line[i] == mul[x]) {
          i++;
          console.log(``);
          continue;
        } else break;
      }
    }
  } */

  let p1result = 0;
  let p2result = 0;
  //let active = true;

  console.log(input);
  //const mulMatches = line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const doPattern = /(do|don't)\(\)/dg;

  let doArray;
  let current = "do()";
  const indexArray: number[] = [];
  while ((doArray = doPattern.exec(input)) !== null) {
    //console.log(doArray);
    console.log(
      `Found ${doArray[0]} at index ${doArray.index} that ends at index ${doArray.indices![0][1]}. `
    );
    if (current != doArray[0]) {
      indexArray.push(doArray.index);
      current = doArray[0];
    }
  }
  console.log(`\n`);

  /* for (const match of mulMatches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, n1, n2] = match;
      //console.log(`${n1} ${n2}`);
      p1result += parseInt(n1) * parseInt(n2);

      //p2
      for (let i = 0; i < indexArray.length; i++) {}
    } */

  //let firstRun = true;
  let mulArray;
  while ((mulArray = mulPattern.exec(input)) !== null) {
    p1result += parseInt(mulArray[1]) * parseInt(mulArray[2]);

    const index = mulArray.index;
    //console.log(doArray)
    console.log(
      `found ${mulArray[0]} on index ${index}! checking if we're enabled...`
    );

    async function check() {
      // if there's no next
      if (!indexArray[0]) return true;
      if (index < indexArray[0]) {
        //console.log(`yes! under first don't`);
        return true;
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
      //
      console.log(index);
      console.log(indexArray[0]);
      console.log(indexArray[1]);
      console.log(`we shouldn't have reached this point, wtf?`);
    }

    if (await check())
      p2result += parseInt(mulArray[1]) * parseInt(mulArray[2]);

    /* if (mulArray.index < indexArray[0] && mulArray.index > indexArray[1]) {
        console.log(`yes! we're `);
        p2result += parseInt(mulArray[1]) * parseInt(mulArray[2]);
        indexArray.splice(0, 2);
      } */
    // doArr:   [23,    50, 66,    77]
    //           don't  do  don't  do
    // index must NOT be in between doArr[0] and doArr[1]
    // first, it must not be
  }
  console.log(`part 1 multiplication sum: ${p1result}`);
  console.log(`part 2 multiplication sum: ${p2result}`);
})();
