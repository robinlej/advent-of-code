const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getTotal(data));
});

function parseData(data) {
    return data.split("\n").map((l) => l.split(""));
}

function expandUniverse(input) {
    const expandedRows = [];
    const expandedCols = [];

    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i].every((c) => c === ".")) {
            expandedRows.push(i);
        }
    }
    for (let i = input[0].length - 1; i >= 0; i--) {
        if (input[0][i] === ".") {
            const column = input.map((l) => l[i]);
            if (column.every((c) => c === ".")) {
                expandedCols.push(i);
            }
        }
    }

    return [expandedRows.reverse(), expandedCols.reverse()];
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
    const universe = parseData(data);
    const [expandedRows, expandedCols] = expandUniverse(universe);
    const galaxiesCoords = getGalaxiesCoords(universe);
    let total = 0;

    galaxiesCoords.forEach((galaxy, i) => {
        galaxiesCoords.slice(i + 1).forEach((g) => {
            const expansionIndexes = {
                src: {
                    x: findExpansionIndex(expandedCols, "x", galaxy),
                    y: findExpansionIndex(expandedRows, "y", galaxy),
                },
                dest: {
                    x: findExpansionIndex(expandedCols, "x", g),
                    y: findExpansionIndex(expandedRows, "y", g),
                },
            };

            const expansionModifier = {
                x: getExpansionModifier(expansionIndexes, "x"),
                y: getExpansionModifier(expansionIndexes, "y"),
            };

            const deltaX =
                g.x - galaxy.x >= 0
                    ? Math.abs(g.x + expansionModifier.x - galaxy.x)
                    : Math.abs(galaxy.x + expansionModifier.x - g.x);
            const deltaY = Math.abs(g.y + expansionModifier.y - galaxy.y);
            total += deltaX + deltaY;
        });
    });

    return total;
}

function findExpansionIndex(array, axis, galaxy) {
    return array.findIndex((location, i) => {
        return (
            location < galaxy[axis] &&
            ((array[i + 1] && galaxy[axis] < array[i + 1]) || !array[i + 1])
        );
    });
}
function getExpansionModifier(expansionIndexes, axis) {
    const EXPANSION = 1000000;
    if (expansionIndexes.src[axis] === expansionIndexes.dest[axis]) {
        return 0;
    } else {
        return (EXPANSION - 1) * Math.abs(expansionIndexes.dest[axis] - expansionIndexes.src[axis]);
    }
}
