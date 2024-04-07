const Route = require("express").Router();
const userController = require("../controllers/userController.js");
const expController = require("../controllers/expController.js");
const adminController = require("../controllers/adminController.js");
require("../middleware/authMiddleware.js");
const contactController = require("../controllers/contactController.js");

Route.get("/", userController.Func);
Route.post("/signup", userController.signup);
Route.post("/login", userController.login);
Route.post("/experience", expController.expData);
Route.get("/get-experience", expController.getExp);
Route.post("/adminlogin", userController.adminlogin);
Route.get("/get-experience-question", expController.getQues);
Route.get("/admin-users", adminController.getUsers);
Route.put("/admin-update-approved", adminController.updateApproved);
Route.put("/admin-update-allfield", adminController.updateField);
Route.post("/contact", contactController.storeContact);

module.exports = Route;
