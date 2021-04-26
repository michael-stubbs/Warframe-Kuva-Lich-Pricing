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

document.getElementById("copyButton").addEventListener("click", copyWhisper);
