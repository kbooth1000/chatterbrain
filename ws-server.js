const WS = require('ws');

let ws = new WS.Server({
    port: 3001
});
let clientId = 0;

let broadcastMessage = function (message) {
    ws.clients.forEach(server => {
        server.send(message);
    });
};

ws.on('connection', (newClient, req) => {
    // RegExp to get the IP from the format "::<forwarded:><IP>"
    clientId++;
    let newParticipant = newClient;
    newParticipant.clientId = clientId;
    console.log('Hey there! '+newParticipant.clientId+' connnected');
    newClient.on('message', message => {
        console.log('message: ' + message);
        broadcastMessage(message);
    });

    ws.clients.forEach(client => {
        client.send('$$' + newParticipant.clientId);
    });
});