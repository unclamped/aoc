import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./2024/day5/input", {
    encoding: "utf8"
  });
  //console.log(input);
  const lines = input.split("\n");
  const rules: number[][] = [];
  //const updates: number[][] = [];

  let p1result = 0;

  let updates = false;
  for (const line of lines) {
    console.log(line);
    if (line == "") {
      updates = true;
      continue;
    }
    if (!updates) {
      console.log("tis a rule");
      rules.push(line.split("|").map((str) => parseInt(str)));
      continue;
    }
    const numbers = line.split(",").map((str) => parseInt(str));
    let correct = false;

    const applicableRules: number[][] = [];

    /* 
      rules is [[54, 34], ...]
      numbers is [12, 53, 54, 98, 34, ...]

      for each rule, it must see if the two elements are on numbers
    */

    //console.log(numbers);
    for (const rule of rules) {
      //console.log(rule);
      const applicableRule = rule.every((value) => numbers.includes(value));
      if (applicableRule) applicableRules.push(rule);
    }

    if (!applicableRules) continue;

    console.log(applicableRules);

    // ty alyxia for this idea. i wonder if there's a way
    // of doing it without an extra variable tho...
    let correctRules = 0;

    harharharharhar: for (const rule of applicableRules) {
      let firstPassed = false;
      let secondPassed = false;
      for (const number of numbers) {
        // ok we found the first element, move on to next number
        if (number == rule[0] && !firstPassed) {
          console.log(
            `ok, ${rule[0]} was found as the first element, checking other numbers`
          );
          firstPassed = true;
          continue;
        }

        // we stumbled across second element and we haven't found the first yet, insert loud wrong buzzer
        // move on to next update
        if (number == rule[1] && !firstPassed) {
          console.log(
            `we should've found ${rule[0]} first but instead we found ${rule[1]}. NEEEEXT`
          );
          break harharharharhar;
        }

        // ok this update complies with this rule, move on to next rule
        if (number == rule[1] && firstPassed) {
          correctRules++;
          secondPassed = true;
          console.log(`this complies with rule ${rule}. next rule pls`);
          continue harharharharhar;
        }
      }
      // we couldn't find the last number of the rule, insert loud wrong buzzer
      // move on to next update
      if (secondPassed) {
        console.log(`we found ${rule[0]} but not ${rule[1]}. NEEEEXT`);
        break harharharharhar;
      }
    }
    if (correctRules == applicableRules.length) {
      console.log("this update is valid\n");
      // divide by integers
      p1result += numbers[Math.floor(numbers.length / 2)];
    }
  }
  console.log(`part 1 middle page number sum: ${p1result}`);
})();
