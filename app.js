const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const cors = require("cors");
const got = require("got");
const port = 3000;
const path = require("path");
const { response } = require("express");
const process = require(__dirname + "/services/process.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.post("/", async function (req, res) {
  let generatedGetString = process.formAPIString(req.body);
  await callAPI(generatedGetString);
  // res.sendFile(path.join(__dirname + "/public/results.html"));
  res.send(compiledFunction());
});

const compiledFunction = pug.compileFile("views/results.pug");

// This wouldn't work as a module. I still have no idea why results would export before it was written.
async function callAPI(fullrequest) {
  try {
    await got(fullrequest[0], {
      "Platform: ": fullrequest[1],
      accept: "application/json",
    }).then((response) => {
      results = response.body;
    });
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log("Internal server error...");
  }
}

let results;

// Need a loading icon and something to send back

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
