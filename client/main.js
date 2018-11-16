$("document").ready(main());

function main(){
    let game = $('#game');
    let healthBar = makeHealthBarContainer();
    game.append(healthBar);
    let monster = makeMonster();
    game.append(monster);
    monster.on('click',()=>{takeDamage(monster,healthBar);});
}

function makeMonster(){
    let monster = $('<div/>').attr({id:'monster'});
    return monster;
}

function makeHealthBarContainer(){
    let health = 20;
    let healthBarContainer = $('<div/>').attr({id:'healthContainer','health':health,'maxHealth':health}).text(health+'/'+health);
    return healthBarContainer;
}

function takeDamage(monster,healthBar){
    changeMonsterColor(monster);
    changeMonsterHealth(healthBar,monster);
}

function changeMonsterColor(monster){
    let randomBrightness = Math.random()*100 + 40;
    monster.css({'background-color': 'rgb('+randomBrightness+',0,'+randomBrightness+')'});
}

function changeMonsterShape(monster){
    let borders = '';
    for(let i=1;i<=4;i++){
        borders += Math.random()*350+10 + 'px ';
    }
    monster.css({'border-radius': borders});
}

function changeMonsterHealth(healthBar,monster){
    let health = healthBar.attr('health');
    let maxHealth = healthBar.attr('maxHealth');
    health-=1;
    if(health==0){
        health = Math.round(Math.random()*33+7);
        maxHealth = health
        healthBar.attr({'health':health, 'maxHealth':maxHealth});
        changeMonsterShape(monster);
    }else{
        healthBar.attr({'health':health});
    }
    healthBar.text(health+'/'+maxHealth);
    let healthPercentage = health/maxHealth * 100;
    healthBar.css({'background-image': 'linear-gradient(90deg, red '+healthPercentage+'%, #ddd '+healthPercentage+'%)'});
}