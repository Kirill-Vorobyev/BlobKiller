const Hero = require('./Hero');

exports.run = (io,game) => {
    io.on('connection',(socket) => {
        console.log('New Connection: ',socket.client.conn.remoteAddress, socket.id);
        const player = {
            id: socket.id,
            hero: new Hero()
        };
        game.players.push(player);//add player objects to main list

        io.emit('monster-update',
                game.monster.getHealth(),
                game.monster.getMaxHealth(),
                game.monster.getShape(),
                game.monster.getColor(),
                game.monster.getLevel());

        io.emit('update-player-count',io.engine.clientsCount);

        socket.on('monster-clicked',()=>{
            //console.log(socket.client.conn.remoteAddress,'monster clicked');
            game.monster.takeDamage(1);
            let damageText = -1;
            if(game.monster.getHealth() > 0){
                io.emit('monster-health',
                        game.monster.getHealth(),
                        game.monster.getColor(),
                        damageText);
            }else{
                for(let player of game.players){
                    player.hero.addXp(Math.max(Math.floor(game.monster.getMaxHealth()/10),1));
                    console.log(player.id,player.hero.getLevel(),player.hero.getXp());
                    io.to(player.id).emit('heroData',player.hero.getLevel(),player.hero.getXp(),player.hero.getXpForNextLvl());
                }
                game.respawnMonster();
                io.emit('monster-respawn',
                        game.monster.getHealth(),
                        game.monster.getShape(),
                        game.monster.getColor(),
                        game.monster.getLevel());
            }
        });

        socket.on('disconnect', ()=>{
            const indexOfSocket = game.players.findIndex((el)=>{
                return el.id == socket.id;
            });
            game.players.splice(indexOfSocket,1);
            console.log('Disconnect: ',socket.client.conn.remoteAddress);
            io.emit('update-player-count',io.engine.clientsCount);
        });
    });
}
