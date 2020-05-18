export function unixTimeConverter(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (hours < 10 ? ('0' + hours) : hours) + ':'
        + (minutes < 10 ? ('0' + minutes) : minutes) + ':'
        + (seconds < 10 ? ('0' + seconds) : seconds);
}

export function dateDisplayConverter(dateIn: Date) {
    const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = dow[dateIn.getDay()];
    const hours = dateIn.getHours();
    const minutes = dateIn.getMinutes();
    return day + ' ' 
    + (hours < 10 ? ('0' + hours) : hours) + ':'
    + (minutes < 10 ? ('0' + minutes) : minutes);
}