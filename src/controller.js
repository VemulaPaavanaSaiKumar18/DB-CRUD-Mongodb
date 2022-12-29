const Employees = require("../dbconfig/model/userSchema");
const jwt = require("jsonwebtoken");

const employeeSignIn = async (req, res) => {
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
};
const getAllEmployees = async (req, res) => {
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
};
const getEmployeesById = async (req, res) => {
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
};
const employeeSignUp = async (req, res) => {
  let email = req.body.email;
  try {
    const employee = await Employees.find({ email: email });
    if (employee.length > 0) {
      return res.json({
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
};
const updateEmployeesById = async (req, res) => {
  try {
    const empData = await Employees.findById(req.params.id);
    empData.adhaarNumber = req.body.adhaarNumber;
    empData.address = req.body.address;
    empData.phoneNumber = req.body.phoneNumber;
    empData.phoneNumber = req.body.phoneNumber;
    empData.countryCode = req.body.countryCode;
    let emp = await empData.save();
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
};
const deleteEmployeesById = async (req, res) => {
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
};

module.exports.employeeSignIn = employeeSignIn;
module.exports.getAllEmployees = getAllEmployees;
module.exports.getEmployeesById = getEmployeesById;
module.exports.employeeSignUp = employeeSignUp;
module.exports.updateEmployeesById = updateEmployeesById;
module.exports.deleteEmployeesById = deleteEmployeesById;
