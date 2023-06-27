/**
 * Function that capitalizes a string using titleCase
 * @param {hello world} str
 * @returns Hello World
 */
export const capitalize = (str) => {
    var splitStr = str.toLowerCase().split(" ");

    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
};
