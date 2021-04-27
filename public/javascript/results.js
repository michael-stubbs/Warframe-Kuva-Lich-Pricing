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

// Extremely rough way to process hiding/removing entries the table.
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
