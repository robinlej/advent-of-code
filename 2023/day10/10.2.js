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

    let pathTiles = new Set();
    let currentTiles = [pipes[start.y][start.x], pipes[start.y][start.x]];
    let currentOrigins = ["s", "w"];
    while (!pathTiles.size || !pathTiles.has(currentTiles[0])) {
        let nextOrigins = [];
        let y = [currentTiles[0].y, currentTiles[1].y];
        let x = [currentTiles[0].x, currentTiles[1].x];
        for (let i = 0; i < 2; i++) {
            pathTiles.add(currentTiles[i]);
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
    }

    // Just for the visualisation.
    console.log(visualise(pipes, pathTiles));

    return getEnclosedTiles(pipes, pathTiles);
}

// Returns the number of tiles enclosed in the path area.
// The global idea is: a point is in the polygon if it crossed the perimeter an
// odd number of times. This is tricky here because how should a line on the
// perimeter count?
// Solution: if counting on the X-axis, only count the paths tiles that come
// from or go to the north/south (0.5 for each, so 1 full point for a pipe |).
// But, if it comes from the north (/south) and goes back north (/south): we
// don't count it (+0.5, -0.5).
function getEnclosedTiles(pipes, pathTiles) {
    let tilesInside = new Set();
    pipes.forEach((row) => {
        let crossedLoopX = 0;
        let lastX;
        for (let i = 0; i < row.length; i++) {
            const tile = row[i];
            if (pathTiles.has(tile)) {
                if (tile.n ^ tile.s) {
                    if ((tile.n && lastX === "n") || (tile.s && lastX === "s")) {
                        crossedLoopX -= 0.5;
                        lastX = undefined;
                    } else {
                        crossedLoopX += 0.5;
                        lastX = lastX ? undefined : tile.n ? "n" : "s";
                    }
                }
                if (tile.n && tile.s) crossedLoopX++;
                continue;
            }
            if (crossedLoopX % 2) tilesInside.add(tile);
        }
    });

    return tilesInside.size;
}

function visualise(pipes, pathTiles) {
    return pipes
        .map((row) =>
            row
                .map((tile) => {
                    if (!pathTiles.has(tile)) {
                        return ".";
                    } else {
                        const sign = Object.keys(TILES).filter((key) => {
                            return Object.keys(TILES[key]).every((k) => TILES[key][k] === tile[k]);
                        })[0];
                        return sign;
                    }
                })
                .join("")
                .replaceAll("F", "\u250F")
                .replaceAll("J", "\u251B")
                .replaceAll("L", "\u2517")
                .replaceAll("7", "\u2513")
                .replaceAll("|", "\u2503")
                .replaceAll("-", "\u2501")
        )
        .join("\n");
}
