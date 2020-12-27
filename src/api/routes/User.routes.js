const { Router } = require("express");

class UserRouter {
  router = Router();
  constructor(UserController) {
    this.controller = UserController;
  }

  execute = () => {
    this.router.get("/", this.controller.getUsers);
    return this.router;
  };
}

module.exports = UserRouter;
