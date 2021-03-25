const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const e = require("express");
app.use(bodyParser.json());
require("./Order");
const Order = mongoose.model("Order");
const axios = require("axios");
const { response } = require("express");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/orders?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };

  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      console.log("order sudah di buat ");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("order oke");
});

app.get("/orders", (req, res) => {
  Order.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order) {
      axios
        .get("http://localhost:5555/customer/" + order.CustomerID)
        .then((response) => {
          var orderObject = { customerName: response.data.name, bookTitle: "" };

          axios
            .get("http://localhost:4545/book/" + order.BookID)
            .then((response) => {
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            });
        });
    } else {
      res.send("invalid orders");
    }
  });
});

app.listen(7777, () => {
  console.log(`Server Orders started on port 7777`);
});
