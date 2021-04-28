const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const cors = require("cors");
const got = require("got");
const path = require("path");
const { response } = require("express");
const processData = require(process.env.PWD + "/Services/process.js");
const helmet = require("helmet");
const server = require("http").createServer();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(helmet());

server.listen(port, () => console.log(`Listening on ${port}`));

app.get("/", function (req, res) {
  // res.sendFile("/views/index.html", { root: process.env.PWD });
  res.send(console.log(process.env.PWD));
});

let results;

const pugCompile = pug.compileFile(process.env.PWD + "/views/results.pug");

app.post("/", async function (req, res) {
  let generatedGetString = processData.formAPIString(req.body);
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
      results = processData.prepJSON(response.body);
    });
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log("Internal server error...");
  }
}

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
