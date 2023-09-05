const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({
  path: "backend/config/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");



app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);



// Khalti
app.post("/api", (req, res) => {
  const bodys = req.body;
  console.log(bodys);

  let data = {
    token: bodys.token,
    amount: bodys.amount,
  };

  let config = {
    headers: {
      Authorization: "Key test_secret_key_cb7aa7e0b8b94dbf92bbdfad4e40e897",
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
      console.log("sucessful transaction");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ---- KHALTI END ---- //

    

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
