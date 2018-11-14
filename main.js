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
    let healthBarContainer = $('<div/>').attr({id:'healthContainer','health':20,'maxHealth':20});
    return healthBarContainer;
}

function takeDamage(monster,healthBar){
    changeMonsterColor(monster);
    changeMonsterHealth(healthBar);
}

function changeMonsterColor(monster){
    let randomBrightness = Math.random()*100 + 40;
    monster.css({'background-color': 'rgb('+randomBrightness+',0,'+randomBrightness+')'});
}

function changeMonsterHealth(healthBar){
    let health = healthBar.attr('health');
    let maxHealth = healthBar.attr('maxHealth');
    health-=1;
    if(health==0){
        health = 20;
    }
    healthBar.attr({'health':health});
    let healthPercentage = health/maxHealth * 100;
    healthBar.css({'background-image': 'linear-gradient(90deg, red '+healthPercentage+'%, #ddd '+healthPercentage+'%)'});
}