const Connection = require("../db/Connection");
const { Router } = require("express");
const UserRouter = require("./User.routes");
const UserController = require("../controllers/UserController");
const ProductRouter = require("./Product.routes");
const ProductController = require("../controllers/ProductController");
const CartRouter = require("./Cart.routes");
const CartController = require("../controllers/CartController");

module.exports = class MainRouter {
  router = Router();
  apiRouter = Router();
  connection = new Connection();
  constructor() {
    this.router.use("/api", this.apiRouter);
    this.userRouter = new UserRouter(new UserController(this.connection));
    this.productRouter = new ProductRouter(
      new ProductController(this.connection)
    );
    this.cartRouter = new CartRouter(new CartController(this.connection));
  }

  execute = () => {
    this.apiRouter.use("/users", this.userRouter.execute());
    this.apiRouter.use("/products", this.productRouter.execute());
    this.apiRouter.use("/carts", this.cartRouter.execute());

    return this.router;
  };
};
