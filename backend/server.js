const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

const server = https.createServer({
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('🔗 Neue Verbindung');

  ws.on('message', function incoming(message) {
    console.log('📨 Nachricht empfangen:', message.toString());

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 CertoChat WebSocket-Server läuft auf Port ${PORT}`);
});

