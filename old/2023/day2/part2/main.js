import { open } from 'node:fs/promises';

(async () => {
    const file = await open('../input');

    let totalPowerSum = 0;
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
        let biggestAmount = [0, 0, 0]; // red, green, blue respectively
        for (let h = 0; h < gamesArray[g][1].length; h++) {
            for (let c = 0; c < gamesArray[g][1][h].length; c++) {
                console.log(gamesArray[g][1][h][c])
                switch(gamesArray[g][1][h][c][1]) {
                    case 'red':
                        if (parseInt(gamesArray[g][1][h][c][0]) > biggestAmount[0]) {
                            biggestAmount[0] = parseInt(gamesArray[g][1][h][c][0])
                        }
                        break;
                    case 'green':
                        if (parseInt(gamesArray[g][1][h][c][0]) > biggestAmount[1]) {
                            biggestAmount[1] = parseInt(gamesArray[g][1][h][c][0])
                        }
                        break;
                    case 'blue':
                        if (parseInt(gamesArray[g][1][h][c][0]) > biggestAmount[2]) {
                            biggestAmount[2] = parseInt(gamesArray[g][1][h][c][0])
                        }
                        break;
                }
            }
        }
        totalPowerSum += biggestAmount[0] * biggestAmount[1] * biggestAmount[2]
    }

    console.log(totalPowerSum)
})();