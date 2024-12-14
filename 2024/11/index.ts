import { run } from "@aockit/core";

run({
  part1({ input }) {
    const stones: bigint[] = [];
    input.split(" ").forEach((_el) => {
      stones.push(BigInt(_el));
    });
    //console.log(stones);

    let stonesAmount = 0;

    for (const _el of stones) {
      let stoneChildren: bigint[] = [BigInt(_el)];
      //let stoneChildren: bigint[] = [0n];

      let blinks = 0;

      while (blinks < 25) {
        const newStones: bigint[] = [];
        stoneChildren.forEach((stone) => {
          if (stone == 0n) newStones.push(1n);
          // if digits number is even
          // https://stackoverflow.com/a/22312556
          // apparently this is more optimized than modulus
          else if (stone.toString().length % 2 == 0) {
            const stoneString = stone.toString();
            const halfIndex = stoneString.length / 2 - 1;
            const firstHalf = BigInt(stoneString.slice(0, halfIndex + 1));
            const secondHalf = BigInt(
              stoneString.slice(halfIndex + 1, stoneString.length)
            );
            newStones.push(firstHalf, secondHalf);
          } else newStones.push(stone * 2024n);
        });
        stoneChildren = newStones;
        blinks++;
      }
      stonesAmount += stoneChildren.length;
    }
    return stonesAmount;
  },
  part2({ input }) {
    const stones: bigint[] = [];
    input.split(" ").forEach((_el) => {
      stones.push(BigInt(_el));
    });
    //console.log(stones);

    const stonesToAmount = new Map<bigint, bigint>();

    let stonesAmount = 0;

    const check = async (stone: bigint) => {
      if (stonesToAmount.has(stone)) {
        return stonesToAmount.get(stone);
      }

      let result = 0n;
      if (stone == 0n) {
        result = (await check(1n))!;
      }
      // if digits number is even
      // https://stackoverflow.com/a/22312556
      // apparently this is more optimized than modulus
      else if (stone.toString().length % 2 == 0) {
        const stoneString = stone.toString();
        const halfIndex = stoneString.length / 2 - 1;
        const firstHalf = BigInt(stoneString.slice(0, halfIndex + 1));
        const secondHalf = BigInt(
          stoneString.slice(halfIndex + 1, stoneString.length)
        );
        result = (await check(firstHalf))! + (await check(secondHalf))!;
      } else result = (await check(stone * 2024n))!;

      return result;
    };

    for (const _el of stones) {
      let stoneChildren: bigint[] = [BigInt(_el)];
      //let stoneChildren: bigint[] = [0n];

      let blinks = 0;

      while (blinks < 25) {
        const newStones: bigint[] = [];
        stoneChildren.forEach((stone) => {
          if (stone == 0n) newStones.push(1n);
          // if digits number is even
          // https://stackoverflow.com/a/22312556
          // apparently this is more optimized than modulus
          else if (stone.toString().length % 2 == 0) {
            const stoneString = stone.toString();
            const halfIndex = stoneString.length / 2 - 1;
            const firstHalf = BigInt(stoneString.slice(0, halfIndex + 1));
            const secondHalf = BigInt(
              stoneString.slice(halfIndex + 1, stoneString.length)
            );
            newStones.push(firstHalf, secondHalf);
          } else newStones.push(stone * 2024n);
        });
        stoneChildren = newStones;
        blinks++;
      }
      stonesAmount += stoneChildren.length;
    }
    return stonesAmount;
  }
});
