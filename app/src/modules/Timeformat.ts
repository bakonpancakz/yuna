const Time = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

//* Returns Total, and Remainder
function div(str: string, suffix: string, start: number, divisor: number): [string, number] {

    //* Perform Modulus
    let leftover = start;
    let iterations = 0;
    while ((leftover - divisor) >= 0) {
        leftover -= divisor;
        iterations++;
    }

    //* Modify String
    if (iterations > 0) str = `${str} ${iterations}${suffix}`

    return [str.trim(), leftover];
}


export function toDuration(d: number): string {
    var s = "";
    var [s, d] = div(s, "d", d, Time.day);
    var [s, d] = div(s, "h", d, Time.hour);
    var [s, d] = div(s, "m", d, Time.minute);
    var [s, d] = div(s, "s", d, Time.second);
    return s;
}