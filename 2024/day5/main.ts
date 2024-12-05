import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./2024/day5/input", { encoding: "utf8" });
  //console.log(input);
  const lines = input.split("\n");
})();
