const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const cors = require("cors");
const got = require("got");
const port = 3000;
const path = require("path");
const { response } = require("express");
const process = require(__dirname + "/services/process.js");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

let results;

const compiledFunction = pug.compileFile("views/results.pug");

app.post("/", async function (req, res) {
  let generatedGetString = process.formAPIString(req.body);
  await callAPI(generatedGetString);
  res.send(compiledFunction({ data: results }));
});

// This wouldn't work as a module. Results would export before async finished.
async function callAPI(fullrequest) {
  try {
    await got(fullrequest[0], {
      "Platform: ": fullrequest[1],
      accept: "application/json",
    }).then((response) => {
      results = prepJSON(response.body);
    });
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log("Internal server error...");
  }
}

//compiledFunction({item: json})
// Need a loading icon and something to send back

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

// TODO: move into Services module
function prepJSON(json) {
  json = JSON.parse(json);
  json = json.payload.auctions;
  let jsonArray = [];
  for (let i = 0; i < json.length; i++) {
    for (let f = 0; f < json.length; f++) {
      jsonArray.push(json[f]);
    }
  }
  return jsonArray;
}
