const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getLongestPath(data));
});

const TILES = {
    "|": { n: true, s: true },
    L: { n: true, e: true },
    J: { n: true, w: true },
    "-": { w: true, e: true },
    F: { e: true, s: true },
    ".": { n: false, e: false, s: false, w: false },
    7: { w: true, s: true },
    S: { start: true, w: true, s: true }, // S is a 7. Easier to write it than decode it.
};

function parseData(data) {
    const START = { x: 0, y: 0 };
    return [
        data
            .trim()
            .split("\n")
            .map((row, y) =>
                row.split("").map((tile, x) => {
                    if (tile === "S") {
                        START.x = x;
                        START.y = y;
                    }
                    return Object.assign({ x, y }, TILES[tile]);
                })
            ),
        START,
    ];
}

function getLongestPath(data) {
    const [pipes, start] = parseData(data);

    let longestPath = 0;
    let currentTiles = [pipes[start.y][start.x], pipes[start.y][start.x]];
    let currentOrigins = ["s", "w"];
    while (longestPath === 0 || currentTiles[0] !== currentTiles[1]) {
        let nextOrigins = [];
        let y = [currentTiles[0].y, currentTiles[1].y];
        let x = [currentTiles[0].x, currentTiles[1].x];
        for (let i = 0; i < 2; i++) {
            // Going to the north if we're not coming from there
            if (currentTiles[i].n && currentOrigins[i] !== "n") {
                y[i] -= 1;
                // Going north means next tile's origin is south
                nextOrigins[i] = "s";
            }
            if (currentTiles[i].s && currentOrigins[i] !== "s") {
                y[i] += 1;
                nextOrigins[i] = "n";
            }
            if (currentTiles[i].w && currentOrigins[i] !== "w") {
                x[i] -= 1;
                nextOrigins[i] = "e";
            }
            if (currentTiles[i].e && currentOrigins[i] !== "e") {
                x[i] += 1;
                nextOrigins[i] = "w";
            }
            currentOrigins[i] = nextOrigins[i];
            currentTiles[i] = pipes[y[i]][x[i]];
        }

        longestPath++;
    }
    return longestPath;
}
