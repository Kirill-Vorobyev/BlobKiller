$("document").ready(main());
var socket;

function main(){
    socket = io();
    let game = $('#game');
    let monsterLevelContainer = makeMonsterLevelContainer();
    game.append(monsterLevelContainer);
    let healthBar = makeHealthBarContainer();
    game.append(healthBar);
    let monster = makeMonster();
    game.append(monster);
    let playerCountContainer = makePlayerCountContainer();
    game.append(playerCountContainer);
    let heroLevelContainer = makeHeroLevelContainer();
    game.append(heroLevelContainer);
    let xpBarContainer = makeXpBarContainer();
    game.append(xpBarContainer);
    
    
    monster.on('touchstart mousedown',(e)=>{takeDamage(e);});

    socket.on('monster-health',(health,rgb,dmg)=>{
        changeMonsterHealth(healthBar,health);
        changeMonsterColor(monster,rgb);
        showDamageNumber(monster,dmg);
    });

    socket.on('monster-update',(health,maxHealth,shape,rgb,level)=>{
        updateMonsterHealth(healthBar,health,maxHealth);
        changeMonsterShape(monster,shape);
        changeMonsterColor(monster,rgb);
        changeMonsterLevel(monsterLevelContainer,level);
    });

    socket.on('monster-respawn',(health,shape,rgb,level)=>{
        respawnMonster(healthBar,health);
        changeMonsterShape(monster,shape);
        changeMonsterColor(monster,rgb);
        changeMonsterLevel(monsterLevelContainer,level);
    });

    socket.on('update-player-count',(numPlayers)=>{
        updatePlayerCount(playerCountContainer,numPlayers);
    });

    socket.on('heroData',(level,xp,xpForNextLevel)=>{
        updateHeroLevel(heroLevelContainer,level);
        updateHeroXp(xpBarContainer,xp,xpForNextLevel);
        console.log('level: '+level+' xp: '+xp+' forNextLevel: '+xpForNextLevel);
    })
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

function makeMonsterLevelContainer(){
    let level = $('<div/>').attr({id:'monsterLevel','level':0}).addClass('monsterLevel').text('Level: 0');
    return level;
}

function makePlayerCountContainer(){
    let playerCountContainer = $('<div/>').attr({id:'playerCount'}).addClass('playerCount').text('Players: 0');
    return playerCountContainer;
}

function makeHeroLevelContainer(){
    let level = $('<div/>').attr({id:'heroLevel','level':0}).addClass('heroLevel').text('Your Level: 1');
    return level;
}

function makeXpBarContainer(){
    let xp = 0;
    let xpBarContainer = $('<div/>').attr({id:'xpContainer','xp':xp,'maxXp':1}).addClass('noselect').text(xp+'/'+1);
    return xpBarContainer;
}

function takeDamage(e){
    socket.emit('monster-clicked');
    e.stopPropagation();
    e.preventDefault();
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

function changeMonsterLevel(levelContainer, newLevel){
    levelContainer.text('Monster Level: '+newLevel);
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

function updatePlayerCount(playerCountContainer,numPlayers){
    playerCountContainer.text('Players: '+numPlayers);
}

function updateHeroLevel(heroLevelContainer,newLevel){
    heroLevelContainer.text('Your Level: '+newLevel);
}

function updateHeroXp(xpBarContainer,xp,xpForNextLevel){
    xpBarContainer.attr({'xp':xp,'maxXp':xpForNextLevel});
    xpBarContainer.text(xp+'/'+xpForNextLevel);
    let percentage = xp/xpForNextLevel * 100;
    xpBarContainer.css({'background-image': 'linear-gradient(90deg, rgb(112, 0, 156) '+percentage+'%, #ddd '+percentage+'%)'});
}