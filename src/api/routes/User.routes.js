const { Router } = require("express");

class UserRouter {
  router = Router();
  constructor(UserController) {
    this.controller = UserController;
  }

  execute = () => {
    this.router.get("/", this.controller.getUsers);
    this.router.post("/", this.controller.createUser);
    this.router.delete("/:id", this.controller.deleteUser);
    return this.router;
  };
}

module.exports = UserRouter;
