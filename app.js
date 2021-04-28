const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const cors = require("cors");
const got = require("got");
const port = 80;
const path = require("path");
const { response } = require("express");
const process = require("/Services/process.js");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(helmet());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

let results;

const pugCompile = pug.compileFile("views/results.pug");

app.post("/", async function (req, res) {
  let generatedGetString = process.formAPIString(req.body);
  await callAPI(generatedGetString);
  res.send(pugCompile({ data: results }));
});

// Refuses to work as a module for some reason.
async function callAPI(fullrequest) {
  try {
    await got(fullrequest[0], {
      "Platform: ": fullrequest[1],
      accept: "application/json",
    }).then((response) => {
      results = process.prepJSON(response.body);
    });
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log("Internal server error...");
  }
}

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// TODO: require Auction Type and Platform in form
// Add loading wheel or screen while processing API
