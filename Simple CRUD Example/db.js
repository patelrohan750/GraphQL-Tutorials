const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/graphqltuts", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })
    .then(() => {
        console.log("Database connection sucessfull");
    })
    .catch((e) => {
        console.log("No Database Connection!!!");
        console.log(e);
    });