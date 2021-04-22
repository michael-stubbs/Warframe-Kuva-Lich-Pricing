const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const got = require("got");
const port = 3000;
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

function omitBlanks(field, string) {
  if (string === "") {
    field = "";
    return field;
  } else {
    return field;
  }
}

function formAPIString(postedJSON) {
  let apiLink = "https://api.warframe.market/v1/auctions/search?type=lich";
  let field1 = "&weapon_url_name=" + postedJSON.weapon;
  field1 = omitBlanks(field1, postedJSON.weapon);
  let field2 = "&element=" + postedJSON.element;
  field2 = omitBlanks(field2, postedJSON.element);
  let field3 = "&ephemera=" + postedJSON.ephemera;
  field3 = omitBlanks(field3, postedJSON.ephemera);
  let field4 = "&quirk=" + postedJSON.quirk;
  field4 = omitBlanks(field4, postedJSON.quirk);
  let field5 = "&sort_by=" + postedJSON.sorting;
  field5 = omitBlanks(field5, postedJSON.sorting);
  let field6 = "&buyout_policy=" + postedJSON.auctiontype;
  field6 = omitBlanks(field6, postedJSON.auctiontype);
  let platformHead = postedJSON.platform;

  apiLink = apiLink + field1 + field2 + field3 + field4 + field5 + field6;
  return [apiLink, platformHead];
}

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
    console.log(error.response.body);
    //=> 'Internal server error ...'
  }
}

function writeToPublic(data) {
  fs.writeFile("public/data/test.json", "", (err) => {
    if (err) {
      throw err;
    }
    console.log("Wrote blank string to file.");
  });
  fs.writeFile("public/data/test.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data saved.");
  });
}

var results;

app.post("/", async function (req, res) {
  let generatedGetString = formAPIString(req.body);
  await callAPI(generatedGetString);
  var jsonWrite = JSON.stringify(results);
  writeToPublic(jsonWrite);
  res.sendFile(path.join(__dirname + "/public/results.html"));
});

// Need a loading icon and something to send back
