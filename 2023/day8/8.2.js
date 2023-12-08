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

    const count = { total: 0, directions: 0, nodes: new Set() };
    let currentNodes = Object.keys(network).filter((node) => node.endsWith("A"));
    while (currentNodes.length) {
        if (count.directions === directions.length) {
            count.directions = 0;
        }

        let nextNodes = [];
        currentNodes.forEach((node) => {
            const nextNode = network[node][directions[count.directions]];
            if (nextNode.endsWith("Z")) count.nodes.add(count.total + 1);
            else nextNodes.push(nextNode);
        });
        currentNodes = nextNodes;
        count.total++;
        count.directions++;
    }

    return getLCM(...count.nodes);
}

function getPrimes(max) {
    const sieve = [];
    const primes = new Set([2]);
    for (let i = 3; i <= max; i += 2) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.add(i);
            for (let j = i ** 2; j <= max; j += i * 2) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

function factorize(nr) {
    const primes = getPrimes(nr);
    const factors = [];
    primes.forEach((prime) => {
        while (nr % prime === 0) {
            factors.push(prime);
            nr /= prime;
        }
    });
    return factors;
}

function getLCM(nr1, nr2, ...rest) {
    const factors1 = typeof nr1 !== "number" ? nr1 : factorize(nr1);
    const factors2 = factorize(nr2);

    const LCMFactors = [];
    factors1.forEach((factor, i) => {
        LCMFactors.push(factor);
        if (factors2.includes(factor)) {
            factors2.splice(
                factors2.findIndex((f) => f === factor),
                1
            );
        }
    });
    LCMFactors.push(...factors2);

    if (rest.length) return getLCM(LCMFactors, ...rest);
    return LCMFactors.reduce((acc, factor) => acc * factor, 1);
}
