function copyWhisper() {
  let body = document.getElementById("copyBody");
  body = body.innerHTML;
  document.execCommand("copy");
  navigator.clipboard.writeText(body).then(
    function () {
      /* clipboard successfully set */
    },
    function () {
      /* clipboard write failed */
    }
  );
}

document.getElementById("copyButton").addEventListener("click", copyWhisper);
