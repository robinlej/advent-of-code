const fs = require("node:fs");
fs.readFile("input.txt", "utf8", (err, data) => {
    console.log(getLocation(data));
});

function getLocation(data) {
    let [ seeds, ...input] = data.trim().split("\n\n")
        .map(step => step.split(":")[1]);
    
    seeds = seeds.trim().split(" ");
    const seedsRanges = [];
    for (let i = 0; i < seeds.length; i += 2) {
        seedsRanges.push([parseInt(seeds[i]), parseInt(seeds[i+1])]);
    }
    const steps = input.map(step => step.trim().split("\n").map(row =>
        row.trim().split(" ").map(n => parseInt(n))
    ));
    
    let possibilities = [[]];
    seedsRanges.forEach(seedRange => {
        const lowBoundary = seedRange[0];
        const highBoundary = seedRange[0] + seedRange[1] - 1;

        possibilities[0].push({ lowBoundary, highBoundary });
    });

    possibilities.push([]);
    possibilities[0].forEach(boundaries => {
        pushNewPossibilities(boundaries)
    });
    function pushNewPossibilities(boundaries) {
        const i = possibilities.length - 2;
        let newPossibilities = [];
        const lowBoundary = boundaries.lowBoundary;
        const highBoundary = boundaries.highBoundary;
        
        steps[i].forEach(destSrcRange => {
            const range = destSrcRange[2];
            const destLowBoundary = destSrcRange[0];
            const destHighBoundary = destLowBoundary + range - 1;
            const srcLowBoundary = destSrcRange[1];
            const srcHighBoundary = srcLowBoundary + range - 1;

            // This range is out of bounds
            if (highBoundary < srcLowBoundary || lowBoundary > srcHighBoundary) return;
            // interval totally within src boundaries
            if (lowBoundary <= srcLowBoundary && highBoundary >= srcHighBoundary) {
                newPossibilities.push({
                    lowBoundary: destLowBoundary,
                    highBoundary: destHighBoundary,
                    prevStepLowBoundary: srcLowBoundary,
                    prevStepHighBoundary: srcHighBoundary
                });
                return;
            }
            // starting interval: only partially corresponds (the 2nd half)
            if (lowBoundary > srcLowBoundary && highBoundary >= srcHighBoundary) {
                newPossibilities.push({
                    lowBoundary: destLowBoundary + (lowBoundary - srcLowBoundary),
                    highBoundary: destHighBoundary,
                    prevStepLowBoundary: lowBoundary,
                    prevStepHighBoundary: srcHighBoundary
                });
                return;
            }
            // ending interval: only partially corresponds (the 1st half)
            if (lowBoundary <= srcLowBoundary && highBoundary < srcHighBoundary) {
                newPossibilities.push({
                    lowBoundary: destLowBoundary,
                    highBoundary: destHighBoundary - (srcHighBoundary - highBoundary),
                    prevStepLowBoundary: srcLowBoundary,
                    prevStepHighBoundary: highBoundary
                });
                return;
            }
            // cramped interval: neither the start nor the end of the destination interval corresponds
            if (lowBoundary > srcLowBoundary && highBoundary < srcHighBoundary) {
                newPossibilities.push({
                    lowBoundary: destLowBoundary + (lowBoundary - srcLowBoundary),
                    highBoundary: destHighBoundary - (srcHighBoundary - highBoundary),
                    prevStepLowBoundary: lowBoundary,
                    prevStepHighBoundary: highBoundary
                });
                return;
            }
        });

        newPossibilities.sort((a, b) => a.prevStepLowBoundary - b.prevStepLowBoundary);
        // nothing matched
        if (!newPossibilities.length) {
            newPossibilities.push({
                lowBoundary,
                highBoundary,
                prevStepLowBoundary: lowBoundary,
                prevStepHighBoundary: highBoundary,
            });
        } else {
            // nothing matched the lowBoundary
            if (newPossibilities.every(matchedBoundaries => matchedBoundaries.prevStepLowBoundary > lowBoundary)) {
                newPossibilities.unshift({
                    lowBoundary,
                    highBoundary: newPossibilities[0].prevStepLowBoundary - 1,
                    prevStepLowBoundary: lowBoundary,
                    prevStepHighBoundary: newPossibilities[0].prevStepLowBoundary - 1,
                });
            }
            // nothing matched the highBoundary
            if (newPossibilities.every(matchedBoundaries => matchedBoundaries.prevStepHighBoundary < highBoundary)) {
                newPossibilities.push({
                    lowBoundary: newPossibilities[newPossibilities.length - 1].prevStepHighBoundary + 1,
                    highBoundary,
                    prevStepLowBoundary: newPossibilities[newPossibilities.length - 1].prevStepHighBoundary + 1,
                    prevStepHighBoundary: highBoundary,
                });
            }
            // some values in the middle were not matched
            for (let j = 0; j < newPossibilities.length - 1; j++) {
                if (
                    newPossibilities[j].prevStepHighBoundary && newPossibilities[j + 1].prevStepLowBoundary
                    && newPossibilities[j].prevStepHighBoundary - newPossibilities[j + 1].prevStepLowBoundary !== -1
                ) {
                    newPossibilities.push({
                        lowBoundary: newPossibilities[j].prevStepHighBoundary + 1,
                        highBoundary: newPossibilities[j + 1].prevStepLowBoundary - 1,
                    });
                }
            }
        }
        possibilities[i + 1].push(...newPossibilities);
    }
    while (possibilities.length - 1 < steps.length) {
        const i = possibilities.length - 1;
        possibilities.push([]);
        possibilities[i].forEach(boundaries => pushNewPossibilities(boundaries));
    }
    
    return possibilities[possibilities.length - 1].sort((a, b) => a.lowBoundary - b.lowBoundary)[0].lowBoundary;
}