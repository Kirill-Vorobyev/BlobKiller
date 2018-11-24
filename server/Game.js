const Monster = require('./Monster');

module.exports = class Game {

    constructor(){
        this.startingLevel = 1;
        this.monster = new Monster(this.startingLevel);
    }

    respawnMonster(){
        this.monster = new Monster(this.monster.getLevel()+1);
    }
};