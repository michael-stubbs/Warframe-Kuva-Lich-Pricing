function copyWhisper(event) {
  let button = event.target;

  // Currently only allows for <100 results
  let buttonID = Number(button.id.slice(-2));
  if (isNaN(buttonID) === true) {
    buttonID = button.id.slice(-1);
  }
  let body = document.getElementById("copyBody" + buttonID);
  body = body.innerText;
  navigator.clipboard.writeText(body).then(
    function () {
      button.innerHTML = "Copied!";
      setTimeout(function () {
        button.innerHTML = "Copy";
      }, 1300);
    },
    function () {}
  );
}

// Prevent JS error if no results present
let copyButton = document.querySelectorAll(".copyButton");
for (let i = 0; i < copyButton.length; i++) {
  if (copyButton[i] !== null) {
    copyButton[i].addEventListener("click", copyWhisper);
  }
}

let tableBody = document.querySelector(".resultsTable");
let jumbotron = document.querySelector(".jumbotron");
if (tableBody.rows.length < 2) {
  tableBody.deleteTHead();
  jumbotron.classList.remove("hidden");
}

// Extremely rough way to process hiding/showing entries the table.
function hideOffline() {
  let whisperButton = document.querySelectorAll(".whisper-button");
  for (let i = 0; i < whisperButton.length; i++) {
    if (whisperButton[i].classList.contains("offline")) {
      let parentNode = whisperButton[i].parentElement;
      parentNode = parentNode.parentElement;
      parentNode.classList.add("hidden");
    }
  }
  document.getElementById("hide-offline").classList.add("hidden");
  document.getElementById("show-offline").classList.remove("hidden");
}

function showOffline() {
  let whisperButton = document.querySelectorAll(".whisper-button");
  for (let i = 0; i < whisperButton.length; i++) {
    if (whisperButton[i].classList.contains("offline")) {
      let parentNode = whisperButton[i].parentElement;
      parentNode = parentNode.parentElement;
      parentNode.classList.remove("hidden");
    }
  }
  document.getElementById("show-offline").classList.add("hidden");
  document.getElementById("hide-offline").classList.remove("hidden");
}

document.getElementById("hide-offline").addEventListener("click", hideOffline);
document.getElementById("show-offline").addEventListener("click", showOffline);

function goBack() {
  history.go(-1);
  return false;
}

let backButtons = document.getElementsByClassName("back-button");
for (let index = 0; index < backButtons.length; index++) {
  backButtons[index].addEventListener("click", goBack);
}
