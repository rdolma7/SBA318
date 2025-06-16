import express from "express";

import methodOverride from "method-override";

import { library } from "./library.js";

const app = express();
const port = 3000;

//register view engine
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Methods
app.get("/", (req, res) => {
  res.render("index", { library });
});

app.get("/library/books", (req, res) => {
  res.send(library);
});

app.post("/library/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send("Title and author are required");
  }
  const newBook = { id: library.length + 1, title, author };
  library.push(newBook);

  if (req.headers["content-type"]==="application/json"){
    return res.status(201).send(newBook);
  }

  res.redirect("/");

});

app.patch("/library/books/update", (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("ID number is a  required field");
  }
  req.url = `/library/books/${id}`;
  next();
});

app.patch("/library/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { author } = req.body;

  const book = library.find((b) => b.id === id);
  if (!book) {
   return res.status(404).send("Unsuccessful. Book not found");
  }
  book.author = author;

  if(req.headers["content-type"]==="application/json"){
    return res.status(200).send(book);
  }
  res.redirect("/");
});


app.delete("/library/books/delete", (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("ID is a required field");
  }
  req.url = `/library/books/${id}`;
  next();
});
app.delete("/library/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = library.findIndex((book) => book.id === id);

if (index === -1) {
 return res.status(404).send("Not found");
}
library.splice(index, 1);
res.redirect("/");
});

//middleware error functions

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log("Server is running");
});

// app.patch("/library/books/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedAccount = req.body;
//   const index = accounts.findIndex((account) => account.id === parseInt(id));
//   if (index !== -1) {
//     accounts[index] = { ...accounts[index], ...updatedAccount };
//     res.send(accounts[index]);
//   } else {
//     res.status(404).send({ error: "Account not found" });
//   }
// });
// app.put("library/books/:id", (req, res) => {
//   const book = library.find((item) => item.id == req.params.id);
//   if (book) {
//     const { title, author, datePublished } = req.body;
//     book.title = title;
//     book.author = author;
//     book.datePublished = datePublished;
//     res.send(book);
//   } else {
//     res.status(404).send("Unsuccessful");
//   }
//   res.send("Data received successfully");
//   res.status(201).send("Update successful");
// });