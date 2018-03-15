const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname + "/../public")));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  
  res.render("index");
})

module.exports = app;