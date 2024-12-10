import { open } from 'node:fs/promises';

(async () => {
    const file = await open('../input');

    let calibrationSum = 0;

    const numbersDict = {
      'one': '1',
      'two': '2',
      'three': '3',
      'four': '4',
      'five': '5',
      'six': '6',
      'seven': '7',
      'eight': '8',
      'nine': '9',
    }

    const numbers = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0'
    ]
  
    for await (const line of file.readLines()) {


      let numbersArray = [];
      let numbersCleanArray = [];


      let letters = "";
      caracteres:
      for (let i = 0; i < line.length; i++) {      //     por cada caracter que haya en la linea, izq a der
        letters += line[i];                        //     agregar este caracter
        // console.log(letters)                       //     print los caracteres acumuladas
        for (let i = 0; i < numbers.length; i++) { //     por cada elemento de letras, one, 1, etc
          if (letters.includes(numbers[i])) {      //     si es que las letras acumuladas coinciden con este elemento
            numbersArray.push(numbers[i])     //     pushear al clean array el numero que conseguimos
            letters = "";
            break caracteres;                      //     romper el loop de los caracteres
          };
        }
      }
      caracteres2:
      for (let i = line.length - 1; i >= 0; i--) { //     por cada caracter que haya en la linea, der a izq
        letters += line[i];                        //     agregar este caracter
        // console.log(letters)                       //     print los caracteres acumuladas

        let lettersArr = letters.split("")
        let lettersArrRev = lettersArr.reverse()
        let lettersRev = lettersArrRev.join("")

        for (let i = 0; i < numbers.length; i++) { //     por cada elemento de letras, one, 1, etc
          if (lettersRev.includes(numbers[i])) {      //     si es que las letras acumuladas coinciden con este elemento
            numbersArray.push(numbers[i])     //     pushear al clean array el numero que conseguimos
            letters = "";
            break caracteres2;                     //     romper el loop de los caracteres
          };
        }
      }

      for (let i = 0; i < numbersArray.length; i++) {
        if (numbersArray[i].match(/\d/)) {
          numbersCleanArray.push(numbersArray[i]);
          continue;
        }

        numbersCleanArray.push(numbersDict[numbersArray[i]]);
      }
      console.log(numbersCleanArray)

      let lineValue = numbersCleanArray[0] + numbersCleanArray[numbersCleanArray.length - 1];
      calibrationSum += parseInt(lineValue);
    }

    console.log(calibrationSum);
})();