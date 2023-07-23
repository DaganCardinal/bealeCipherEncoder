export { }

interface CheckboxStatuses {
    [key: string]: boolean;
}

// Pulls all checkboxes/radios from the page and assigns their names and statuses to an object
export function getCheckboxValues(type: string): CheckboxStatuses {
    const allCheckboxes = document.querySelectorAll(
        `input[type=${type}]`
    ) as NodeListOf<HTMLInputElement>;
    const checkboxStatuses = {} as CheckboxStatuses;

    allCheckboxes.forEach((checkbox) => {
        checkboxStatuses[checkbox.id] = checkbox.checked;
    });
    return checkboxStatuses
}

export async function copyToClipboard(copyElement: HTMLElement): Promise<boolean> {
    try {
        let text = copyElement.textContent!;
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        return false;
    }
}

export function triggerClipboardAnimation() {
    const copyToClipboardButton = document.getElementById("clipboardButton")
    if (!copyToClipboardButton?.getAttribute('aria-expanded') || copyToClipboardButton.getAttribute('aria-expanded') == 'false') {
        copyToClipboardButton?.setAttribute('aria-expanded', 'true')
        setTimeout(() => {
            copyToClipboardButton?.setAttribute('aria-expanded', 'false')
        }, 4000)
    } else {
        copyToClipboardButton?.setAttribute('aria-expanded', 'false')
    }
}

// // //
// Formatting functions
// // //

export function replaceNewLineChars(text: string): string {
    return text.replace(/\n/g, " ")
}

export function splitHyphenatedWords(text: string): string {
    return text.replace(/-/g, " ")
}

export function replaceDoubleDashes(text: string): string {
    return text.replace(/--/g, " ")
}

export function removeQuotationMarks(text: string): string {
    text = text.replace(/'/g, "")
    return text.replace(/"/g, "")
}