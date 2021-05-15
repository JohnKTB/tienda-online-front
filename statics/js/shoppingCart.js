//VARIABLES
const car = document.getElementById("carrito");
const listProducts = document.getElementById("product-container");
const products = document.querySelector("#lista-carrito");
const clearC = document.getElementById("vaciar-carrito");

//LISTENERS
LoadListener();
function LoadListener() {
  listProducts.addEventListener("click", buyProduct);
  car.addEventListener("click", deleteProduct);
  clearC.addEventListener("click", clearCar);
  document.addEventListener("DOMContentLoaded", loadLocalStorage);
}

//FUNCTIONS
function message(icon, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2500,
  });

  Toast.fire({
    icon: icon,
    title: message,
  });
}
function buyProduct(e) {
  e.preventDefault();

  if (e.target.className.includes("add-car")) {
    const product = e.target.parentElement.parentElement;
    readProduct(product);
  }
}

function readProduct(product) {
  const infoProduct = {
    image: product.querySelector("img").src,
    title: product.querySelector("h5").textContent,
    price: product.querySelector(".costo span").textContent,
    id: product.querySelector(".btnProd span").getAttribute("data-id"),
  };

  checkcProductId(infoProduct);
}

function insertToCar(product) {
  const row = document.createElement("tr");
  row.innerHTML = `
                    <td><img src="${product.image}" width=100></td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td><a href="#" class="delete-product" data-id="${product.id}">X</a></td>
    `;
  products.append(row);
  message("success", "Producto agregado al carrito!");
  addProductLocalStorage(product);
}

function deleteProduct(e) {
  let product, productId;
  e.preventDefault();
  if (e.target.className.includes("delete-product")) {
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;
    productId = product.querySelector("a").getAttribute("data-id");
  }

  deleteProductLocalStorage(productId);
}

function clearCar(e) {
  e.preventDefault();
  while (products.children[1]) {
    products.removeChild(products.children[1]);
  }

  clearLocalStorage();

  return false;
}

function deleteProductLocalStorage(product) {
  let productsLS;

  productsLS = getProductLocalStorage();

  productsLS.forEach(({ id }, index) => {
    if (id === product) productsLS.splice(index, 1);
  });

  localStorage.setItem("products", JSON.stringify(productsLS));
}

function loadLocalStorage() {
  let productsLS;
  productsLS = getProductLocalStorage();
  productsLS.forEach(({ image, title, price, id }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td><img src="${image}" width=100></td>
                    <td>${title}</td>
                    <td>${price}</td>
                    <td><a href="#" class="delete-product" data-id="${id}">X</a></td>
    `;
    products.appendChild(row);
  });
}

function addProductLocalStorage(product) {
  let products;
  products = getProductLocalStorage();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

function getProductLocalStorage() {
  let products;
  if (localStorage.getItem("products") == null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }
  return products;
}

function clearLocalStorage() {
  localStorage.clear();
}

function checkcProductId(product) {
  let products, exist;
  products = getProductLocalStorage();

  if (products.length === 0) {
    insertToCar(product);
  } else {
    products.forEach(({ id }) => {
      if (id === product.id) {
        exist = true;
      }
    });
    if (exist != true) {
      insertToCar(product);
    } else {
      alert("Producto ya agregado!");
    }
  }
}
