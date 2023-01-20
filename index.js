const express = require("express");
const app = express();
const fs = require("fs");
const db = require("./db.js");
const path = require("path");
const mongoose = require("mongoose");

const cors = require("cors");
// const bodyparser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");



//schema for contact form
const schema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: Date,
});
const Contact = mongoose.model("contact", schema);


// Set the views directory
// app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.status(200).render("demo");
});
app.get("/2", (req, res) => {
  res.status(200).render("demo");
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact");
});
app.get("/about", (req, res) => {
  res.status(200).render("about");
});
app.get("/projects", (req, res) => {
  res.status(200).render("projects");
});
app.get("/signup", (req, res) => {
  res.status(200).render("signup", { alert: "" });
});
app.get("/login", (req, res) => {
  res.status(200).render("login", { alert: "" });
});



app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      console.log(myData);
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the databse");
      console.log(myData);
      // console.log(res)
    });
});

// Catch all handler for all other request.
app.use("*", (req, res) => {
  res.json({ msg: "Welcome" }).end();
  // res.sendFile(path.join(__dirname, "./index.html"));
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`index.js listening on ${port}`);
});


// technique to get connect with server without express
// const http = require('http');
// const fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 80;

// const home = fs.readFileSync('./home.html');
// const about = fs.readFileSync('./about.html');
// const contact = fs.readFileSync('./contact.html');
// const project = fs.readFileSync('./projects.html');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   url = req.url;
//   console.log(url);
//   res.setHeader('Content-Type', 'text/html');
//   if (url == '/') {
//     res.end(home);
//   }
//   else if (url == '/about') {
//     res.end(about);
//   }

//   else if (url == '/contact') {
//     res.end(contact);
//   }
//   else if (url == '/projects') {
//     res.end(project);
//   }
//   else {
//     res.statusCode = 404;
//     res.end("<h1>404 not found</h1>");
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

