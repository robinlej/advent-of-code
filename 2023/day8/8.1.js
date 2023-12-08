const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getStepsNr(data));
});

function parseData(data) {
    let [directions, network] = data.trim().split("\n\n");
    network = network
        .trim()
        .split("\n")
        .reduce((acc, node) => {
            acc[node.split(" = ")[0]] = node.split(" = ")[1].replace(/[()]/g, "").split(", ");
            return acc;
        }, {});
    directions = directions
        .trim()
        .split("")
        .map((dir) => (dir === "L" ? 0 : 1));

    return [directions, network];
}

function getStepsNr(data) {
    const [directions, network] = parseData(data);

    const count = { total: 0, directions: 0 };
    let currentNode = "AAA";
    while (currentNode !== "ZZZ") {
        if (count.directions === directions.length) {
            count.directions = 0;
        }

        currentNode = network[currentNode][directions[count.directions]];
        count.total++;
        count.directions++;
    }

    return count.total;
}
