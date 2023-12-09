const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    const totals = getTotal(data);
    console.log(`Part 1: ${totals[1]}\nPart 2: ${totals[0]}`);
});

function parseData(data) {
    return data
        .trim()
        .split("\n")
        .map((row) => row.split(" ").map((n) => Number(n)));
}

function getTotal(data) {
    const histories = parseData(data);
    const allMissingValues = [[], []];

    histories.forEach((history) => {
        const missingValues = getMissingValues(history);
        allMissingValues[0].push(missingValues[0]);
        allMissingValues[1].push(missingValues[1]);
    });

    const totalBefore = allMissingValues[0].reduce((acc, value) => acc + value, 0);
    const totalAfter = allMissingValues[1].reduce((acc, value) => acc + value, 0);

    return [totalBefore, totalAfter];
}

function getNextDifferenceStep(history) {
    const step = [];
    for (let i = 0; i < history.length - 1; i++) {
        const diff = history[i + 1] - history[i];
        step.push(diff);
    }
    return step;
}

function getDifferenceSteps(history) {
    const steps = [history];
    while (steps[steps.length - 1].some((step) => step !== steps[steps.length - 1][0])) {
        steps.push(getNextDifferenceStep(steps[steps.length - 1]));
    }
    return steps;
}

function getMissingValues(history) {
    let missingValues = [0, 0];
    const steps = getDifferenceSteps(history);
    for (let i = steps.length - 1; i >= 0; i--) {
        missingValues[0] = steps[i][0] - missingValues[0];
        missingValues[1] += steps[i][steps[i].length - 1];
    }
    return missingValues;
}
