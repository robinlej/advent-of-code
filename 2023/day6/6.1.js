const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getPossibilities(data));
});

function range(range, start = 0) {
    return [...Array(range).keys()].map(i => i + start);
}

function getPossibilities(input) {
    let possibilities = 1;
    const [ times, distances ] = input.trim().split("\n")
        .map(row =>
            row.trim()
                .split(":")[1]
                .trim()
                .match(/\d+?(\s|$)/g)
                .map(n => parseInt(n))
        );
    
    times.forEach((time, i) => {
        let racePossibilities = 0;
        const timeRange = range(time);
        timeRange.forEach(s => {
            if (s * (time - s) > distances[i]) {
                racePossibilities++;
            }
        });
        possibilities *= racePossibilities;
    });

    return possibilities;
}
