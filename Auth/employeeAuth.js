const jwt = require("jsonwebtoken");

const authorizer = (req, res, next) => {
  try {
    let authToken = req.headers.authorization.split(" ")[1];
    if (authToken) {
      let decoded = jwt.verify(authToken, "sampleSecret");
      req.employees = decoded;
      return next();
    } else {
      res.status(401).send("un authorized");
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.authorizer = authorizer;
