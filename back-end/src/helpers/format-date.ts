export function formatDate(inputDateStr: Date) {
    const inputDate = new Date(inputDateStr);

    return [
        inputDate.getMonth(),
        inputDate.getDate(),
        inputDate.getFullYear(),
        inputDate.getHours(),
        inputDate.getMinutes(),
    ];
}
