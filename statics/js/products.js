import API from "./api.js";

const $cardProduct = document.querySelector("#product-container");
const $categorySelect = document.querySelector("#categories");
const filter = document.querySelector("#FilterProd");

class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.renderCategory();
  }
  buildCategory() {
    return `
    <option value="${this.id}">${this.name}</option>
    `;
  }
  renderCategory() {
    $categorySelect.insertAdjacentHTML("beforeend", this.buildCategory());
  }
}

class Product {
  constructor({ id, url_image, name, price, discount }) {
    this.id = id;
    this.image = url_image;
    this.name = name;
    this.price = price;
    this.discount = discount;
  }
  buildProduct() {
    let discount;
    if (this.discount == 0) {
      discount = `<span class="discount_text d-block">Descuento:</span>
    <span class="discount_number"> ----- </span>`;
    } else {
      discount = `<span class="discount_text d-block">Descuento:</span>
    <span class="discount_number">${this.discount}% </span>`;
    }
    return `
                <div class="col-md-4">
                    <div class="card mt-3 mt-5">
                        <div class="product align-items-center p-2 text-center">
                            <img src="${this.image}" loading="lazy" alt="product image" class="rounded" width="160">
                            <h5>${this.name}</h5>
                            <!--Card Info-->
                            <div class="mt-3 info">
                            ${discount}
                            </div>
                            <div class="costo mt-3 text-dark">
                                <span>s/ ${this.price}</span>
                                <div class="star mt-3 align-items-center">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-half"></i>
                                </div>
                            </div>
                            <!--Card info end-->
                        </div>
                        <!--Button card-->
                        <div class="p-3 btnProd text-center text-white mt-3 cursor">
                            <span data-id="${this.id}" class="text-uppercase add-car">
                                Agregar al carrito
                                <i class="bi bi-cart-plus-fill" style="font-size: 1.2rem;"></i>
                            </span>
                        </div>
                    </div>
                </div>
        `;
  }
  buildMessage(message) {
    return `
    <p class="h4">Lo sentimos, pero no encontramos resultados para <p class="h1">"${message}"</p></p>
    `;
  }
  renderProduct() {
    $cardProduct.insertAdjacentHTML("afterbegin", this.buildProduct());
  }
  renderMessage(message) {
    $cardProduct.insertAdjacentHTML("afterbegin", this.buildMessage(message));
  }
}

document.addEventListener("keyup", () => filterProducts(filter.value));
$categorySelect.addEventListener("change", (e) =>
  filterCategories(e.target.value)
);

const api = new API();

function initCardProduct(products) {
  $cardProduct.innerHTML = "";
  let newPrice = 0;
  products.forEach((product) => {
    newPrice = (product.price * product.discount) / 100;
    product.price -= newPrice;
    new Product(product).renderProduct();
  });
}

function initCatgories(categories) {
  categories.forEach((categories) => {
    new Category(categories);
  });
}

async function listProducts() {
  const products = await api.getProducts();
  initCardProduct(products);
}

async function filterProducts(searchProduct) {
  if (searchProduct.length > 3) {
    let productsFiltered = await api.filterProducts(searchProduct);
    $cardProduct.innerHTML = "";
    productsFiltered.length != 0
      ? initCardProduct(productsFiltered)
      : new Product({}).renderMessage(filter.value);
  }
  if (searchProduct.length === 1) {
    $cardProduct.innerHTML = "";
    listProducts();
  }
}

async function filterCategories(CategoryId) {
  if (CategoryId !== "Categorias") {
    $cardProduct.innerHTML = "";
    const productsFiltered = await api.filterCategories(CategoryId);
    productsFiltered.length != 0
      ? initCardProduct(productsFiltered)
      : new Product({}).renderMessage(
          $categorySelect.options[$categorySelect.selectedIndex].text
        );
  } else {
    listProducts();
  }
}

async function listCategories() {
  const categories = await api.getCategories();
  initCatgories(categories);
}

listProducts();
listCategories();
