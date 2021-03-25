const mongoose = require("mongoose");

mongoose.model("Book", {
  //title author number pages publisher

  title: {
    type: "string",
    require: true,
  },
  author: {
    type: "string",
    require: true,
  },
  numberPages: {
    type: "string",
    require: true,
  },
  publisher: {
    type: "string",
    require: true,
  },
});
