import { open } from 'node:fs/promises';

(async () => {
    const file = await open('../input');

    let calibrationSum = 0;
  
    for await (const line of file.readLines()) {
      let processedLine = line.match(/[0-9]/g);
      let lineValue = processedLine[0] + processedLine[processedLine.length - 1];
      calibrationSum += parseInt(lineValue);
    }

    console.log(calibrationSum)
})();