const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getPossibilities(data));
});

function getPossibilities(input) {
    const [ time, distance ] = input.trim().split("\n")
        .map(row => parseInt(row.trim().split(":")[1].replace(/\s/g, "")));
    
    let min;
    for (let ms = 0; ms < time; ms++) {
        if (ms * (time - ms) > distance) {
            min = ms;
            break;
        }
    }
    return time - (min * 2) + 1;
}
