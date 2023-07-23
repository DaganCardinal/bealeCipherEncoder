export { encodeMessage }

// // //
// Primary encoder function
// // //
function encodeMessage(message: string, key: string): string {
    let messageArr = message.split('');
    let keyArr = key.split(' ');
    let output = '';
    let startNum: number = 0;

    console.log(keyArr)

    messageArr.forEach((word: string, index: number) => {
        if (index % 2 === 0) {
            // Uses random number starting point to add complexity to the cipher, divides by 2 to ensure the starting point is not too high
            startNum = getRandomNum(0, keyArr.length) / 2;
        }

        let letterPosition = keyArr.findIndex((letter: string, i: number) => letter.charAt(0) === word.charAt(0) && i > startNum)

        if (letterPosition != -1) {

            output += ` ${letterPosition + 1}`;

        } else {
            // If the letter is not found after the random starting point, try from the beginning instead
            let newLetterPosition = keyArr.findIndex((letter: string, i: number) => letter.charAt(0) === word.charAt(0))

            if (newLetterPosition != -1) {

                output += ` ${newLetterPosition + 1}`;

            } else {

                // If it's still not found, throw an error
                throw new Error(`Letter ${word.charAt(0)} does not appear as the first letter in any word in the key!`);

            }
        }
    })
    return output;
}

function getRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}