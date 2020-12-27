const { Client } = require("pg");

const config = {
  user: process.env.USER,
  database: process.env.DATABASE,
  port: process.env.PORT,
  host: process.env.HOST,
  password: process.env.PASSWORD,
};

class Connection {
  // client;

  // constructor() {}

  query = async (query) => {
    this.client = new Client(config);
    this.client.connect();
    const data = await this.client
      .query(query)
      .then((res) => res)
      .catch((e) => console.error(e.stack));
    console.log({ config });
    this.client.end();
    return data;
  };
}

module.exports = Connection;
