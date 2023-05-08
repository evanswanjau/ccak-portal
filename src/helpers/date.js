module.exports.simpleDate = (date) => {
    console.log(date);
    let newDate = new Date(date).toString();

    newDate = newDate.split(" ");

    return (
        newDate[2].replace(/^0+/, "") +
        nth(newDate[2]) +
        " " +
        newDate[1] +
        " " +
        newDate[3]
    );
};

const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};
