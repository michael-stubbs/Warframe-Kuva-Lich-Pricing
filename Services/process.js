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
exports.omitBlanks = omitBlanks;
exports.formAPIString = formAPIString;
exports.prepJSON = prepJSON;
