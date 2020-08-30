var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const db = require("../models/index");
const User = db.user;

//post
exports.signup = function (req, res) {
  //Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }
  //Create user
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  const user = {
    fullname: req.body.full_name,
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: hash,
    role: req.body.role,
  };
  User.create(user)
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
};

//Edit User
exports.editUser = (req, res) => {
  const id = req.params.id;
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    User.update(
      {
        fullname: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hash,
        role: req.body.role,
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
              fullname: req.body.full_name,
              username: req.body.username,
              email: req.body.email,
              phone_number: req.body.phone_number,
              role: req.body.role,
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

//Delete User
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
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

//login
exports.signin = function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  User.findOne({ where: { email: email } })
    .then((data) => {
      var hasil = bcrypt.compareSync(pass, data.password);
      console.log(hasil);

      if (hasil == true) {
        var secret = "TEXT SECRET LETAK KAN DI ENV";
        var now = Math.floor(Date.now() / 1000);
        var iat = now - 10;
        var expiresIn = "30 Days";
        //expr = (now + expiresIn),
        //notBefore = (now - 10),
        // var jwtId = Math
        //     .random()
        //     .toString(36)
        //     .substring(7);
        // var payload = {
        //     iat: iat,
        //     jwtid: jwtId,
        //     audience: 'TEST',
        //     data: data
        // };

        jwt.sign(
          { id: data.id },
          secret,
          { algorithm: "HS256", expiresIn: expiresIn },
          // jwt.sign(payload,secret,{
          //     algorithm:'HS256',
          //     expiresIn: expiresIn
          // },
          function (err, token) {
            if (err) {
              res.json({
                results: {
                  status: false,
                  msg: "Error occured while",
                },
              });
            } else {
              if (token != false) {
                res.header();
                res.json({
                  results: {
                    status: true,
                    token: token,
                    user: {
                      id: data.id,
                    },
                  },
                });
                res.end();
              } else {
                res.json({
                  results: {
                    status: false,
                    msg: "could not create",
                  },
                });
                res.end();
              }
            }
          }
        );
      } else {
        res.send({
          message: "email atau pass salah",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        err: err.message,
        message: "Error retrieving post with id = ",
      });
    });
};

exports.findUserByUserId = function (req, res) {
  console.log(req.params.id);
  User.findByPk(req.params.id, {
    attributes: ["id", "fullname", "username"],
  })
    .then((data) => {
      res.send({
        status: "success",
        message: "Succes get user data",
        data,
      });
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
    });
};
