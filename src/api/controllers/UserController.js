const Connection = require("../db/Connection");

class UserController {
  constructor() {
    this.connection = new Connection();
  }

  getUsers = async (req, res) => {
    const data = await this.connection.query({
      name: "fetch-user",
      text: "SELECT * FROM users WHERE id = $1",
      values: [1],
    });

    return res.status(200).json({
      error: false,
      payload: data.rows,
    });
  };
}

module.exports = UserController;
