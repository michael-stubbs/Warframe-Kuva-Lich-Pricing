function setUCfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Clear select menu, add default with blank string value
function clearDropdown(target, mainvar) {
  target.length = 0;
  let defaultOption = document.createElement("option");

  defaultOption.text = setUCfirst(mainvar);
  defaultOption.setAttribute("value", "");

  target.add(defaultOption);
  target.selectedi = 0;
}

function populateDropdown(type) {
  let dropdown = document.getElementById(type + "-type");
  clearDropdown(dropdown, type);

  // Hardcoded JSON, this should be changed later.
  // DE does not add new Kuva Lich features often.
  const url = "static/data/lich_" + type + "s.json";

  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Iterate to add dropdown options based on JSON
      response.json().then(function (data) {
        let option;

        for (let i = 0; i < data.length; i++) {
          option = document.createElement("option");
          option.text = data[i].item_name;
          option.value = data[i].url_name;
          dropdown.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });
}

populateDropdown("weapon");
populateDropdown("quirk");
