const path = require("path");
const fs = require("node:fs");
fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
    console.log(getTotal(data));
});

const CARDS_VALUES = { A: 14, K: 13, Q: 12, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, J: 1 };
const TYPES_VALUES = { five: 7, four: 6, fullHouse: 5, three: 4, pairs: 3, pair: 2, one: 1 };

function getTotal(data) {
    // data parsing
    const hands = data.trim().split("\n").map(hand => {
        return hand.split(" ").map((input, i) => {
            if (i === 0) {
                return input.split("").map(card => CARDS_VALUES[card]);
            } else {
                return parseInt(input);
            }
        });
    });

    const handsWithTypes = hands.map(hand => [ TYPES_VALUES[getType(hand[0])], ...hand ])
        .sort((handA, handB) => {
            if (handA[0] - handB[0]) return handA[0] - handB[0];
            for (let i = 0; i < 5; i++) {
                if (handA[1][i] - handB[1][i]) return handA[1][i] - handB[1][i];
            }
        });

    return handsWithTypes.reduce((acc, hand, i) => {
        acc += hand[2] * (i + 1);
        return acc;
    }, 0);
}

function getType(hand) {
    let cards = {};
    hand.forEach(card => {
        cards[card] ? cards[card]++ : cards[card] = 1;
    });

    let hasFive = hasFour = hasThree = hasPairs = hasPair = false;
    const values = Object.values(cards);
    if (hand.every(card => card === hand[0])) hasFive = true;
    else if (values.some(val => val === 4)) hasFour = true;
    else {
        if (values.some(val => val === 3)) hasThree = true;
        if (values.some(val => val === 2)) hasPair = true;
        if (hasPair && values.findIndex(val => val === 2) !== values.findLastIndex(val => val === 2)) {
            hasPair = false;
            hasPairs = true;
        }
    }

    if (
        hasFive
        || (hasFour && cards[1]) // 4 + 1J or 1 + 4J
        || (hasThree && hasPair && cards[1]) // 3 + 2J or 2 + 3J
    ) return "five";
    if (
        hasFour
        || (hasThree && !hasPair && cards[1]) // 3 + 1J or 1 + 3J
        || (hasPairs && cards[1] === 2) // 2 + 2J
    ) return "four";
    if (
        hasThree && hasPair
        || hasPairs && cards[1] // either 1J + 2 pairs or 2J + pair + 1 random
    ) return "fullHouse";
    if (
        hasThree
        || (hasPair && cards[1]) // 2 + 1J or 1 + 2J
    ) return "three";
    if (hasPairs) return "pairs";
    if (hasPair || cards[1]) return "pair";
    return "one";
}
