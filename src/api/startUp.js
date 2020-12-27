const Server = require("./Server");

module.exports = function startUp() {
  const server = new Server();
  server.start();
};
