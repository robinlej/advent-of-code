const fs = require("node:fs");
fs.readFile("input.txt", "utf8", (err, data) => {
    console.log(getTotal(data));
});

function getTotal(data) {
    const input = data.trim().split("\n")
        .map(row => {
            let card = row
                .split(":")[1]
                .split("|")
                .map(results =>
                    new Set(results.match(/[0-9]{1,}/g))
                );
            card.push({ newCards: 0, copies: 1 });
            return card;
        });

    let total = 0;
    input.forEach((row, y) => {
        row[1].forEach(nr => {
            if (row[0].has(nr)) {
                row[2].newCards++;
            }
        });
        
        for (let i = row[2].newCards; i > 0; i--) {
            const followingRow = input[y + i];
            if (followingRow) {
                followingRow[2].copies += row[2].copies;
            }
        }

        total += row[2].copies;
    });

    return total;
}