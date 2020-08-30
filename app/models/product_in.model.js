module.exports = (sequelize, Sequelize) => {
  const Product_in = sequelize.define("product_in", {
    date: {
      type: Sequelize.DATE,
    },
    total: {
      type: Sequelize.INTEGER,
    },
  });
  return Product_in;
};
