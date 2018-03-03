class Player {
    constructor(nickname) {
        this.nickname = nickname;
        this.scores = [];
    }

    addScore(score) {
        if(!isNaN(score) && score !== null){
            this.scores.push(score);
            this.scores.sort((a,b) => b - a);
        }
        return this;
    }

    get scoreCount() {
        return this.scores.length;
    }

    get highestScore() {
        return this.scores[0];
    }

    get topFiveScore() {
        return this.scores.slice(0, 5);
    }

    toString() {
        return `${this.nickname}: [${this.scores}]`;
    }
}

let p = new Player('Trotro');
p.addScore('123');
console.log(p.scoreCount);

