const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.Host,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.min,
    idle: dbConfig.pool.min,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//create table
db.products = require("./product.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.product_out = require("./product_out.model")(sequelize, Sequelize);
db.product_in = require("./product_in.model")(sequelize, Sequelize);

//relation user - order
db.products.hasMany(db.product_out);
db.product_out.belongsTo(db.products);
db.products.hasMany(db.product_in);
db.product_in.belongsTo(db.products);
db.user.hasMany(db.products);
db.products.belongsTo(db.user);
module.exports = db;
