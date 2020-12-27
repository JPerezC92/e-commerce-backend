const { Router } = require("express");

class ProductRouter {
  // controller = null;
  router = Router();
  constructor(ProductController) {
    this.controller = ProductController;
  }

  execute = () => {
    this.router.get("/", this.controller.getProducts);
    this.router.get("/:id", this.controller.getProductById);
    this.router.post("/", this.controller.createProduct);
    this.router.delete("/:id", this.controller.deleteProduct);
    this.router.patch("/:id", this.controller.updateProduct);
    this.router.post("/search", this.controller.searchProduct);

    return this.router;
  };
}

module.exports = ProductRouter;
