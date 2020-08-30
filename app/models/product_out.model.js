module.exports = (sequelize, Sequelize) => {
  const Product_out = sequelize.define("product_out", {
    date: {
      type: Sequelize.DATE,
    },
    total: {
      type: Sequelize.INTEGER,
    },
  });
  return Product_out;
};
