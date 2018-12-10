const Monster = require('./Monster');
const Hero = require('./Hero');

module.exports = class Game {

    constructor(){
        this.startingLevel = 1;
        this.monster = new Monster(this.startingLevel);
        this.players = [];
    }

    respawnMonster(){
        this.monster = new Monster(this.monster.getLevel()+1);
    }
};