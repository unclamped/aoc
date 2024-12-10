import { readFile } from "node:fs/promises";

(async () => {
  const input = await await readFile("./2024/day10/exampleinput", {
    encoding: "utf8"
  });
  const lines = input.split("\n");
  console.log(lines);

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] != "0") continue;
      const top = lines[y - 1]?.[x];
      const bottom = lines[y + 1]?.[x];
      const left = lines[y][x - 1];
      const right = lines[y][x + 1];
    }
  }
})();
