const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(parseToSnafu(getTotal(data)));
});

const SNAFU = "=-012";

function parseData(data) {
    return data
        .trim()
        .split("\n")
        .map((n) => parseSnafuNr(n));
}
function parseSnafuNr(nr) {
    let trueNr = 0;
    nr = nr.split("");
    nr.forEach((l, i) => {
        const pow = nr.length - 1 - i;
        trueNr += 5 ** pow * (SNAFU.indexOf(l) - 2);
    });
    return trueNr;
}

function getTotal(data) {
    const input = parseData(data);
    return input.reduce((acc, n) => acc + n, 0);
}

function parseToSnafu(nr) {
    let maxPow = 0;
    while (5 ** maxPow < nr) {
        maxPow++;
    }
    if (nr < 5 ** maxPow / 2) maxPow--;

    const snafuNr = Array(maxPow + 1);
    for (let i = snafuNr.length - 1; i >= 0; i--) {
        let currSnafuDigit;

        if (nr <= Math.floor(-(5 ** i) / 2)) {
            while (nr <= Math.floor(-(5 ** i) / 2)) {
                currSnafuDigit = currSnafuDigit ? "=" : "-";
                nr += 5 ** i;
            }
        } else if (nr >= Math.ceil(5 ** i / 2)) {
            while (nr >= Math.ceil(5 ** i / 2)) {
                currSnafuDigit = currSnafuDigit ? 2 : 1;
                nr -= 5 ** i;
            }
        } else {
            currSnafuDigit = 0;
        }
        snafuNr[snafuNr.length - 1 - i] = currSnafuDigit;
    }
    return snafuNr.join("");
}
