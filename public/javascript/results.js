function copyWhisper() {
  let body = document.getElementById("copyBody");
  let button = document.getElementById("copyButton");
  body = body.innerHTML;
  document.execCommand("copy");
  navigator.clipboard.writeText(body).then(
    function () {
      button.innerHTML = "Copied!";
      setTimeout(function () {
        button.innerHTML = "Copy";
      }, 1300);
    },
    function () {
      /* clipboard write failed */
    }
  );
}

// Prevent JS error if no results present
let copyButton = document.getElementById("copyButton");
if (copyButton !== null) {
  copyButton.addEventListener("click", copyWhisper);
}

let tableBody = document.querySelector(".resultsTable");
let jumbotron = document.querySelector(".jumbotron");
if (tableBody.rows.length < 2) {
  tableBody.deleteTHead();
  jumbotron.classList.remove("hidden");
}
