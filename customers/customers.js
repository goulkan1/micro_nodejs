const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Customer");

const Customer = mongoose.model("Customer");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/customers?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.use(bodyParser.json());

app.post("/customers", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  var customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => {
      res.send("berhasil di tambah kostumer");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then((costumers) => {
      res.json(costumers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id).then((customer) => {
    if (customer) {
      res.json(customer);
    } else {
      res.send("invalid id");
    }
  });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("hapus kostumer berhasil");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(5555, () => {
  console.log(`customres Server started on port`);
});
