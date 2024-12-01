import * as fs from 'node:fs/promises';

(async () => {
    const input = await fs.readFile('./day1/input', { encoding: 'utf8' })
    console.log(input)
    let lines = input.split("\n")
    let leftCol = []
    let rightCol = []
    for (let line of lines) {
        const splitLine = line.split("   ")
        leftCol.push(parseInt(splitLine[0]))
        rightCol.push(parseInt(splitLine[1]))
    }

    leftCol.sort(function(a, b) { return a - b })
    rightCol.sort(function(a, b) { return a - b })

    // console.log(leftCol)
    // console.log(rightCol)

    // part 1
    let p1result = 0
    for (let i = 0; i < leftCol.length; i++) {
        let bigNum = leftCol[i] > rightCol[i] ? leftCol[i] : rightCol[i]
        let smallNum = leftCol[i] < rightCol[i] ? leftCol[i] : rightCol[i]
        // console.log(bigNum - smallNum)
        p1result += bigNum - smallNum
        // console.log (leftCol[i] + ' ' + rightCol[i])
    }

    console.log(`part 1 result: ${p1result}`)

    // part 2
    let p2result = 0
    for (let i = 0; i < leftCol.length; i++) {
        let matches = 0
        for (let x = 0; x < rightCol.length; x++) {
            if (leftCol[i] == rightCol[x]) matches++
        }
        p2result += leftCol[i] * matches
    }
    console.log(`part 2 result: ${p2result}`)
})();