export default class API {
  async getProducts() {
    const data = await fetch(`http://127.0.0.1:8000/api/products/`);
    const response = await data.json();
    return response;
  }
  async filterProducts(product) {
    const data = await fetch(
      `http://127.0.0.1:8000/api/filter-product/${product}`
    );
    const response = await data.json();
    return response;
  }
}
