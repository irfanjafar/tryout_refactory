module.exports = (app) => {
  const product_in = require("../controllers/product_in.controllers");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  router.post("/", product_in.create);
  router.get("/find/:id", product_in.findProductById);
  router.put("/edit/:id", product_in.editProduct);
  router.delete("/delete/:id", product_in.deleteProduct);

  app.use("/api/v1/product_in", auth.isAuth, router);
};
