const { Router } = require("express");
const UserRouter = require("./User.routes");
const ProductRouter = require("./Product.routes");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");

module.exports = class MainRouter {
  router = Router();
  apiRouter = Router();

  constructor() {
    this.router.use("/api", this.apiRouter);
    this.userRouter = new UserRouter(new UserController());
    this.productRouter = new ProductRouter(new ProductController());
  }

  execute = () => {
    this.apiRouter.use("/users", this.userRouter.execute());
    this.apiRouter.use("/products", this.productRouter.execute());

    // this.apiRouter.use("products", this.productRouter);

    return this.router;
  };
};
