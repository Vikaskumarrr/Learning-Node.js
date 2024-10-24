
const express = require("express");

const app = express();

const server = require('http').Server(app);

const all = require('socket.io')(server);

app.use(express.static('public'));

all.on('connection', (conection)=>{ 
    console.log('User connected', conection.id);

    conection.on('messageSent',(data)=>{ 
        all.emit('messageSent', data);
    });

    conection.on("joined", (username)=>{ 
        all.emit("joined", username)
    })
});


const PORT = 3000;
server.listen(PORT, ()=>{ 
    console.log(`Server is running on post http://127.0.01: ${PORT}`)
});

