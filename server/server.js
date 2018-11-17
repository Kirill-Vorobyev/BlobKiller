exports.run = (io,game) => {
    io.on('connection',(socket) => {
        console.log('New Connection: ',socket.client.conn.remoteAddress);

        io.emit('monster-update',
                game.monster.getHealth(),
                game.monster.getMaxHealth(),
                game.monster.getShape(),
                game.monster.getBrightness());

        socket.on('monster-clicked',()=>{
            console.log(socket.client.conn.remoteAddress,'monster clicked');
            game.monster.takeDamage(1);
            if(game.monster.getHealth() > 0){
                io.emit('monster-health',game.monster.getHealth(),game.monster.getBrightness());
            }else{
                game.respawnMonster();
                io.emit('monster-respawn',
                        game.monster.getHealth(),
                        game.monster.getShape(),
                        game.monster.getBrightness());
            }
        });

        socket.on('disconnect', ()=>{
            console.log('Disconnect: ',socket.client.conn.remoteAddress);
        });
    });
}