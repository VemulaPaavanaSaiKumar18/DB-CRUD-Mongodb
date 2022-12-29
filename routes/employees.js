var express = require("express");
var router = express.Router();
const controller = require("../src/controller");
const auth = require("../Auth/employeeAuth");
router.get("/", function (req, res, next) {
  res.send("hi employees");
});
router.post("/signIn", controller.employeeSignIn);

router.get("/all", controller.getAllEmployees);

router.get("/:id", controller.getEmployeesById);

router.post("/signUp", controller.employeeSignUp);

router.put("/:id", auth.authorizer, controller.updateEmployeesById);

router.delete("/:id", controller.deleteEmployeesById);

// router.post()
module.exports = router;
