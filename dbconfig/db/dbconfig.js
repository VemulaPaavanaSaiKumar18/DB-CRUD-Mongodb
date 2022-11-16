let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/company", (err, res) => {
  if (err) {
    console.log("getting error in db" + err);
  } else {
    console.log("connected to DB");
  }
});

// const connectDb = async () => {
//   let db = await mongoose.connect("mongodb://localhost:7017/company");
// };

// try {
//   connectDb();
//   console.log("connected DB");
// } catch (err) {
//   console.log("error", err);
// }
