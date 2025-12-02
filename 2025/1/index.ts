import { run } from "@aockit/core";

const parse = (lines: string[]) => {
    const parsed: [string, number][] = []
    for (const line of lines) {
        parsed.push([line.slice(0, 1), Number(line.slice(1, line.length))])
    }
    console.log(parsed)
    return parsed;
}

run({
    part1({ readInput }) {
        const lines = readInput("lines");

        const parsed = parse(lines);

        let dial = 50;
        let password = 0;

        for (const round of parsed) {
            const direction = round[0]
            const turns = round[1]
            if (direction == "L") {
                for (let i = 0; i < turns; i++) {
                    dial--
                    if (dial == -1) dial = 99
                }
            }
            else if (direction == "R") {
                for (let i = 0; i < turns; i++) {
                    dial++
                    if (dial == 100) dial = 0
                }
            }
            if (dial == 0) password++
        }
        return password
    },
    part2({ readInput }) {
        const lines = readInput("lines");

        const parsed = parse(lines);

        let dial = 50;
        let password = 0;

        for (const round of parsed) {
            const direction = round[0]
            const turns = round[1]
            if (direction == "L") {
                for (let i = 0; i < turns; i++) {
                    dial--
                    if (dial == -1) dial = 99
                    if (dial == 0) password++
                }
            }
            else if (direction == "R") {
                for (let i = 0; i < turns; i++) {
                    dial++
                    if (dial == 100) dial = 0
                    if (dial == 0) password++
                }
            }
        }
        return password
    }
});
