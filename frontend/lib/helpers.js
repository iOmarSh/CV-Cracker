const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
// Extend string prototype to capitalize first letter

String.prototype.capitalize = function () {
    return capitalizeFirstLetter(this);
}

function formatDateRange(startYear, endYear) {
    const start = new Date(startYear);
    const end = new Date(endYear);

    const startFormatted = `${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()}`;
    const endFormatted = end != "Invalid Date" ? `${end.toLocaleString('default', { month: 'short' })} ${end.getFullYear()}` : 'Present';

    return `${startFormatted} - ${endFormatted}`;
}

const toTitleCase = (str) => {
    if (!str) return "";
    const minorWords = ['and', 'of', 'the', 'in', 'on', 'at', 'to', 'for', 'by', 'with', 'a', 'an'];
    return str.toLowerCase().replace(/\w\S*/g, (txt, offset) => {
        if (offset && minorWords.includes(txt)) {
            return txt;
        }
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export { capitalizeFirstLetter, formatDateRange, toTitleCase };