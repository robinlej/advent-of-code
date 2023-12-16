const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getTotal(data));
});

function parseData(data) {
    return data.split("\n").map((l) => l.split(""));
}

function expandUniverse(input) {
    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i].every((c) => c === ".")) {
            input.splice(i, 0, Array(input[i].length).fill("."));
        }
    }
    for (let i = input[0].length - 1; i >= 0; i--) {
        if (input[0][i] === ".") {
            const column = input.map((l) => l[i]);
            if (column.every((c) => c === ".")) {
                input.forEach((l) => {
                    l.splice(i, 0, ".");
                });
            }
        }
    }

    return input;
}

function getGalaxiesCoords(universe) {
    let galaxiesCoords = [];
    universe.forEach((l, y) => {
        l.forEach((c, x) => {
            if (c === "#") {
                galaxiesCoords.push({ x, y });
            }
        });
    });

    return galaxiesCoords;
}

function getTotal(data) {
    const universe = expandUniverse(parseData(data));
    const galaxiesCoords = getGalaxiesCoords(universe);
    let total = 0;

    galaxiesCoords.forEach((galaxy, i) => {
        galaxiesCoords.slice(i).forEach((g) => {
            total += Math.abs(g.x - galaxy.x) + Math.abs(g.y - galaxy.y);
        });
    });

    return total;
}
