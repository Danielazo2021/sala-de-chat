var express= require('express');
var app= express();
var server= require('http').Server(app);
var io= require('socket.io')(server);
var cors = require('cors');

app.use(cors());

/*
app.get("/home",(req, res)=>{
    res.json({
        nombre:"daniel",
        apellido: "Grecco"
    });
})*/

app.use(express.static('client'));


app.get('/hola-mundo',function(req, res){
    res.status(200).send('hola mundo desde una ruta');
} );

var messages= [{
    id : 1,
    text:'Bienvenido al chat privado de Socket.io y NodeJS de Daniel Grecco',
    nickname: 'Bot..Danielazo'

}];


io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address + " se ha conectado..." );

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);   

    io.sockets.emit('messages', messages);
    });

});


server.listen(8080, function(){
    console.log('el servidor esta funcionando en  http://localhost:8080');
});







