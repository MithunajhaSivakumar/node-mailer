const express = require("express");
const Router = express.Router();
const { email_post, email_get } = require("../controller/mailController");

Router.post("/", email_post);
Router.get("/", email_get);

module.exports = Router;
