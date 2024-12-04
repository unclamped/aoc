import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./day4/input", { encoding: "utf8" });
  //console.log(input);
  const lines = input.split("\n");
  let p1result = 0;
  for (let i = 0; i < lines.length; i++) {
    // lines[i] is the line
    // lines[i][x] the char
    for (let x = 0; x < lines[i].length; x++) {
      /* async function check(i: number, x: number) {
        return lines[i][x] == "M" && lines[i][x] == "A" && lines[i][x] == "S";
      } */

      if (lines[i][x] != "X") continue;

      // to the right
      if (
        lines[x + 1] &&
        lines[x + 2] &&
        lines[x + 3] &&
        lines[i][x + 1] == "M" &&
        lines[i][x + 2] == "A" &&
        lines[i][x + 3] == "S"
      )
        p1result++;

      // to the left
      if (
        lines[x - 1] &&
        lines[x - 2] &&
        lines[x - 3] &&
        lines[i][x - 1] == "M" &&
        lines[i][x - 2] == "A" &&
        lines[i][x - 3] == "S"
      )
        p1result++;

      // up
      if (
        lines[i - 1] &&
        lines[i - 2] &&
        lines[i - 3] &&
        lines[i - 1][x] == "M" &&
        lines[i - 2][x] == "A" &&
        lines[i - 3][x] == "S"
      )
        p1result++;

      // down
      if (
        lines[i + 1] &&
        lines[i + 2] &&
        lines[i + 3] &&
        lines[i + 1][x] == "M" &&
        lines[i + 2][x] == "A" &&
        lines[i + 3][x] == "S"
      )
        p1result++;

      // up right
      if (
        lines[i - 1] &&
        lines[i - 2] &&
        lines[i - 3] &&
        lines[x + 1] &&
        lines[x + 2] &&
        lines[x + 3] &&
        lines[i - 1][x + 1] == "M" &&
        lines[i - 2][x + 2] == "A" &&
        lines[i - 3][x + 3] == "S"
      )
        p1result++;

      // up left
      if (
        lines[i - 1] &&
        lines[i - 2] &&
        lines[i - 3] &&
        lines[x - 1] &&
        lines[x - 2] &&
        lines[x - 3] &&
        lines[i - 1][x - 1] == "M" &&
        lines[i - 2][x - 2] == "A" &&
        lines[i - 3][x - 3] == "S"
      )
        p1result++;

      // down right
      if (
        lines[i + 1] &&
        lines[i + 2] &&
        lines[i + 3] &&
        lines[x + 1] &&
        lines[x + 2] &&
        lines[x + 3] &&
        lines[i + 1][x + 1] == "M" &&
        lines[i + 2][x + 2] == "A" &&
        lines[i + 3][x + 3] == "S"
      )
        p1result++;

      // down left
      if (
        lines[i + 1] &&
        lines[i + 2] &&
        lines[i + 3] &&
        lines[x - 1] &&
        lines[x - 2] &&
        lines[x - 3] &&
        lines[i + 1][x - 1] == "M" &&
        lines[i + 2][x - 2] == "A" &&
        lines[i + 3][x - 3] == "S"
      )
        p1result++;
    }
  }
  console.log(`part 1 total XMAS count: ${p1result}`);
})();
