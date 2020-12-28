const { v4: uuidv4 } = require("uuid");

class UserController {
  constructor(connection) {
    this.connection = connection;
  }

  getUsers = async (req, res) => {
    const data = await this.connection.query({
      name: "fetch-user",
      text: "SELECT * FROM users",
    });

    return res.status(200).json({
      error: false,
      payload: data.rows,
    });
  };

  createUser = async (req, res) => {
    const id = uuidv4();
    const cartId = uuidv4();

    const { name, lastname, email, password } = req.body;

    const data = await this.connection.query({
      name: "create-user",
      text:
        "INSERT INTO users(id, name, lastname, email, password, cart_id) VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, name, lastname, email, password, cartId],
    });

    await this.connection.query({
      name: "create-cart",
      text: "INSERT INTO carts(id, user_id) VALUES($1, $2)",
      values: [cartId, id],
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

    // if (data.includes("error")) {
    //   error = true;
    //   message = data.split("»")[0];
    // }

    return res.status(200).json({
      error,
      message,
      payload: data,
    });
  };
}

module.exports = UserController;
