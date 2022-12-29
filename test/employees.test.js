const supertest = require("supertest");
const config = require("./config");
const app = require("../app");

describe("POST /employees/signUp", () => {
  it("create a new user ", async () => {
    const response = await supertest(app)
      .post("/employees/signUp")
      .send(config.postEmployees);
    expect(response.status).toEqual(200);
    expect(response.body.Empt.email).toEqual(config.postEmployees.email);
    expect(response.body.Empt.password).toEqual(config.postEmployees.password);
    expect(response.body.Empt.adhaarNumber).toEqual(
      config.postEmployees.adhaarNumber
    );
    expect(response.body.Empt.countryCode).toEqual(
      config.postEmployees.countryCode
    );
    expect(response.body.Empt.phoneNumber).toEqual(
      config.postEmployees.phoneNumber
    );
    expect(response.body.Empt.address).toEqual(config.postEmployees.address);
  });
});

describe("GET /employees", () => {
  it("responds with json", async () => {
    const response = await supertest(app).get("/employees/all");
    expect(response.status).toEqual(200);
  });
});

describe("GET /employee/:id", function () {
  it("responds with employee data in json", async function () {
    const response = await supertest(app).get(
      `/employees/${config.employeeData._id}`
    );
    expect(response.status).toEqual(200);
    expect(response.body.Employee._id).toEqual(config.employeeData._id);
    expect(response.body.Employee.adhaarNumber).toEqual(
      config.employeeData.adhaarNumber
    );
    expect(response.body.Employee.countryCode).toEqual(
      config.employeeData.countryCode
    );
    expect(response.body.Employee.phoneNumber).toEqual(
      config.employeeData.phoneNumber
    );
    expect(response.body.Employee.address).toEqual(config.employeeData.address);
    expect(response.body.Employee.password).toEqual(
      config.employeeData.password
    );
    expect(response.body.Employee.email).toEqual(config.employeeData.email);
  });
});
