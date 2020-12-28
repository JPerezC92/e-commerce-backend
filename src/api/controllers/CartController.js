class CartController {
  constructor(connection) {
    this.connection = connection;
  }

  getCart = async (req, res) => {
    const { cartId } = req.params;

    const data = await this.connection.query({
      name: "fetch-cart",
      text:
        "SELECT product_id, description, price, quantity FROM cart_items INNER JOIN products ON products.id = cart_items.product_id WHERE cart_id = $1",
      values: [cartId],
    });

    return res.status(200).json({
      error: false,
      message: "",
      payload: data.rows,
    });
  };

  addProduct = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    console.log({ cartId });
    await this.connection.query({
      name: "add-product",
      text:
        "INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1, $2, $3)",
      values: [cartId, productId, quantity],
    });

    return res.status(200).json({
      error: false,
      message: "product added",
    });
  };

  deleteProduct = async (req, res) => {
    const { cartId } = req.params;
    const { productId } = req.body;

    await this.connection.query({
      name: "delete-cart-item",
      text: "DELETE FROM cart_items WHERE cart_id = $1 && product_id = $2",
      values: [cartId, productId],
    });

    return res.status(200).json({
      error: false,
      message: "product deleted",
    });
  };
}

module.exports = CartController;
