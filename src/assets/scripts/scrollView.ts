export default function scrollToElement(elementSelector: string) {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
}

