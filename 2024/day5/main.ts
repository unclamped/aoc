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
  let p2result = 0;

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
    let numbers = line.split(",").map((str) => parseInt(str));
    let correct = true;
    //let correctp2 = false;

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

    /* async function check(numbers: number[], rules: number[][]): boolean {
      rulesLoop: for (const rule of rules) {
        let firstPassed = false;
        let secondPassed = false;

        //const unsuccessfulRules: number[][] = [];
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
            return false;
          }

          // ok this update complies with this rule, move on to next rule
          if (number == rule[1] && firstPassed) {
            secondPassed = true;
            console.log(`this complies with rule ${rule}. next rule pls`);
          }
        }
        // we couldn't find the last number of the rule, insert loud wrong buzzer
        // move on to next update
        if (!secondPassed) {
          console.log(`we found ${rule[0]} but not ${rule[1]}. NEEEEXT`);
          return false;
        }
      }
    } */

    harharharharhar: for (const rule of applicableRules) {
      let firstPassed = false;
      let secondPassed = false;
      //const unsuccessfulRules: number[][] = [];
      for (const number of numbers) {
        // ok we found the first element, move on to next number
        if (number == rule[0] && !firstPassed && correct) {
          console.log(
            `ok, ${rule[0]} was found as the first element, checking other numbers`
          );
          firstPassed = true;
          continue;
        }

        // we stumbled across second element and we haven't found the first yet, insert loud wrong buzzer
        // move on to next update
        if (number == rule[1] && !firstPassed && correct) {
          console.log(
            `we should've found ${rule[0]} first but instead we found ${rule[1]}. NEEEEXT`
          );
          correct = false;
          //unsuccessfulRules.push(rule);

          // 1 3 5 2 4

          //break harharharharhar;
        }

        // ok this update complies with this rule, move on to next rule
        if (number == rule[1] && firstPassed) {
          if (correct) {
            correctRules++;
            secondPassed = true;
          }
          console.log(`this complies with rule ${rule}. next rule pls`);
          continue harharharharhar;
        }
      } // End numbers loop

      // we couldn't find the last number of the rule, insert loud wrong buzzer
      // move on to next update
      if (!secondPassed && correct) {
        console.log(`we found ${rule[0]} but not ${rule[1]}. NEEEEXT`);
        correct = false;
        //break harharharharhar;
      }

      // ok at this point there was something incorrect, lets try to fix it
      //
      // number = [24, 54, 12, 65, 98]
      // rule   = [12, 54]
      // we should find the index of each of the numbers in rule in the number array
      //const indexes: number[] = [];
      const sleepNow = (delay: number) =>
        new Promise((resolve) => setTimeout(resolve, delay));

      //console.log(`INCORRECT UPDATE; ${numbers}`);
      //console.log(`rules`);
      //console.log(rules);

      let finished = false;
      let wall = numbers.length - 1;
      while (!finished) {
        // await sleepNow(5000);
        // console.log(`current line: ${numbers}`);
        //let changed = false;
        //console.log(`amount of numbers to check for swaps: ${numbers.length}`);
        // console.log(`the wall is set at ${numbers[wall]}`);
        lalala: for (let i = 0; i < wall; i++) {
          const pair = [numbers[i], numbers[i + 1]];
          //console.log(rules[1]);
          //console.log(pair);
          //console.log(JSON.stringify(rules[1]) == JSON.stringify(pair));
          if (rules.includes(pair)) {
            //console.log(`true`);
            continue;
          }
          for (const rulePair of rules) {
            //console.log(`rulepair`);
            //console.log(rulePair);
            //console.log(pair);
            if (JSON.stringify(rulePair) == JSON.stringify(pair))
              continue lalala;
          }
          // console.log(`swapping pair ${numbers[i]} and ${numbers[i + 1]}`);
          // await sleepNow(3000);
          [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
          //console.log(numbers);
          //changed = true;
        }
        wall -= 1;
        if (!wall) finished = true;
      }
      //console.log(numbers);
    } // End rules
    if (correctRules == applicableRules.length) {
      console.log("this update is valid\n");
      // divide by integers
      p1result += numbers[Math.floor(numbers.length / 2)];
    }

    if (!correct) p2result += numbers[Math.floor(numbers.length / 2)];
  }
  console.log(`part 1 middle page number sum: ${p1result}`);
  console.log(`part 2 middle page number sum: ${p2result}`);
})();

// look yknow what, I'm so fucking tired of this fucking exercise that
// I am not even going to fucking clean it the fuck up
// fuck you, and I wish you an unmerry christmas
