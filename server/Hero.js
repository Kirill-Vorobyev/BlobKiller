module.exports = class Hero {
    constructor(){
        this.level = 1;
        this.xp = 0;
        this.xpForNextLevel = 5;
    }

    getLevel(){
        return this.level;
    }
    getXp(){
        return this.xp;
    }
    getXpForNextLvl(){
        return this.xpForNextLevel;
    }
    addXp(xpToAdd){
        this.xp += xpToAdd;
        while(this.xp >= this.xpForNextLevel){
            this.xp = this.xp % this.xpForNextLevel;
            this.level++;
            this.xpForNextLevel = Math.floor(this.xpForNextLevel * 1.2);
        }
    }
}