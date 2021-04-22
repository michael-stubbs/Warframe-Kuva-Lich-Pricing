// Add error for pressing Search with no selected inputs

function populateDropdown(type) {
  let dropdown = document.getElementById(type + "-type");

  // Clear select menu, add default with blank string value
  dropdown.length = 0;
  let defaultOption = document.createElement("option");
  function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  defaultOption.text = ucfirst(type);
  defaultOption.setAttribute("value", "");

  dropdown.add(defaultOption);
  dropdown.selectedi = 0;

  // Hardcoded JSON, this should be changed later.
  // DE does not add new Kuva Lich features often.
  const url = "data/lich_" + type + "s.json";

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
