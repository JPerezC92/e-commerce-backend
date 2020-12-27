const Connection = require("../db/Connection");
const { v4: uuidv4 } = require("uuid");

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

  createUser = async (req, res) => {
    const id = uuidv4();
    const { name, lastname, email, password } = req.body;

    const data = await this.connection.query({
      name: "create.user",
      text:
        "INSERT INTO users(id, name, lastname, email, password) VALUES($1, $2, $3, $4, $5)",
      values: [id, name, lastname, email, password],
    });

    return res.status(200).json({
      error: false,
      message: "",
      payload: data,
    });
  };

  deleteUser = async (req, res) => {
    let error = false;
    let message = "user deleted";
    const { id } = req.params;

    let data = await this.connection.query({
      name: "delete-user",
      text: "DELETE FROM users WHERE id = $1",
      values: [id],
    });

    if (data.includes("error")) {
      error = true;
      message = data.split("»")[0];
    }

    return res.status(200).json({
      error,
      message,
      payload: data,
    });
  };
}

module.exports = UserController;
