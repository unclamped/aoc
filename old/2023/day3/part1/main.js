import { open } from 'node:fs/promises';

(async () => {
    const file = await open('./input');

    let totalPartSum = 0;
    let fileArray = [];

    for await (const line of file.readLines()) fileArray.push(line)

    // for each line
    for (let i = 0; i < fileArray.length; i++) {
        console.log(fileArray[i])
        let numbers = fileArray[i].match(/\d/g)
        console.log(numbers)

        // for each number of the line
        for (let _i = 0; _i < numbers.length; _i++) {
            let index = fileArray[i].indexOf(numbers[_i])
            // fuck it im doing python now
        }
        console.log('\n')
    }
})();