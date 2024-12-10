import { readFile } from "node:fs/promises";

(async () => {
  const input = await await readFile("./2024/day9/input", {
    encoding: "utf8"
  });
  console.log(input);
  const filesystem: number[][] = [];
  const emptyIndexes: number[] = [];
  const filledIndexes: number[] = [];
  let even = false;
  let id = 0;
  let p1result = 0;

  for (const char of input) {
    //console.log(`currently reading char ${char}`);
    let amountPushed = 0;
    if (!even) {
      let filledBlocks = parseInt(char);
      while (filledBlocks != 0) {
        //console.log(`pushing id block!`);
        filesystem.push([id]);
        filledBlocks--;
        amountPushed++;
      }
      id++;
    } else {
      let emptyBlocks = parseInt(char);
      while (emptyBlocks != 0) {
        //console.log(`pushing empty block!`);
        filesystem.push([]);
        emptyBlocks--;
        amountPushed++;
      }
    }
    even = !even;
    //console.log(`pushed ${amountPushed} blocks!`);
    //console.log(filesystem);
  }

  // this could've been optimized, we could've done it previously, but whatevs, brain fried
  filesystem.forEach((_el, idx) => {
    if (_el.length == 0) emptyIndexes.push(idx);
    else filledIndexes.push(idx);
  });

  //console.log(``);
  //console.log(emptyIndexes);
  //console.log(filledIndexes);
  /* for (let i = filledIndexes.length - 1; i > -1; i--) {
    console.log(`empty indexes are ${emptyIndexes}`);
    console.log(
      `checking index ${filledIndexes[i]}, which is ${filesystem[filledIndexes[i]]}. moving to empty index ${emptyIndexes[0]}`
    );
    //console.log(filledIndexes[i]);
    filesystem[emptyIndexes[0]] = filesystem[filledIndexes[i]];
    filesystem[filledIndexes[i]] = [];
    emptyIndexes.shift();
  } */

  // defragging
  for (let i = 0; i < emptyIndexes.length; i++) {
    const filledIndex = filledIndexes[filledIndexes.length - 1];
    //console.log("asdas");
    /* console.log(filesystem.slice(0, filledIndex));
    console.log(
      filesystem.slice(0, filledIndex).findIndex((_el) => _el.length == 0)
    ); */
    if (
      filesystem.slice(0, filledIndex).findIndex((_el) => _el.length == 0) == -1
    )
      break;
    if (filledIndex == undefined) break;
    //console.log(
    //  `checking index ${filledIndex}, which is ${filesystem[filledIndex]}. moving to empty index ${emptyIndexes[i]}`
    //);
    filesystem[emptyIndexes[i]] = filesystem[filledIndex];
    filesystem[filledIndex] = [];
    filledIndexes.pop();
    if (filesystem.findIndex((_el) => _el.length == 0) == -1) {
      //console.log(`woohoo!`);
      break;
    }
    //console.log(filesystem);
    //console.log("\n");
  }

  //console.log("\n");
  //console.log(filesystem);

  const lastFileIndex = filesystem.findIndex((_el) => _el.length == 0) - 1;

  for (let i = 0; i < lastFileIndex + 1; i++) {
    p1result += i * filesystem[i][0];
  }

  console.log(`part 1 multiplication sum: ${p1result}`);
  /*

    [[0],          [], [], [1], [1], [1], [], [], [], [], [2], [2], [2], [2], [2]]
      ID of block  Empty block

    Iterate through every character, keep a count so we can detect even ones (make it be 0 or 1,
    if it is 0 we push an element to our main array that includes the ID and the number. if it
    is 1, we add an empty array for number amount of times)

    Then, we check all empty spaces and push them to a separate array.

    numberArray.forEach((_el, idx) =>{
      if (_el.length == 0) emptyIndexes.push([idx])
      else filledIndexes.push([idx])
    })
    
    Then, we make a new iteration, starting from the last element of the filledArray
    (let i = filledArray.length; i > 0; i--). Then we replace the first empty element of
    numberArray by the current element of filledArray. this can be done by
    filesystem[emptyIndexes[0]] = filesystem[filledIndexes[i]]- once that's done, mark the
    current element as empty, so numberArray[filledArray[i]] = []. Finally, remove the first
    element of emptyArray so emptyArray.shift()
  */
})();
