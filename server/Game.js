const Monster = require('./Monster');

module.exports = class Game {

    constructor(){
        this.monster = new Monster(25);
        this.additionalHealthMax = 5;
    }

    respawnMonster(){
        this.additionalHealthMax += 2
        let health = Math.round(Math.random() * 20) + Math.round(Math.random() * this.additionalHealthMax) + 5;
        this.monster = new Monster(health);
    }
};