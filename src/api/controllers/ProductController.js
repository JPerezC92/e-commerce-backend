const { v4: uuidv4 } = require("uuid");

class ProductController {
  constructor(connection) {
    this.connection = connection;
  }

  getProducts = async (req, res) => {
    const data = await this.connection.query({
      name: "fech-products",
      text: "SELECT * FROM products",
    });

    return res.status(200).json({
      error: false,
      payload: data.rows,
    });
  };

  getProductById = async (req, res) => {
    const { id } = req.params;

    const data = await this.connection.query({
      name: "fecth-productById",
      text: "SELECT * FROM products WHERE id = $1",
      values: [id],
    });

    return res.status(200).json({
      error: false,
      payload: data.rows,
    });
  };

  createProduct = async (req, res) => {
    const { description, price } = await req.body;
    const id = uuidv4();
    const data = await this.connection.query({
      name: "create-product",
      text: "INSERT INTO products(id, description, price) VALUES($1, $2, $3)",
      values: [id, description, price],
    });

    return res.status(200).json({
      error: false,
      message: "",
      payload: { id, description, price },
    });
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    const data = await this.connection.query({
      name: "delete-product",
      text: "DELETE FROM products WHERE id = $1",
      values: [id],
    });
    return res.status(200).json({
      error: false,
      message: "product deleted",
      payload: data,
    });
  };

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const keys = Object.keys(body);

    let text = "UPDATE products SET ";
    let values = [];
    let count = 1;

    for (const key in keys) {
      if (Object.hasOwnProperty.call(keys, key)) {
        const element = keys[key];

        if (count === keys.length) {
          text += element;
          text += ` = $${count} `;
        } else {
          text += element;
          text += ` = $${count}, `;
        }

        values.push(body[element]);
        count++;
      }
    }

    text += ` WHERE id = $${count}`;
    values.push(id);

    const data = await this.connection.query({
      name: "update-product",
      text,
      values,
    });

    return res.status(200).json({
      error: false,
      message: "",
      payload: data,
    });
  };

  searchProduct = async (req, res) => {
    const { description } = req.body;

    const data = await this.connection.query({
      name: "search-products",
      text: "SELECT * FROM products WHERE description LIKE $1",
      values: [`${description}%`],
    });

    return res.status(200).json({
      error: false,
      message: "product matching",
      payload: data.rows,
    });
  };
}

module.exports = ProductController;
