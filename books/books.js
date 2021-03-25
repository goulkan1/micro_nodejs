const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Book");
app.use(bodyParser.json());

const Book = mongoose.model("Book");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/books?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.get("/", (req, res) => {
  res.send("root");
});

app.post("/book", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };

  var book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("book saved");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("booksave");
});

app.get("/books", (req, res) => {
  Book.find().then((book) => {
    res.json(book).catch((err) => {
      if (err) {
        throw err;
      }
    });
    console.log(book);
  });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("buku berhasil di hapaus");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(4545, () => {
  console.log(`Server started on port 4545`);
});
