exports.run = (io,game) => {
    io.on('connection',(socket) => {
        console.log('New Connection: ',socket.client.conn.remoteAddress);

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
                game.respawnMonster();
                io.emit('monster-respawn',
                        game.monster.getHealth(),
                        game.monster.getShape(),
                        game.monster.getColor(),
                        game.monster.getLevel());
            }
        });

        socket.on('disconnect', ()=>{
            console.log('Disconnect: ',socket.client.conn.remoteAddress);
            io.emit('update-player-count',io.engine.clientsCount);
        });
    });
}
