const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 10000 });

let clients = new Set();

server.on("connection", (socket) => {
  clients.add(socket);
  socket.send("🟢 Welcome to the chatroom!");

  socket.on("message", (msg) => {
    for (let client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  socket.on("close", () => clients.delete(socket));
});
