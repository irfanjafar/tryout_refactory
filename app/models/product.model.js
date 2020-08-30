module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });
  return Product;
};
