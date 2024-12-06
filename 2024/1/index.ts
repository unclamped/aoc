import { run } from "@aockit/core";

const parse = (lines: string[]) => {
  const leftCol = [];
  const rightCol = [];
  for (const line of lines) {
    const splitLine = line.split("   ");
    leftCol.push(parseInt(splitLine[0]));
    rightCol.push(parseInt(splitLine[1]));
  }

  leftCol.sort((a, b) => {
    return a - b;
  });
  rightCol.sort((a, b) => {
    return a - b;
  });

  return { leftCol, rightCol };
  // console.log(leftCol)
  // console.log(rightCol)
};

run({
  part1({ readInput }) {
    const lines = readInput("lines");

    const { leftCol, rightCol } = parse(lines);
    // part 1
    let p1result = 0;
    for (let i = 0; i < leftCol.length; i++) {
      /* //original solution
          let bigNum = leftCol[i] > rightCol[i] ? leftCol[i] : rightCol[i]
          let smallNum = leftCol[i] < rightCol[i] ? leftCol[i] : rightCol[i]
          // console.log(bigNum - smallNum)
          p1result += bigNum - smallNum */
      // suggested improvement by @krypciak, thanks!
      p1result += Math.abs(leftCol[i] - rightCol[i]);
      // console.log (leftCol[i] + ' ' + rightCol[i])
    }

    return p1result;
  },
  part2({ readInput }) {
    const lines = readInput("lines");
    const { leftCol, rightCol } = parse(lines);
    // part 2
    let p2result = 0;
    // apparently, I can improve time complexity with the map function,
    // I need to look this up further later
    for (let i = 0; i < leftCol.length; i++) {
      let matches = 0;
      for (let x = 0; x < rightCol.length; x++) {
        if (leftCol[i] == rightCol[x]) matches++;
      }
      p2result += leftCol[i] * matches;
    }

    return p2result;
  }
});
