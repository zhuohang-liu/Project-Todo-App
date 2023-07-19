
export function getDate(date) {
    return [
        date.getFullYear(),
        ((date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)),
        ((date.getDate() < 10 ? "0" : "") + (date.getDate()))
    ].join("-");
}