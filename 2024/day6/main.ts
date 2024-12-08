import { readFile } from "node:fs/promises";

(async () => {
  const input = await readFile("./2024/day6/input", {
    encoding: "utf8"
  });
  //console.log(input);
  const lines = input.split("\n").map((row) => row.trim().split(""));

  // when the guard leaves, it's not gonna leave the X. lets just do a
  // shitty bandaid fix and leave p1result set as 1 beforehand
  let p1result = 1;
  let guardLeft = false;

  interface Guard {
    x: number;
    y: number;
    direction: number;
  }

  const guard: Guard = {
    x: 0,
    y: 0,
    // 0 is up, 1 right, 2 down, 4 left
    direction: 0
  };

  interface GuardDirection {
    direction: number;
  }

  async function getGuardDirection(guardObj: GuardDirection) {
    return guardObj.direction;
  }

  guardLoop: for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      //console.log(`checking char ${lines[y][x]}`);
      // wait, does any input even have anything besides ^ as a starting position???
      if (
        lines[y][x] == "^"
        //lines[i][x] == ">" ||
        //lines[i][x] == "v" ||
        //lines[i][x] == "<"
      ) {
        [guard.x, guard.y] = [x, y];
        console.log(`found guard at x ${guard.x + 1} y ${guard.y + 1}`);
        break guardLoop;
      }
    }
  }

  while (!guardLeft) {
    console.log(`\n`);
    console.log(`current direction is ${guard.direction}`);
    console.log(`current guard position is x ${guard.x + 1} y ${guard.y + 1}`);
    let spottedObstacle = false;
    let y = guard.y;
    let x = guard.x;

    lines.forEach((row) => {
      let line = "";
      row.forEach((char) => {
        line += char;
      });
      console.log(line);
    });

    // up
    if (guard.direction == 0) {
      while (y - 1 != -1) {
        console.log(
          `checking char ${lines[y - 1][x]} at x ${x + 1} y ${y + 1}`
        );
        if (lines[y][x] != "X") {
          lines[y][x] = "X";
          console.log(`marking x ${x + 1} y ${y + 1} as X`);
          p1result += 1;
        }
        if (lines[y - 1][x] == "#") {
          spottedObstacle = true;
          console.log(`found an obstacle at x ${x + 1} y ${y + 1}`);
          break;
        }
        y -= 1;
      }
    } else if (guard.direction == 1) {
      console.log(`entered right loop`);
      while (x + 1 != lines[y].length) {
        console.log(
          `checking char ${lines[y][x + 1]} at x ${x + 1} y ${y + 1}`
        );
        if (lines[y][x] != "X") {
          lines[y][x] = "X";
          console.log(`marking x ${x + 1} y ${y + 1} as X`);
          p1result += 1;
        }
        if (lines[y][x + 1] == "#") {
          spottedObstacle = true;
          console.log(`found an obstacle at x ${x + 1} y ${y + 1}`);
          break;
        }
        x += 1;
      }
    } else if (guard.direction == 2) {
      while (y + 1 != lines.length) {
        console.log(
          `checking char ${lines[y + 1][x]} at x ${x + 1} y ${y + 1}`
        );
        if (lines[y][x] != "X") {
          lines[y][x] = "X";
          console.log(`marking x ${x + 1} y ${y + 1} as X`);
          p1result += 1;
        }
        if (lines[y + 1][x] == "#") {
          spottedObstacle = true;
          console.log(`found an obstacle at x ${x + 1} y ${y + 1}`);
          break;
        }
        y += 1;
      }
    } else if (guard.direction == 3) {
      while (x - 1 != -1) {
        console.log(
          `checking char ${lines[y][x - 1]} at x ${x + 1} y ${y + 1}`
        );
        if (lines[y][x] != "X") {
          lines[y][x] = "X";
          console.log(`marking x ${x + 1} y ${y + 1} as X`);
          p1result += 1;
        }
        if (lines[y][x - 1] == "#") {
          spottedObstacle = true;
          console.log(`found an obstacle at x ${x + 1} y ${y + 1}`);
          break;
        }
        x -= 1;
      }
    }
    //...
    console.log(`current amount of unique spots is ${p1result}`);
    if (spottedObstacle) {
      //if (guard.direction == 4) guard.direction = 1;
      if ((await getGuardDirection(guard)) == 3) guard.direction = 0;
      else guard.direction += 1;
      console.log(`${x} ${y}`);
      [guard.x, guard.y] = [x, y];
      console.log(
        `the new position for the guard is x ${guard.x + 1} and ${guard.y + 1}`
      );
    } else {
      guardLeft = true;
      console.log(`the guard left!`);
      break;
    }
  }
  console.log(`part 1 total unique positions: ${p1result}`);
  /*
    okay so, I might want to start with finding and keeping the position (index x and y)
    and direction of the guard in an object. I do this by iterating through every line
    till I find a ^, v, < or >. Up is 0, right 1, down 2, left 3.
    Then, do a a big while, with the condition being a boolean on whether or not the guard
    has left.
    Lets take for example an iteration facing up. I'd first init spottedObstacle as false,
    and y as guard.y, and then then while (!spottedObstacle || y - 1 != -1)
    So, when either an Obstacle is spotted (it will be set to true, so we need it to look as
    false in the while so that it stops) or when we've reached the first line, it stops.
    Now, inside the iteration we check if lines[y - 1][guard.x] is a #. If it is, set
    spottedObstacle to true so it doesn't do the next iteration (or we could just break?
    in which case, it's a bit redundant to have the !spottedObstacle check). Otherwise,
    do y - 1. Of course, for each different direction, it will be different. For down
    it will be line[y + 1][guard.x], left will be line[guard.y][x - 1], right
    line[guard.y][x + 1].
    Now, outside the while, we should check if it didn't find an obstacle. If so, that means
    the while loop broke because we reached the limits of the grid, and the guard left.
    Otherwise, if it did find an obstacle, then we sum one to the total for the part 1
    result and check if guard.direction is 4. If it is, set it to 0, otherwise up it by 1.
    We also set guard.y to the new y position.
    Once the big while is over, we just print the part 1 result
  */
})();
