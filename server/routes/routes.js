const Route = require("express").Router();
const userController = require("../controllers/userController.js");
const expController = require("../controllers/expController.js");
const middleware = require("../middleware/authMiddleware.js");

Route.get("/", userController.Func);
Route.post("/signup", userController.signup);
Route.post("/login", userController.login);
Route.post("/experience", middleware, expController.expData);
Route.get("/get-experience", expController.getExp);

module.exports = Route;
