const db = require("../models/index");
const jwt = require("jsonwebtoken");
const slack = require("../slack/it.slack");
const Product = db.products;
const Op = db.Sequelize.Op;
const User = db.user;
require("dotenv").config();

//post
exports.create = (req, res) => {
  var user = jwt.verify(req.headers.token, process.env.SECRET_JWT);
  console.log("user " + user.id);
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }
  //Create post
  const product = {
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    userId: req.body.userId,
  };
  Product.create(product)
    .then((data) => {
      res.send({
        status: "Success",
        message: "Data Berhasil Ditambahkan",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the Post",
      });
    });
  slack.sendMessage(
    "admin",
    "project",
    product.title + "| Description : " + product.description
  );
};

//Edit Product
exports.editProduct = (req, res) => {
  const id = req.params.id;
  try {
    Product.update(
      {
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        userId: req.body.userId,
      },
      {
        where: { id: id },
      }
    )
      .then((result) => {
        if (result) {
          //send response
          res.send({
            status: "Success",
            message: "Data Berhasil Diubah",
            data: {
              name: req.body.name,
              stock: req.body.stock,
              price: req.body.price,
              userId: req.body.userId,
            },
          });
        } else {
          res.send({
            status: "Failed",
            message: `User can't be update`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `User can't be update`,
        });
      });
  } catch (err) {
    res.status(500).send({ error: err, message: "error" });
  }
};

//Delete Product
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: {
      id: id,
    },
  }).then((result) => {
    if (result) {
      //send response
      res.send({
        status: "Success",
        message: "Data Berhasil Dihapus",
        data: {
          id: id,
        },
      });
    } else {
      res.send({
        status: "Failed",
        message: `Failed delete user`,
      });
    }
  });
};

// find product by id
exports.findProductById = function (req, res) {
  console.log(req.params.id);
  Product.findByPk(req.params.id, {
    attributes: ["name", "stock", "price"],
    include: [
      {
        model: User,
        attributes: ["id", "fullname", "username", "email", "phone_number"],
      },
    ],
  })
    .then((data) => {
      res.send({
        status: "success",
        message: "Succes get product data",
        data,
      });
    })
    .catch((err) => {
      console.log(">> Error while finding product: ", err);
    });
};
