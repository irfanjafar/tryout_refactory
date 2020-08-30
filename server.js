const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cron = require("node-cron");
//const nodemailer = require("nodemailer");

//models
const db = require("./app/models/index");

const app = express();
//create log
app.use(morgan("combined"));

//parse request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//sync
db.sequelize.sync();

//enable files upload
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 1024 * 1024,
    },
    abortOnLimit: true,
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route
require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product_out.routes")(app);
require("./app/routes/product_in.routes")(app);

//schedule task
// var task = cron.schedule("* * * * * ", function () {
//   console.log("ini jalan setiap menit");
// });
// task.start;
//start app
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
