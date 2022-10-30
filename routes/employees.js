var express = require("express");
var router = express.Router();
const Employees = require("../dbconfig/model/userSchema");
router.get("/data", function (req, res, next) {
  res.send("hi employees");
});
router.get("/all", async (req, res) => {
  try {
    const employee = await Employees.find();
    res.json({
      Status: 200,
      Employee: employee,
    });
  } catch (err) {
    res.json({
      Status: 500,
      error: "api error" + err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    res.json({
      Status: 200,
      Employee: employee,
    });
  } catch (err) {
    res.json({
      Status: 500,
      error: "Error" + err,
    });
  }
});

router.post("/", async (req, res) => {
  const employee = new Employees({
    adhaarNumber: req.body.adhaarNumber,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    phoneNumber: req.body.phoneNumber,
    countryCode: req.body.countryCode,
  });
  try {
    const empt = await employee.save();
    res.json({
      Status: 200,
      Empt: empt,
    });
  } catch (err) {
    res.json({
      Status: 500,
      error: "Error" + err,
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
    res.json({
      Status: 200,
      Empt: emp,
    });
  } catch (err) {
    res.json({
      Status: 500,
      error: "Error" + err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employees.findByIdAndRemove(req.params.id);
    res.json({
      Status: 200,
      Employee: "Deleted successfully",
    });
  } catch (err) {
    res.json({
      Status: 500,
      error: "not deleted",
    });
  }
});

// router.post()
module.exports = router;
