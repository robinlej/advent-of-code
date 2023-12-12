const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getTotal(data));
});

const SNAFU = "=-012";
const BASE_INDEX = SNAFU.indexOf(0);
// const ADD_TABLE = {
//     6: ["1", "1"],
//     5: ["1", "0"],
//     4: ["1", "-"],
//     3: ["1", "="],
//     2: ["0", "2"],
//     1: ["0", "1"],
//     0: ["0", "0"],
//     "-1": ["0", "-"],
//     "-2": ["0", "="],
//     "-3": ["-", "2"],
//     "-4": ["-", "1"],
//     "-5": ["-", "0"],
//     "-6": ["-", "-"],
// };

function parseData(data) {
    return data
        .trim()
        .split("\n")
        .map((n) => n.split(""));
}

function getTotal(data) {
    const input = parseData(data);
    return input.reduce((acc, n) => addSnafu(acc, n), "");
}

const getModifier = (nr) => SNAFU.indexOf(nr) - 2;

// Adds 2 snafu numbers together.
function addSnafu(s1, s2) {
    const result = Array(Math.max(s1.length, s2.length) + 1).fill(0);
    s1 = [...s1].reverse().join("");
    s2 = [...s2].reverse().join("");
    for (let i = 0; i < result.length; i++) {
        // can't rely on truthy values because of 0
        if (s1[i] === undefined && s2[i] === undefined) break;
        let sum;
        if (s1[i] !== undefined && s2[i] !== undefined) {
            sum = getModifier(s1[i]) + getModifier(s2[i]) + getModifier(result[i]);
        } else if (result[i]) {
            sum = getModifier(s1[i] ?? s2[i]) + getModifier(result[i]);
        } else {
            result[i] = s1[i] ?? s2[i];
            continue;
        }
        // result[i] = ADD_TABLE[sum][1];
        result[i] = SNAFU[(SNAFU.length + (BASE_INDEX + sum)) % 5];
        // result[i + 1] = ADD_TABLE[sum][0];
        result[i + 1] = SNAFU[BASE_INDEX + Math.floor((BASE_INDEX + sum) / 5)];
    }
    return result.reverse().join("").replace(/^0/, "");
}
