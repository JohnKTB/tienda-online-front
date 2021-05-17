export default class API {
  async getProducts() {
    const data = await fetch(`http://167.99.117.129/api/products/`);
    const response = await data.json();
    return response;
  };
  async filterProducts(product) {
    const data = await fetch(
      `http://167.99.117.129/api/filter-product/${product}`
    ); 
    const response = await data.json();
    return response;
  };
  async getCategories() {
    const data = await fetch(`http://167.99.117.129/api/categories/`);
    const response = await data.json();
    return response;
  };
  async filterCategories(categoryId) {
    const data = await fetch(
      `http://127.0.0.1:8000/api/filter-product-for-category/${categoryId}`
    );
    const response = await data.json();
    return response;
  };
}
