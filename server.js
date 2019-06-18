const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const urlHandler = require("./controllers/urlHandler.js");

const app = express();

// Basic Configuration
const mongoURL = process.env.MONGOLAB_URI;
const port = process.env.PORT || 3000;

/** this project needs a db !! **/

mongoose.connect(mongoURL);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));

// your first API endpoint...
app.post("/api/shorturl/new", urlHandler.addUrl);

app.get("/api/shorturl/:shurl", urlHandler.processShortUrl);
// Answer not found to all the wrong routes
app.use((req, res, next) => {
  res.status(404);
  res.type("txt").send("Not found");
});

app.listen(port, () => console.log(`Node.js listening ... on port ${port}`));
