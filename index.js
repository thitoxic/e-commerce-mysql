const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./models");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);


db.sequelize.sync().then((req) => {
    app.listen(4000, () => console.log("listening to port 4000!"));
  });