let mongooes = require("mongoose");
let schema = mongooes.Schema;

const Employees = new schema({
  adhaarNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  marageStatus: {
    type: Boolean,
  },
  countryCode: {
    type: Number,
  },
});

module.exports = mongooes.model("Employees", Employees);
