const Monster = require('./Monster');

module.exports = class Game {

    constructor(){
        this.monster = new Monster(5);
        this.additionalHealthMax = 5;
    }

    respawnMonster(){
        this.additionalHealthMax += 1;
        let health = Math.round(Math.random() * 10) + Math.round(Math.random() * this.additionalHealthMax) + 5;
        this.monster = new Monster(health);
    }
};