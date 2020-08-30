module.exports = (app) => {
  const users = require("../controllers/user.controllers");
  let router = require("express").Router();

  router.post("/signup", users.signup);
  router.post("/signin", users.signin);
  router.get("/user/:id", users.findUserByUserId);
  router.put("/edit/:id", users.editUser);
  router.delete("/delete/:id", users.deleteUser);

  app.use("/api/v1/users", router);
};
