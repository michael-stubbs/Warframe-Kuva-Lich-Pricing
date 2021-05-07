const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const cors = require("cors");
const got = require("got");
const path = require("path");
const { response } = require("express");
const helmet = require("helmet");
const port = process.env.PORT || 3000;
const processData = require(path.join(__dirname + "/Services/process.js"));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/static", express.static(path.join(__dirname + "/public")));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "cdnjs.cloudflare.com",
        "fonts.gstatic.com",
        "fonts.googleapis.com",
      ],
      scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "w3.com"],
    },
  })
);

app.listen(port, () => console.log(`Listening on ${port}`));

const pugCompile = pug.compileFile(path.join(__dirname + "/views/results.pug"));

app.get("/", function (req, res) {
  res.sendFile("/views/index.html", { root: __dirname });
});

app.post("/", async function (req, res) {
  let generatedGetString = processData.formAPIString(req.body);
  await callAPI(generatedGetString);
  res.send(pugCompile({ data: results }));
});

let results;
// Async does not appear to be working as expected when this is in a module.
// Should be moved out of this layer
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
