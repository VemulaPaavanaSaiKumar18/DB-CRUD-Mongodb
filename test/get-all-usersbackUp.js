const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const rewire = require("rewire");
const operations = rewire("../src/controller.js");

const employeeDetails = {
  email: "kumar18@gmail.com",
  password: "sai@123",
  adhaarNumber: 22553355778888,
  address: "uthk",
  phoneNumber: 555666115656,
  countryCode: 19,
};

let saveStub = sinon.stub().returns({});
let employee = sinon.stub().returns({ save: saveStub });

operations.__set__("Employee", employee);

describe("testing crud operations with full mocking ", function () {
  it("it should create one user", (done) => {
    let request = sinon.spy();
    let response = sinon.spy();
    response = {
      json: sinon.spy(),
      send: sinon.spy(),
    };
    request = {
      body: employeeDetails,
    };
    operations.employeeSignUp(request, response).then((employeeDetails) => {
      expect(request.body.email, employeeDetails.email);
      expect(request.body.password, employeeDetails.password);
      expect(request.body.adhaarNumber, employeeDetails.adhaarNumber);
      expect(request.body.address, employeeDetails.address);
      expect(request.body.phoneNumber, employeeDetails.phoneNumber);
      expect(request.body.countryCode, employeeDetails.countryCode);
      global.testId = userDetails._id;
      done();
    });
  });
});
