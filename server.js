import express from "express";
import { library } from "./library.js";

// const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();

app.listen(port, () => {
  console.log("server is running");
});

app.use(express.json());
// middleware function
app.use("/library", router);

router
  .route("/books") //this library will acccept get and post methods
  .get((req, res) => {
    res.send(library);
  })
  .post((req, res) => {
    const book = req.body;
    console.log(book);
    res.status(201).send("Created successfully");
    // library.push(book);
  });

// `<label for="bookTitle">Book Title:</label>
//     <input type="text" placeholder="Name of the book" id="title"/>
// <label for="authorName"> Name of Author: </label>
//     <input type="text" placeholder="Author" id = "author"/>
// <label for ="date">Published Date: </label>
//     <input type="date" placeholder="Published Date" id="datePublished"/>
// <button type = "submit">Submit</button>`

// http://localhost:3000/library/books
