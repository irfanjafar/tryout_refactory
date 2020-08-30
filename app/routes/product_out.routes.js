module.exports = (app) => {
  const product_out = require("../controllers/product_out.controllers");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  router.post("/", product_out.create);
  router.get("/find/:id", product_out.findProductById);
  router.put("/edit/:id", product_out.editProduct);
  router.delete("/delete/:id", product_out.deleteProduct);

  app.use("/api/v1/product_out", auth.isAuth, router);
};
