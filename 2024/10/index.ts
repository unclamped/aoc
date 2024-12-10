import { run } from "@aockit/core";

run({
  part1({ readInput }) {
    const lines = readInput("lines");
    /* const lines = [
      "89010123",
      "78121874",
      "87430965",
      "96549874",
      "45678903",
      "32019012",
      "01329801",
      "10456732"
    ]; */
    /* const lines = [
      "..90..9",
      "...1.98",
      "...2..7",
      "6543456",
      "765.987",
      "876....",
      "987...."
    ]; */
    /* const lines = [
      "...0...",
      "...1...",
      "...2...",
      "6543...",
      "7..4...",
      "8..5...",
      "9876..."
    ]; */
    //console.log(lines);

    let p1result = 0;

    let reachedNines: number[][] = [];
    const check = (y: number, x: number) => {
      const top = lines[y - 1]?.[x];
      const bottom = lines[y + 1]?.[x];
      const left = lines[y][x - 1];
      const right = lines[y][x + 1];
      const nextNumbers: number[][] = [];

      /* console.log(`checking element ${lines[y][x]} at x ${x + 1} y ${y + 1}`);
      console.log(
        `top: ${top}. right: ${right}. bottom: ${bottom}. left: ${left}.`
      ); */

      if (lines[y][x] == "9") {
        //console.log(`we got to a 9, have we previously gotten there?`);
        if (reachedNines.findIndex((_el) => _el[0] == y && _el[1] == x) == -1) {
          /* console.log(`nope! good to go`);
          console.log(
            `found 9 at x ${x + 1} y ${y + 1}. adding 1 complete trail to the result!`
          ); */
          reachedNines.push([y, x]);
          //console.log(reachedNines);
          p1result++;
        } else {
          //console.log(`yeah, sadge`);
        }
        return;
      }

      if (top == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position above contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y - 1, x]);
      }
      if (bottom == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position below next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y + 1, x]);
      }
      if (left == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position to the left contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y, x - 1]);
      }
      if (right == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position to the right contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y, x + 1]);
      }
      nextNumbers.forEach((_el) => {
        check(_el[0], _el[1]);
      });
    };

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] != "0") continue;
        //console.log(`\nfound 0 at position x ${x + 1} y ${y + 1}`);
        check(y, x);
        reachedNines = [];
      }
    }

    return p1result;
  },
  part2({ readInput }) {
    const lines = readInput("lines");
    /* const lines = [
      "89010123",
      "78121874",
      "87430965",
      "96549874",
      "45678903",
      "32019012",
      "01329801",
      "10456732"
    ]; */
    /* const lines = [
      "..90..9",
      "...1.98",
      "...2..7",
      "6543456",
      "765.987",
      "876....",
      "987...."
    ]; */
    /* const lines = [
      "...0...",
      "...1...",
      "...2...",
      "6543...",
      "7..4...",
      "8..5...",
      "9876..."
    ]; */
    //console.log(lines);

    let p2result = 0;

    const check = (y: number, x: number) => {
      const top = lines[y - 1]?.[x];
      const bottom = lines[y + 1]?.[x];
      const left = lines[y][x - 1];
      const right = lines[y][x + 1];
      const nextNumbers: number[][] = [];

      /* console.log(`checking element ${lines[y][x]} at x ${x + 1} y ${y + 1}`);
      console.log(
        `top: ${top}. right: ${right}. bottom: ${bottom}. left: ${left}.`
      ); */

      if (lines[y][x] == "9") {
        /* console.log(
          `found 9 at x ${x + 1} y ${y + 1}. adding 1 complete trail to the result!`
        ); */
        p2result++;
        return;
      }

      if (top == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position above contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y - 1, x]);
      }
      if (bottom == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position below next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y + 1, x]);
      }
      if (left == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position to the left contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y, x - 1]);
      }
      if (right == (parseInt(lines[y][x]) + 1).toString()) {
        /* console.log(
          `position to the right contains next number ${parseInt(lines[y][x]) + 1}! checking other numbers...`
        ); */
        nextNumbers.push([y, x + 1]);
      }
      nextNumbers.forEach((_el) => {
        check(_el[0], _el[1]);
      });
    };

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] != "0") continue;
        //console.log(`\nfound 0 at position x ${x + 1} y ${y + 1}`);
        check(y, x);
      }
    }

    return p2result;
  }
});

/*
  We should iterate through each character to find a zero. Once we find one, we gotta start
  finding the trails. We keep an internal count of our progress, so when we check around it,
  we know what number we're trying to look for. We need to see how many instances of said
  number we find, and what their position is (up, left, blabla). Then, for each of those
  ocurrences, we repeat the same cycle, having an internal count for each. Once we reach 9
  in any of them, we push 1 to the p1 result
*/
