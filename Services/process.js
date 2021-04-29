function omitBlanks(url, result) {
  if (result === "") {
    return "";
  } else {
    return url + result;
  }
}

function formAPIString(postedJSON) {
  let apiLink = "https://api.warframe.market/v1/auctions/search?type=lich";
  let field1 = omitBlanks("&weapon_url_name=", postedJSON.weapon);
  let field2 = omitBlanks("&element=", postedJSON.element);
  let field3 = omitBlanks("&ephemera=", postedJSON.ephemera);
  let field4 = omitBlanks("&quirk=", postedJSON.quirk);
  let field5 = omitBlanks("&sort_by=", postedJSON.sorting);
  let field6 = omitBlanks("&buyout_policy=", postedJSON.auctiontype);

  apiLink = apiLink + field1 + field2 + field3 + field4 + field5 + field6;
  return [apiLink, postedJSON.platform];
}

function prepJSON(json) {
  json = JSON.parse(json);
  json = json.payload.auctions;
  let jsonArray = [];
  for (let i = 0; i < json.length; i++) {
    jsonArray.push(json[i]);
  }
  return jsonArray;
}

//exports vs module.exports doesn't seem to matter
exports.formAPIString = formAPIString;
exports.prepJSON = prepJSON;
