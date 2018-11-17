module.exports = class Monster {
    constructor(hp){
        this.hp = hp;
        this.maxHp = hp;
        this.borders = '';
        for(let i=1;i<=4;i++){
            this.borders += Math.round(Math.random()*360)+10 + 'px ';
        }
        this.brightness = Math.round(Math.random()*100) + 40;
    }

    takeDamage(dmg){
        this.hp -= dmg;
        this.brightness = Math.round(Math.random()*100) + 40;
    }

    isAlive(){
        return this.hp > 0;
    }

    getHealth(){
        return this.hp;
    }

    getMaxHealth(){
        return this.maxHp;
    }

    getShape(){
        return this.borders;
    }

    getBrightness(){
        return this.brightness;
    }
};