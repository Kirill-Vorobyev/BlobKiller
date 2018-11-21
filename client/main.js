$("document").ready(main());
var socket;

function main(){
    socket = io();
    let game = $('#game');
    let healthBar = makeHealthBarContainer();
    game.append(healthBar);
    let monster = makeMonster();
    game.append(monster);
    monster.on('click',()=>{takeDamage(monster,healthBar);});

    socket.on('monster-health',(health,rgb,dmg)=>{
        changeMonsterHealth(healthBar,health);
        changeMonsterColor(monster,rgb);
        showDamageNumber(monster,dmg);
    });

    socket.on('monster-update',(health,maxHealth,shape,rgb)=>{
        updateMonsterHealth(healthBar,health,maxHealth);
        changeMonsterShape(monster,shape);
        changeMonsterColor(monster,rgb);
    });

    socket.on('monster-respawn',(health,shape,rgb)=>{
        respawnMonster(healthBar,health);
        changeMonsterShape(monster,shape);
        changeMonsterColor(monster,rgb);
    });
}

function makeMonster(){
    let monster = $('<div/>').attr({id:'monster'});
    return monster;
}

function makeHealthBarContainer(){
    let health = 20;
    let healthBarContainer = $('<div/>').attr({id:'healthContainer','health':health,'maxHealth':health}).addClass('noselect').text(health+'/'+health);
    return healthBarContainer;
}

function takeDamage(monster,healthBar){
    socket.emit('monster-clicked');
}

function changeMonsterColor(monster,rgb){
    //console.log(rgb);
    monster.css({'background-color': 'rgb('+rgb+')'});
}

function changeMonsterShape(monster,shape){
    monster.css({'border-radius': shape});
}

function showDamageNumber(monster,dmg){
    let coords = {
        top: monster.outerWidth()/2 + monster.position().top + Math.round(Math.random()*100 - 50) - 30,
        left: monster.outerHeight()/2 + monster.position().left + Math.round(Math.random()*100 - 50) - 15
    };
    let damageContainer = $('<div/>')
        .addClass('damageText noselect')
        .text(dmg)
        .css({
            'left': coords.left,
            'top': coords.top
        })
        .appendTo(monster);

    setTimeout(function(){
        damageContainer.remove();
    },500);
}

function changeMonsterHealth(healthBar,health){
    let maxHealth = healthBar.attr('maxHealth');
    healthBar.attr({'health':health});
    healthBar.text(health+'/'+maxHealth);
    let healthPercentage = health/maxHealth * 100;
    healthBar.css({'background-image': 'linear-gradient(90deg, red '+healthPercentage+'%, #ddd '+healthPercentage+'%)'});
}

function updateMonsterHealth(healthBar,health,maxHealth){
    healthBar.attr({'health':health,'maxHealth':maxHealth});
    healthBar.text(health+'/'+maxHealth);
    let healthPercentage = health/maxHealth * 100;
    healthBar.css({'background-image': 'linear-gradient(90deg, red '+healthPercentage+'%, #ddd '+healthPercentage+'%)'});
}

function respawnMonster(healthBar,health){
    healthBar.attr({'health':health,'maxHealth':health});
    healthBar.text(health+'/'+health);
    let healthPercentage = health/health * 100;
    healthBar.css({'background-image': 'linear-gradient(90deg, red '+healthPercentage+'%, #ddd '+healthPercentage+'%)'});
}