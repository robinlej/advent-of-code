const RPS = {
    rock: { win: "paper", lose: "scissors" },
    paper: { win: "scissors", lose: "rock" },
    scissors: { win: "rock", lose: "paper" },
};

function parseData(data) {
    return data
        .replace(/A/g, "rock")
        .replace(/B/g, "paper")
        .replace(/C/g, "scissors")
        .split("\n")
        .map((round) => {
            round = round.split(" ");
            switch (round[1]) {
                case "X":
                    round[1] = RPS[round[0]].lose;
                    break;
                case "Y":
                    round[1] = round[0];
                    break;
                case "Z":
                    round[1] = RPS[round[0]].win;
                    break;
            }
            return round;
        });
}

function getScore(data) {
    const input = parseData(data);
    let score = 0;

    input.forEach((round) => {
        switch (round[1]) {
            case "rock":
                score += 1;
                break;
            case "paper":
                score += 2;
                break;
            case "scissors":
                score += 3;
                break;
        }

        if (round[0] === round[1]) score += 3;
        if (round[1] === RPS[round[0]].win) score += 6;
    });

    return score;
}

console.log(getScore(data));
