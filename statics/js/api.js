export default class API {
  constructor() {
    this.url = "http://167.99.117.129/";
  }
  async getProducts() {
    try {
      const data = await fetch(`${this.url}api/products/`);
      const response = await data.json();
      return response;
    } catch (error) {
      alert("Error de servidor");
    }
  }
  async filterProducts(product) {
    try {
      const data = await fetch(`${this.url}api/filter-product/${product}`);
      const response = await data.json();
      return response;
    } catch (error) {
      alert("Error de servidor");
    }
  }
  async getCategories() {
    try {
      const data = await fetch(`${this.url}api/categories/`);
      const response = await data.json();
      return response;
    } catch (error) {
      alert("Error de servidor");
    }
  }
  async filterCategories(categoryId) {
    try {
      const data = await fetch(
        `${this.url}api/filter-product-for-category/${categoryId}`
      );
      const response = await data.json();
      return response;
    } catch (error) {
      alert("Error de servidor");
    }
  }
}
