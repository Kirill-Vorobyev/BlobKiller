module.exports = class Monster {
    constructor(hp){
        this.hp = hp;
        this.maxHp = hp;
        this.borders = '';
        this.rgb = '';
        for(let i=1;i<=4;i++){
            this.borders += Math.round(Math.random()*360)+10 + 'px ';
        }
        this.setColor();
    }

    takeDamage(dmg){
        this.hp -= dmg;
        this.setBrightness();
    }

    setColor(){
        this.rgb = '';
        this.numRGB = Math.round(Math.random()*1 + 1);
        if(this.numRGB==1){
            this.rgbPos1 = Math.round(Math.random()*2 + 1);
            this.rgbPos2 = null;
        }else{
            this.rgbPos1 = Math.round(Math.random()*2 + 1);
            this.rgbPos2 = this.rgbPos1;
            while(this.rgbPos2==this.rgbPos1){
                this.rgbPos2 = Math.round(Math.random()*2 + 1);
            }
        }
        this.setBrightness();
    }

    setBrightness(){
        this.brightness = Math.round(Math.random()*100) + 40;
        this.rgb = '';
        for(let i=1;i<=3;i++){
            if(this.rgbPos1==i){
                this.rgb+=(this.brightness+',');
            }
            else if(this.rgbPos2 != null && this.rgbPos2 == i){
                this.rgb+=(this.brightness+',');
            }else{
                this.rgb+='0,'
            }
        }
        this.rgb=this.rgb.slice(0,-1);
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

    getColor(){
        return this.rgb;
    }
};