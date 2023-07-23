export { }
import { encodeMessage } from "./encoderFunction";
import { getCheckboxValues, splitHyphenatedWords, replaceNewLineChars, replaceDoubleDashes, removeQuotationMarks, copyToClipboard, triggerClipboardAnimation } from "./generalFunctions";

let step = 0;
const nextButton = document.querySelector("#nextButton");
const prevButton = document.querySelector("#prevButton");
const formSections = document.querySelectorAll("#formSection");
const formHeaders = document.querySelectorAll("#formHeader");
const resultDialog = document.getElementById("encoderResultDialog") as HTMLDialogElement;
const resultDialogResults = document.getElementById("encoderResults")
const customKeyTextElement = document.getElementById("customKeyText") as HTMLInputElement;
const keySelectionButtons = document.getElementsByName("keyType") as NodeListOf<HTMLInputElement>;
const copyToClipboardButton = document.getElementById("clipboardButton")

const activeHeader = ['text-slate-200', 'underline']
const inactiveHeader = ['text-slate-400']

showStep(step);

function showStep(num: number) {
    formSections.forEach((section) => {
        section.classList.add("hidden");
    });
    formHeaders.forEach((header) => {
        header.classList.remove(...activeHeader);
        header.classList.add(...inactiveHeader);
    })
    if (num == 0) {
        prevButton!.classList.add("hidden");
    }
    if (num > 0) {
        prevButton!.classList.remove("hidden");
    }
    if (num == 2) {
        nextButton!.textContent = "Encode"
    }
    if (num < 2) {
        nextButton!.textContent = "Next"
    }
    formHeaders[num].classList.remove(...inactiveHeader);
    formHeaders[num].classList.add(...activeHeader);
    formSections[num].classList.remove("hidden");
}

nextButton!.addEventListener("click", () => {
    if (step == 2) {
        handleEncodeClick()
        return
    }
    step++;
    showStep(step);
})

prevButton!.addEventListener("click", () => {
    if (step == 0) return;
    step--;
    showStep(step)

})

function handleEncodeClick() {
    // Get key and message
    let messageInput = document.getElementById("message") as HTMLInputElement;
    let message = messageInput.value;
    let key = determineKey();

    // Format key and message
    let formattedStrings = handleFormattingOptions(message, key);
    message = formattedStrings.message;
    key = formattedStrings.key;

    try {
        let encodedMessage = encodeMessage(message, key);
        resultDialogResults!.textContent = encodedMessage;
        resultDialog.showModal();
    } catch (err) {
        alert(err)
    }

}

function determineKey() {

    if (customKeyTextElement.value != '') {
        return customKeyTextElement.value
    }

    const keySelections = getCheckboxValues("radio")
    let selectedKey = Object.keys(keySelections).find(key => keySelections[key] === true)
    return ''

}

function handleFormattingOptions(message: string, key: string) {
    const formattingOptions = getCheckboxValues("checkbox")

    message = message.toLowerCase()
    message = message.replaceAll(' ', '')
    key = key.toLowerCase()
    message = replaceNewLineChars(message)
    key = replaceNewLineChars(key)

    if (formattingOptions['hyphenated']) {
        message = splitHyphenatedWords(message)
        key = splitHyphenatedWords(key)
    }
    if (formattingOptions['doubleDash']) {
        message = replaceDoubleDashes(message)
        key = replaceDoubleDashes(key)
    }
    if (formattingOptions['quotation']) {
        message = removeQuotationMarks(message)
        key = removeQuotationMarks(key)
    }
    return { message, key }
}

keySelectionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.id == "customKeyButton") {
            customKeyTextElement.classList.remove("hidden")
            return
        }
        customKeyTextElement.classList.add("hidden")
        if (customKeyTextElement.classList.contains("hidden")) {
            customKeyTextElement.value = ''
        }
    })
})

copyToClipboardButton!.addEventListener("click", () => {
    copyToClipboard(resultDialogResults!)
        .then((result) => {
            if (result) {
                triggerClipboardAnimation()
            } else {
                alert("Unable to copy to clipboard, please try again")
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
