const inputs = `Game 1: 8 green, 4 red, 4 blue; 1 green, 6 red, 4 blue; 7 red, 4 green, 1 blue; 2 blue, 8 red, 8 green
Game 2: 11 green, 7 blue, 15 red; 13 red, 6 green, 2 blue; 7 green, 9 red, 10 blue; 5 blue, 1 red, 11 green; 4 blue, 18 green; 4 red, 8 blue, 18 green
Game 3: 7 red, 10 green, 4 blue; 2 blue, 3 green, 5 red; 9 red, 7 green, 3 blue; 3 blue, 6 green, 18 red
Game 4: 1 blue, 2 green, 5 red; 10 red, 1 blue, 3 green; 14 red
Game 5: 16 red, 4 green, 19 blue; 13 blue, 9 red; 7 green, 14 red, 2 blue; 5 green, 18 blue, 4 red; 7 red, 2 blue, 3 green; 8 blue, 12 green
Game 6: 3 blue, 8 green; 4 red, 5 green; 5 red, 8 blue, 5 green; 8 blue, 4 green; 3 red, 7 green, 2 blue
Game 7: 7 red, 2 blue; 5 red, 6 green; 10 red; 2 blue, 12 red, 2 green; 4 red, 1 blue, 1 green; 9 green, 2 blue, 10 red
Game 8: 3 red, 7 green, 3 blue; 2 green, 3 blue, 3 red; 3 blue, 4 green, 1 red; 3 blue, 3 red; 2 blue, 6 green; 2 red, 7 green, 1 blue
Game 9: 5 red, 6 green; 6 red; 2 blue, 3 green, 9 red; 6 green, 2 blue
Game 10: 5 red, 8 blue, 5 green; 15 red, 6 green, 7 blue; 8 blue, 6 red, 5 green; 5 green, 2 blue; 12 red, 6 blue; 6 green, 16 red, 6 blue
Game 11: 3 red, 7 blue; 2 red, 3 blue, 6 green; 4 red, 5 green, 2 blue
Game 12: 15 green, 6 red, 2 blue; 3 red, 8 green, 9 blue; 8 blue, 2 red, 7 green; 5 red, 11 green, 6 blue
Game 13: 1 blue; 1 green, 6 red; 8 red, 3 blue; 5 blue, 8 red, 2 green
Game 14: 4 green, 1 blue; 8 blue, 5 green, 1 red; 2 green, 8 blue, 3 red
Game 15: 7 blue, 9 red, 8 green; 9 green, 12 blue, 5 red; 8 green, 10 blue, 2 red
Game 16: 1 blue, 1 red, 14 green; 6 green, 4 blue, 1 red; 16 blue, 14 green; 6 green, 2 red, 9 blue; 1 red, 1 blue; 2 red, 13 green, 7 blue
Game 17: 1 red, 9 green; 9 red, 5 blue, 2 green; 2 red, 8 green, 5 blue; 5 blue, 1 green, 3 red; 3 green, 5 blue; 3 red, 5 blue, 9 green
Game 18: 3 blue, 5 red, 3 green; 8 blue, 14 green; 3 blue, 11 red; 2 blue, 10 red, 9 green
Game 19: 7 green, 8 blue, 10 red; 1 green, 10 red, 2 blue; 6 blue, 4 red, 11 green; 7 red, 4 green; 6 blue, 4 red; 4 green, 2 red, 3 blue
Game 20: 5 red; 16 blue, 4 green, 7 red; 1 red, 1 green, 4 blue; 3 blue, 4 green, 7 red; 5 blue, 2 red, 3 green; 17 blue, 5 red
Game 21: 11 red, 4 green, 4 blue; 11 red, 5 blue, 2 green; 11 red, 13 green, 2 blue; 13 green, 6 red, 5 blue; 7 green, 4 blue, 8 red; 6 red, 8 blue, 14 green
Game 22: 2 green, 1 red, 6 blue; 3 blue, 2 green; 7 green, 10 red; 10 red, 7 blue, 5 green
Game 23: 14 green, 8 blue; 2 red, 5 green; 8 red, 16 green, 10 blue; 1 green, 7 red, 8 blue; 15 green, 5 red; 15 green, 2 red, 5 blue
Game 24: 4 blue, 1 green, 1 red; 1 blue, 8 green, 3 red; 4 red, 9 blue, 4 green
Game 25: 2 blue, 1 green, 3 red; 2 green, 4 red; 2 green, 1 blue
Game 26: 3 red, 5 green, 4 blue; 5 green, 8 blue; 1 blue, 3 green, 3 red; 7 blue, 2 red
Game 27: 13 red, 9 green, 6 blue; 19 blue, 9 red, 4 green; 14 red, 4 green, 11 blue; 5 green, 12 blue, 7 red
Game 28: 9 green, 4 blue, 15 red; 18 blue, 14 red, 12 green; 14 red, 12 blue, 3 green; 6 blue, 7 green, 15 red; 17 blue, 6 green, 9 red; 7 red, 12 green
Game 29: 17 red, 2 blue, 9 green; 5 blue, 15 red, 11 green; 13 red, 3 green, 5 blue; 4 green, 11 red, 1 blue; 5 green, 1 blue
Game 30: 3 green, 12 blue; 15 red, 2 blue, 6 green; 12 red, 11 blue, 10 green; 9 blue, 7 green, 14 red; 1 green, 7 red, 5 blue
Game 31: 6 green, 7 red, 18 blue; 2 green, 3 blue, 10 red; 9 blue, 8 red; 18 blue, 10 green, 4 red; 14 blue, 11 red, 10 green
Game 32: 7 green, 1 red, 5 blue; 5 green, 3 blue; 6 blue, 5 green; 5 red, 11 green, 6 blue
Game 33: 9 blue, 5 red; 2 blue; 6 red, 8 blue; 10 blue, 4 green, 6 red; 2 red, 4 green; 1 red, 6 blue, 2 green
Game 34: 1 red, 6 green; 3 green, 6 red, 2 blue; 2 red, 2 blue, 1 green; 5 green, 1 red, 2 blue
Game 35: 7 red, 2 green, 4 blue; 4 red, 2 green, 3 blue; 14 green, 2 blue, 5 red; 14 green, 2 red, 3 blue; 5 green, 2 red, 1 blue; 2 green, 8 red, 3 blue
Game 36: 7 green, 1 red, 1 blue; 3 blue, 6 green, 9 red; 2 blue, 17 red; 18 red, 2 green
Game 37: 6 red, 14 blue; 3 green, 2 blue; 18 blue, 6 red; 3 red, 18 blue, 3 green
Game 38: 6 blue, 8 red; 9 blue, 1 green, 1 red; 2 green, 10 blue, 1 red
Game 39: 9 red, 2 green; 7 red, 2 blue, 2 green; 2 blue, 1 red, 8 green
Game 40: 15 green, 1 blue, 1 red; 3 blue, 1 red, 6 green; 2 blue, 11 green; 2 blue, 11 green; 3 green, 4 blue, 1 red; 2 blue, 6 green
Game 41: 4 blue, 9 green; 11 green, 1 blue, 7 red; 1 red, 3 blue, 17 green; 17 green, 2 red; 2 blue, 16 green, 8 red; 1 blue, 8 green, 3 red
Game 42: 7 green, 15 blue, 2 red; 1 green, 5 blue, 5 red; 4 green, 6 red; 4 red, 4 blue, 1 green; 1 blue, 4 red
Game 43: 10 green, 6 blue, 8 red; 9 green, 9 red, 4 blue; 6 blue, 3 green, 6 red; 8 blue, 16 green, 7 red
Game 44: 14 red, 14 blue; 11 red, 1 blue; 1 green, 9 red, 15 blue; 1 green, 10 red
Game 45: 10 blue, 5 red; 1 green, 2 red, 11 blue; 2 blue, 10 red, 1 green
Game 46: 10 red, 9 green, 5 blue; 9 green, 2 red, 5 blue; 3 blue, 14 red, 4 green; 2 red, 1 green, 6 blue; 2 red, 9 blue, 4 green; 5 green, 2 blue, 11 red
Game 47: 9 red, 5 green, 1 blue; 3 red, 1 green; 8 red, 2 blue, 10 green; 9 green, 9 red, 2 blue; 13 green, 3 blue, 6 red
Game 48: 15 blue, 3 red, 8 green; 2 blue; 12 green, 7 blue, 1 red
Game 49: 9 blue, 3 red, 2 green; 12 green, 17 blue, 2 red; 3 green, 1 red, 8 blue; 16 blue, 3 green, 3 red
Game 50: 17 blue, 2 red, 14 green; 18 blue, 12 green; 13 blue, 6 red, 8 green; 4 blue, 6 red, 4 green
Game 51: 3 blue, 8 green, 4 red; 5 blue, 5 green, 4 red; 2 red, 8 blue, 2 green; 8 green, 3 blue; 9 green, 5 blue, 1 red
Game 52: 9 red, 5 green, 6 blue; 3 red, 8 green; 2 red, 3 blue, 6 green; 8 red, 4 blue, 2 green
Game 53: 6 green, 13 blue; 4 red, 7 green; 2 green, 7 red; 11 red, 2 blue; 12 blue, 9 green, 8 red
Game 54: 3 red, 3 blue, 3 green; 3 green, 2 red, 1 blue; 13 blue, 3 green; 5 red, 4 green, 13 blue; 4 green, 7 blue, 9 red
Game 55: 15 blue, 3 green, 2 red; 1 red, 8 green; 19 blue, 7 green; 4 green, 19 blue; 9 blue, 7 green, 2 red
Game 56: 1 blue, 9 green, 11 red; 3 blue, 12 green, 2 red; 1 blue, 12 green, 4 red; 16 green, 3 blue, 3 red; 18 red, 9 green
Game 57: 7 blue, 6 red, 3 green; 11 red, 5 blue, 4 green; 9 blue, 1 green, 5 red
Game 58: 17 green, 17 red, 6 blue; 10 red, 13 blue, 1 green; 7 red, 14 green; 6 red, 2 blue, 8 green; 13 red, 13 blue, 4 green
Game 59: 1 green, 4 red, 1 blue; 1 red, 1 green; 1 red; 4 blue; 6 red, 6 blue, 1 green
Game 60: 7 blue, 17 red, 8 green; 12 green, 6 red, 8 blue; 1 red, 9 blue, 12 green
Game 61: 2 green, 15 blue, 2 red; 1 green, 9 blue, 12 red; 12 red, 3 green, 19 blue
Game 62: 17 red, 1 blue; 5 green, 16 blue, 14 red; 3 red, 7 blue; 8 blue, 3 red, 1 green
Game 63: 9 red, 9 blue; 10 blue, 6 red, 9 green; 11 green, 1 blue, 13 red; 6 green, 13 blue, 9 red
Game 64: 16 blue, 2 red; 9 blue; 10 red, 1 blue, 4 green
Game 65: 1 blue, 18 green; 19 green, 1 red; 10 green, 1 blue, 1 red
Game 66: 12 blue, 5 green, 13 red; 3 green, 3 blue; 1 green, 1 blue, 11 red
Game 67: 5 red, 2 green; 7 red, 3 blue; 1 green, 8 red, 6 blue; 2 red, 5 blue; 8 red, 6 blue
Game 68: 8 green, 6 red, 18 blue; 8 green, 6 red, 3 blue; 4 red, 14 blue, 11 green
Game 69: 6 blue, 3 red, 1 green; 4 green, 6 red, 6 blue; 2 green, 13 red; 9 red, 5 blue, 6 green; 2 green, 11 red; 6 green, 2 red, 1 blue
Game 70: 7 blue, 18 green, 12 red; 17 green, 2 red, 8 blue; 17 red, 13 green, 2 blue; 1 red, 2 green, 7 blue
Game 71: 3 blue, 1 red, 15 green; 13 green, 2 red, 8 blue; 7 green, 12 blue; 7 blue, 12 green; 7 blue, 5 green
Game 72: 6 blue, 18 red; 1 blue, 4 green, 3 red; 11 red, 3 green; 6 blue, 5 red, 13 green; 11 green, 16 red, 5 blue; 3 green, 5 blue
Game 73: 18 red, 1 blue, 3 green; 4 blue, 4 red, 4 green; 1 blue, 3 red; 2 red, 1 green
Game 74: 5 red; 12 red, 4 green; 4 green, 5 red; 2 red, 1 blue, 4 green
Game 75: 2 red, 2 blue, 6 green; 2 blue, 6 green; 3 green, 1 red
Game 76: 6 green, 1 blue, 12 red; 2 green, 2 red, 3 blue; 3 green, 10 red, 3 blue; 3 blue, 16 red, 11 green; 15 red, 5 blue, 7 green; 4 green, 4 red, 3 blue
Game 77: 14 green, 4 blue, 11 red; 12 blue, 9 red, 19 green; 10 green, 4 blue
Game 78: 1 blue, 11 red; 1 blue, 14 green, 4 red; 7 green, 3 blue, 5 red
Game 79: 3 red, 13 blue; 14 blue, 5 red, 5 green; 1 green, 7 blue, 2 red; 5 green, 13 blue, 3 red; 7 blue, 5 red, 2 green
Game 80: 2 green, 11 blue; 2 red, 12 blue, 1 green; 11 blue, 11 green; 2 green, 12 blue, 1 red
Game 81: 8 blue, 5 green, 1 red; 1 red, 6 blue, 4 green; 6 green, 10 blue; 2 red, 9 blue, 2 green; 6 blue, 2 green; 6 green, 9 blue, 2 red
Game 82: 13 red, 12 green, 3 blue; 4 blue, 4 red, 1 green; 4 green, 8 red, 2 blue; 7 red, 13 green
Game 83: 2 green, 8 red, 1 blue; 2 blue, 6 red, 8 green; 5 green, 1 blue
Game 84: 6 red, 18 blue, 5 green; 3 green, 15 blue, 2 red; 6 red, 6 blue, 8 green; 1 red, 4 blue, 2 green; 2 blue, 5 green
Game 85: 3 red, 11 green, 2 blue; 3 blue, 6 green; 2 red, 4 green, 4 blue; 1 blue, 3 red, 10 green; 4 blue, 7 green, 4 red
Game 86: 7 green, 16 blue; 4 blue, 1 green, 7 red; 6 red, 15 green, 9 blue; 7 green, 9 red, 2 blue; 14 green, 2 blue
Game 87: 8 red, 3 blue, 8 green; 3 red, 1 blue, 8 green; 6 red, 5 green; 2 red, 6 green, 2 blue; 6 green, 2 red
Game 88: 1 blue, 4 red, 12 green; 4 red, 1 blue, 14 green; 1 blue, 10 green, 4 red; 1 blue, 10 red, 9 green
Game 89: 7 green, 6 red, 10 blue; 4 red, 5 green; 2 green, 13 blue, 2 red
Game 90: 16 blue, 2 green, 10 red; 4 green, 7 red, 14 blue; 4 blue, 11 green, 3 red; 3 red, 10 blue, 3 green
Game 91: 7 green, 7 red, 4 blue; 14 red, 11 blue; 16 red, 8 green, 15 blue
Game 92: 5 blue, 12 red, 3 green; 2 blue, 8 green, 5 red; 5 blue, 10 green; 11 green, 6 red, 4 blue; 5 red, 4 green, 4 blue
Game 93: 4 blue, 3 green, 5 red; 7 red, 17 blue; 8 blue, 7 green; 17 blue, 1 green; 2 red, 6 blue, 2 green; 15 blue, 3 red, 4 green
Game 94: 9 green, 3 red, 2 blue; 3 green, 6 red; 13 green, 4 red, 2 blue; 7 green; 4 green, 7 red; 2 red, 9 green, 2 blue
Game 95: 3 green, 11 red, 5 blue; 6 blue, 8 green; 9 green, 6 blue; 6 red, 1 green
Game 96: 3 blue, 3 green, 10 red; 2 blue, 12 red; 4 red, 3 blue; 2 green, 3 red, 1 blue; 2 green, 6 blue
Game 97: 5 blue, 3 green, 2 red; 2 blue, 3 green, 5 red; 12 red, 3 blue
Game 98: 2 blue, 2 red, 9 green; 4 green, 5 blue, 1 red; 15 green, 3 red, 9 blue
Game 99: 15 red, 7 green, 11 blue; 2 blue, 12 green, 17 red; 6 red, 3 blue, 11 green; 14 red, 13 green, 5 blue
Game 100: 5 green, 17 blue, 5 red; 15 blue; 13 green, 8 red, 3 blue; 16 blue, 15 green, 8 red; 16 green, 2 blue, 3 red`;
function getAnswer(inputs) {
    inputs = inputs.split("\n");
    const games = inputs.map(input => {
        return input.split(":")[1].split(";")
            .map(set => {
                return {
                    red: parseInt(set.match(/([0-9]+?) red/)?.[1] || 0),
                    blue: parseInt(set.match(/([0-9]+?) blue/)?.[1] || 0),
                    green: parseInt(set.match(/([0-9]+?) green/)?.[1] || 0),
                };
            });
    });

    return games.reduce((acc, game) => {
        const mins = { red: 0, green: 0, blue: 0 };
        game.forEach(set => {
            mins.red = Math.max(set.red, mins.red);
            mins.blue = Math.max(set.blue, mins.blue);
            mins.green = Math.max(set.green, mins.green);
        });
        acc += mins.red * mins.blue * mins.green;
        return acc;
    }, 0);
}
getAnswer(inputs);