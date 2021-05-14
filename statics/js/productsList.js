import API from "./api.js";

const $cardProduct = document.querySelector("#product-container");

class Product {
  constructor({id, url_image, name, price }) {
    this.id = id;
    this.image = url_image;
    this.name = name;
    this.price = price;
    this.render();
  }
  buildProduct() {
    return `
                <div class="col-md-4">
                    <div class="card mt-3 mt-5">
                        <div class="product align-items-center p-2 text-center">
                            <img src="${this.image}" alt="" class="rounded" width="160">
                            <h5>${this.name}</h5>
                            <!--Card Info-->
                            <div class="mt-3 info">
                                <span class="text1 d-block">Lorem ipsum dolor corrufig</span>
                                <span class="text1">Lorem ipsum dolor </span>
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
  render() {
    $cardProduct.insertAdjacentHTML("afterbegin", this.buildProduct());
  }
}

const api = new API();

function initApp(products) {
  let newPrice = 0;
  products.forEach((data) => {
    newPrice = (data.price * data.discount) / 100;
    data.price -= newPrice;
    new Product(data);
  });
}

const listProducts = async () => {
  const products = await api.getProducts();

  initApp(products);
};

const filterProducts = async (searchProduct) => {
  if (searchProduct.length > 3) {
    $cardProduct.innerHTML = "";
    const productsFiltered = await api.filterProducts(searchProduct);

    initApp(productsFiltered);
  }
  if (searchProduct.length === 1) {
    $cardProduct.innerHTML = "";
    listProducts();
  }
};

export { listProducts, filterProducts };
