import "./productsList.js";
import "./shoppingCart.js";

const mybutton = document.getElementById("BtnTop");
const btnDarkMode = document.getElementById("btnDarkMode");
const body = document.body;

mybutton.addEventListener("click", topFunction);
btnDarkMode.addEventListener("click", ChangeMode);

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getThemeLS() {
  let theme;
  theme = localStorage.getItem("theme");
  theme === "dark" ? body.classList.toggle("dark") : "";
}
getThemeLS();
function ChangeMode() {
  let theme;
  body.classList.toggle("dark");
  theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}
