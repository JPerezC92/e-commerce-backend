const express = require("express");
const MainRouter = require("./routes/Router");
const morgan = require("morgan");

class Server {
  APP = express();
  constructor() {
    this.APP.use(express.json());
    this.APP.use(express.urlencoded({ extended: true }));
    this.APP.use(new MainRouter().execute());
  }

  start = () => {
    this.APP.use(morgan("dev"));

    const port = process.env.DEV_PORT || 5000;
    this.APP.listen(port, () =>
      console.log(`Server running on port ${port} 🔥`)
    );
  };
}

module.exports = Server;
