import generateElement from "./generateElement.js";

window.doStuff = doStuff;
window.doj = doj;

document.getElementById("hello-world").innerHTML = "d"

function doStuff() {
  const element = generateElement();

  element.innerHTML = "Hello!";

  document.body.appendChild(element);
}

function doj() {
  alert("doj")
}

