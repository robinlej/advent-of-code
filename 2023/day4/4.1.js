const fs = require("node:fs");
fs.readFile("input.txt", "utf8", (err, data) => {
    console.log(getTotal(data));
});

function getTotal(data) {
    const input = data.trim().split("\n")
        .map(row =>
            row.split(":")[1]
                .split("|")
                .map(results => new Set(results.match(/[0-9]{1,}/g)))
        );

    let total = 0;
    input.forEach(row => {
        let points = 0;
        row[1].forEach(nr => {
            if (row[0].has(nr)) {
                if (points === 0) {
                    points++;
                } else {
                    points *= 2;
                }
            }
        });
        total += points;
    });

    return total;
}