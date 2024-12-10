import { open } from 'node:fs/promises';

(async () => {
    const file = await open('../input');

    let totalIdSum = 0;
    let gamesArray = [];

    // parsing the input into an array format we can more easily manipulate
    for await (const line of file.readLines()) {
      let lineArray = line.split(": ")
      lineArray[0] = lineArray[0].replace('Game ','')
      lineArray[1] = lineArray[1].split("; ")
      for (let i = 0; i < lineArray[1].length; i++) {
        lineArray[1][i] = lineArray[1][i].split(", ")
        for (let x = 0; x < lineArray[1][i].length; x++) {
            lineArray[1][i][x] = lineArray[1][i][x].split(' ')
            // console.log(lineArray[1][i][x])
        }
      }
      gamesArray.push(lineArray)
    }

    // > 12 red cubes, 13 green cubes, and 14 blue cubes.

    /*
        okay so, gamesArray is an array containing each game
        for example, if we wanted to get the first game, we'd have gamesArray[0].
        to get the ID of it, we'd need to get gamesArray[0][0]
        now, to get the array of handfuls, we'd need to get gamesArray[0][1]
        inside there, there'd be an array for each time the elf took a handful of the dice,
            if we wanted to see the first handful, we'd need to get gamesArray[0][1][0]
        now we're looking at the cubes of that handful, for the first cube, we get gamesArray[0][1][0][0]
        now, we're looking at the characteristics of the cube, to get the amount, we get gamesArray[0][1][0][0][0]
            to get the color, gamesArray[0][1][0][0][1]

        gamesArray[game][0 for id, 1 for handfuls][handful][cube][0 for the amount, 1 for the color]
    */

    for (let g = 0; g < gamesArray.length; g++) {
        console.log('new game!')
        let impossible;

        games:
        for (let h = 0; h < gamesArray[g][1].length; h++) {
            for (let c = 0; c < gamesArray[g][1][h].length; c++) {
                console.log(gamesArray[g][1][h][c])
                switch(gamesArray[g][1][h][c][1]) {
                    case "red":
                        if (parseInt(gamesArray[g][1][h][c][0]) > 12) {
                            console.log('impossible');
                            impossible = true;
                            break games;
                        }
                    case "green":
                        if (parseInt(gamesArray[g][1][h][c][0]) > 13) {
                            console.log('impossible');
                            impossible = true;
                            break games;
                        }
                    case "blue":
                        if (parseInt(gamesArray[g][1][h][c][0]) > 14) {
                            console.log('impossible');
                            impossible = true;
                            break games;
                        }
                }
            }

        }
        console.log(gamesArray[g][0])
        if (!impossible) totalIdSum += parseInt(gamesArray[g][0])
    }

    console.log(totalIdSum)

    // .log doesn't show nested arrays, what the fuck is dir ???????????????
    //console.dir(gamesArray, {depth: null})
})();