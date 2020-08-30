module.exports = (app) => {
  const products = require("../controllers/product.controllers");
  const auth = require("../middleware/auth");
  let router = require("express").Router();

  router.post("/", products.create);
  router.get("/find/:id", products.findProductById);
  router.put("/edit/:id", products.editProduct);
  router.delete("/delete/:id", products.deleteProduct);

  // router.put("/image-photo/:id/:title", products.uploadImagePost);

  app.use("/api/v1/product", auth.isAuth, router);
};
