import { listProducts, filterProducts } from './productsList.js';

listProducts();

const filter = document.querySelector('#FilterProd');
document.addEventListener("keyup", (e)=>{
    e.preventDefault();
    filterProducts(filter.value);
})


console.log('fin')
