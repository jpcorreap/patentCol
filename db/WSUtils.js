const WebSocket = require("ws");

function WSUtils() {
  const wsu={};
  let clients =[];

  wsu.setupWS= (server) =>{

    console.log("setting up Web Socket");
    
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
      console.log("New connection");

      clients.push(ws);
    });
  };

  wsu.notifyAll=(data) => {
    console.log("Notify All", clients.length);
    clients.forEach((ws) => ws.send(data));
  };
  return wsu;
}

module.exports= WSUtils();