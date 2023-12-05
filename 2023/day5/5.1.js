const fs = require("node:fs");
fs.readFile("input.txt", "utf8", (err, data) => {
    console.log(getLocation(data));
});

function getLocation(data) {
    let [ seeds, ...input] = data.trim().split("\n\n")
        .map(step => step.split(":")[1]);
    
    seeds = seeds.trim().split(" ").map(seed => parseInt(seed));
    const steps = input.map(step => step.trim().split("\n").map(row =>
        row.trim().split(" ").map(n => parseInt(n))
    ));
    
    function getDestinationFromSource(source, step) {
        if (steps.length === step) return source;

        const matchingRow = steps[step].find(row => row[1] <= source && row[1] + row[2] - 1 >= source);
        if (!matchingRow) return source;
        return matchingRow[0] + (source - matchingRow[1]);
    }
    const locations = seeds.map(seed => {
        let destination = seed;
        for (let i = 0; i < steps.length; i++) {
            destination = getDestinationFromSource(destination, i);
        }
        return destination;
    });
    
    return Math.min(...locations);
}