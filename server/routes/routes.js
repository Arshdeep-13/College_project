const Route = require("express").Router();
const userController = require("../controllers/userController.js");
const expController = require("../controllers/expController.js");

Route.get("/", userController.Func);
Route.post("/signup", userController.signup);
Route.post("/login", userController.login);
Route.post("/experience", expController.expData);

module.exports = Route;
