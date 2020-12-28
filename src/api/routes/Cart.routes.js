const { Router } = require("express");

class CartRouter {
  router = new Router();

  constructor(controller) {
    this.controller = controller;
  }

  execute = () => {
    this.router.get("/:cartId", this.controller.getCart);
    this.router.post("/:cartId", this.controller.addProduct);
    this.router.delete("/:cartId", this.controller.deleteProduct);
    return this.router;
  };
}

module.exports = CartRouter;
