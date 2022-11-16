var express = require("express");
var router = express.Router();
const Employees = require("../dbconfig/model/userSchema");
const auth = require("../Auth/employeeAuth");
const jwt = require("jsonwebtoken");
router.get("/", function (req, res, next) {
  res.send("hi employees");
});
router.post("/sigIn", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const employee = await Employees.find({ email: email });
    if (employee.length > 0) {
      let userDetails = employee[0];
      if (userDetails.password == password) {
        let jwtToken = jwt.sign({ email: email }, "sampleSecret");
        return res.json({
          Status: 200,
          message: "login successfully",
          token: jwtToken,
        });
      } else {
        return res.status(404).send("please signUp");
      }
    } else {
      return res.status(404).send("please signUp");
    }
  } catch (err) {
    return res.json({
      Status: 500,
      error: "server error" + err,
    });
  }
});
router.get("/all", auth.authorizer, async (req, res) => {
  try {
    const employee = await Employees.find();
    return res.json({
      Status: 200,
      Employee: employee,
    });
  } catch (err) {
    return res.json({
      Status: 500,
      error: "server error" + err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    return res.json({
      Status: 200,
      Employee: employee,
    });
  } catch (err) {
    return res.json({
      Status: 404,
      error: "Not found",
    });
  }
});

router.post("/signUp", async (req, res) => {
  let email = req.body.email;
  try {
    const employee = await Employees.find({ email: email });
    if (employee.length > 0) {
      return res.json({
        Status: 200,
        msg: "user already exist please singIn",
      });
    } else {
      const employee = new Employees({
        email: req.body.email,
        password: req.body.password,
        adhaarNumber: req.body.adhaarNumber,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        phoneNumber: req.body.phoneNumber,
        countryCode: req.body.countryCode,
      });
      const empt = await employee.save();
      return res.json({
        Status: 200,
        Empt: empt,
      });
    }
  } catch (err) {
    return res.json({
      Status: 500,
      error: "server error" + err,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const empdata = await Employees.findById(req.params.id);
    empdata.adhaarNumber = req.body.adhaarNumber;
    empdata.address = req.body.address;
    empdata.phoneNumber = req.body.phoneNumber;
    empdata.phoneNumber = req.body.phoneNumber;
    empdata.countryCode = req.body.countryCode;
    let emp = await empdata.save();
    return res.json({
      Status: 200,
      Empt: emp,
    });
  } catch (err) {
    return res.json({
      Status: 500,
      error: "server error" + err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    Employees.findByIdAndRemove(req.params.id);
    return res.json({
      Status: 200,
      Employee: "Deleted successfully",
    });
  } catch (err) {
    return res.json({
      Status: 404,
      error: "error" + err,
      state: "not found",
    });
  }
});

// router.post()
module.exports = router;
