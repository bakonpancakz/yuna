// Code taken from:
// https://muffinman.io/blog/javascript-time-ago-function/

const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function padNum(num: number) {
    return String(num).padStart(2, "0")
}

function getFormattedDate(date: Date, prefomattedDate: string | boolean = false, hideYear: boolean = false) {
    const day = padNum(date.getDate());
    const month = MONTH_NAMES[date.getMonth()];
    const year = padNum(date.getFullYear());
    const hours = padNum(date.getHours());
    const minutes = padNum(date.getMinutes());

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // Jan 10 at 10:20
        return `${month} ${day} at ${hours}:${minutes}`;
    }

    // Jan 10 2017 at 10:20
    return `${month} ${day} ${year} at ${hours}:${minutes}`;
}


// --- Main function
export function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const time = today.getTime();
    const yesterday = new Date(time - DAY_IN_MS);
    const seconds = Math.round((time - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today');     // Today at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // Jan 10 at 10:20
    }

    return getFormattedDate(date);                  // Jan 10 2017 at 10:20
}