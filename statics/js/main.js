import { listProducts, filterProducts } from "./productsList.js";
import CargarListener from "./shoppingCart.js";

const filter = document.querySelector("#FilterProd");
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  filterProducts(filter.value);
});

listProducts();
CargarListener();