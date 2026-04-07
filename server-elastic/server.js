const { WebSocketServer } = require('ws');
const PORT = process.env.PORT || 8080; 

const wss = new WebSocketServer({
  port: PORT,
  maxPayload: 50 * 1024 * 1024,
});

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message.toString());
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => console.log('Cliente desconectado'));
});

console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);