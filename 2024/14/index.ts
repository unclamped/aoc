import { run } from "@aockit/core";

run({
  part1({ readInput }) {
    //const lines = readInput("lines");
    //const grid = [101, 103]

    const lines = [
      "p=0,4 v=3,-3",
      "p=6,3 v=-1,-3",
      "p=10,3 v=-1,2",
      "p=2,0 v=2,-1",
      "p=0,0 v=1,3",
      "p=3,0 v=-2,-2",
      "p=7,6 v=-1,-3",
      "p=3,0 v=-1,-2",
      "p=9,3 v=2,3",
      "p=7,3 v=-1,2",
      "p=2,4 v=2,-3",
      "p=9,5 v=-3,-3"
    ];

    const grid = {
      x: 11,
      y: 7
    };

    const robots: number[][] = [];

    lines.forEach((_el) => {
      const matches = _el.matchAll(/p=(.+),(.+) v=(.+),(.+)/g);
      matches.forEach((match) => {
        robots.push([
          parseInt(match[1]),
          parseInt(match[2]),
          parseInt(match[3]),
          parseInt(match[4])
        ]);
      });
    });

    console.log(robots);

    const check = async (
      posX: number,
      posY: number,
      velX: number,
      velY: number
    ) => {
      let newX = 0;

      if (velX != 0) {
        if (velX > 0) {
          const distance = grid.x - posX;
          if (velX > distance) {
            newX = velX - grid.x;
          } else {
            newX = posX + velX;
          }
        } else {
          const distance = posX - 1; // 3
          if (Math.abs(velX) > distance) {
            newX = grid.x - grid.x + velX;
          }
        }
      }
    };

    robots.forEach((_el) => {
      console.log(`\n${_el}`);
      let seconds = 0;
      while (seconds < 100) {
        seconds++;
      }
    });

    /*
      +x = right
      -x = left
      +y = down. 
      -y = up

      first do the X. if it is positive, so if it is moving to the right, check distance between
      the end of the grid, so, grid x minus current X. then, we check if velocity X is bigger than
      said distance. if so, calculate by how much, velocity X minus grid x, the result is the new
      x position. if not, add velocity to current x position.
      if it is moving to the right, current X minus 1 is the distance. we check if POSITIVE
      velocity X is bigger than that. if so, calculate by how much, grid X plus (minus) velocity X.
      the new position is grid X minus said distance. if not, add velocity to current x position Y. 
    */
  }
});
