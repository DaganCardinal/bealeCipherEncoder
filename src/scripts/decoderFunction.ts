export { decodeMessage }

// // //
// Primary decoder function
// // //
function decodeMessage(message: string, key: string): string {
    message = message.replace(/\n+/g, " ");
    let messageArr: number[]
    if (message.includes(",")) {
        messageArr = message.split(", ").map(Number);
    } else {
        messageArr = message.split(" ").map(Number);
    }
    let keyArr = key.split(" ");
    let output = "";

    let validity = checkValidKeyMessageLength(messageArr, keyArr);

    if (!validity.isValid) {
        return `Key is not long enough to decode message. Key length is ${validity.keyLength} and the highest value in the message is ${validity.maxValue}`
    }

    messageArr.forEach((letterPosition: number) => {
        var x = keyArr[letterPosition - 1];
        if (x) {
            output += ` ${x.charAt(0).toLowerCase()}`;
        } else {
            output += ` ${letterPosition}`;
        }
    });
    return output;
}

// Checks that the key and message length are compatible
function checkValidKeyMessageLength(encodedMessage: number[], key: string[]) {
    let maxValue = Math.max(...encodedMessage)
    let isValid: boolean;
    let keyLength = key.length

    if (maxValue > keyLength) {
        isValid = false
    } else {
        isValid = true
    }

    return { isValid, keyLength, maxValue }
}