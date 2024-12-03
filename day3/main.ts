import * as fs from "node:fs/promises";

(async () => {
  const input = await fs.readFile("./day3/input", { encoding: "utf8" });
  //console.log(input);
  const lines = input.split("\n");

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

  for (const line of lines) {
    console.log(line);
    const mulMatches = line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

    for (const match of mulMatches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, n1, n2] = match;
      console.log(`${n1} ${n2}`);
      p1result += parseInt(n1) * parseInt(n2);
    }
  }
  console.log(`part 1 multiplication sum: ${p1result}`);
})();
