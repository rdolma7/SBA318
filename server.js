import express from "express";

import { library } from "./library.js";


const app = express();
const port = 3000;

//register view engine
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
  res.render('index', {library});
});

app.listen(port, () => {
  console.log("Server is running");
});

// middleware function
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});


// // router
// //   .route("/books") //this library will acccept get and post methods

app.get("/library/books", (req, res, next) => {
  res.send(library);
});
app.post("/library/books", (req, res) => {
  const { title, author, datePublished } = req.body;
  const book = {
    id: library.length + 1,
    title,
    author,
    datePublished,
  };
  library.push(book);
  res.status(201).send("Created successfully");
});
app.put("library/books/:id", (req, res) => {
  const book = library.find((item) => item.id == req.params.id);
  if (book) {
    const { title, author, datePublished } = req.body;
    book.title = title;
    book.author = author;
    book.datePublished = datePublished;
    res.send(book);
  } else {
    res.status(404).send("Unsuccessful");
  }
    res.send("Data received successfully");
    res.status(201).send("Update successful");
});
app.delete("/library/books", (req, res) => {
  const book = req.body;
  library.pop(book);
  res.send(library);
  res.status(201).send("Delete successful");
});

// .delete((req,res)=>{
//   res.
// });

// `<label for="bookTitle">Book Title:</label>
//     <input type="text" placeholder="Name of the book" id="title"/>
// <label for="authorName"> Name of Author: </label>
//     <input type="text" placeholder="Author" id = "author"/>
// <label for ="date">Published Date: </label>
//     <input type="date" placeholder="Published Date" id="datePublished"/>
// <button type = "submit">Submit</button>`

// http://localhost:3000/library/books
