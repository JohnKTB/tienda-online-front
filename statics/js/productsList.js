import API from './api.js';

//VARIABLES
const $cardProduct = document.querySelector( '#product-container' );
let newPrice = 0;

class Product{
    constructor({ url_image, name, price }){
        
        this.image = url_image
        this.name = name 
        this.price = price
        this.render()

    };
    build() {
    
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
                            <span class="text-uppercase">
                                Agregar al carrito
                                <i class="bi bi-cart-plus-fill" style="font-size: 1.2rem;"></i>
                            </span>
                        </div>
                    </div>
                </div>
        `
    };
    render(){
        $cardProduct.insertAdjacentHTML('afterbegin', this.build());
    }

}

const api = new API();

const listProducts = async () => {
    
const products = await api.getProducts()

products.forEach( data => {
    
    newPrice = data.price * data.discount/100
    data.price -= newPrice
    new Product( data )
    
});
};

const filterProducts = async (searchProduct) => {
    
    if(searchProduct.length > 3){
    $cardProduct.innerHTML = ''
    const productsFiltered = await api.filterProducts(searchProduct)

    productsFiltered.forEach( data => {
        console.log(data)
        newPrice = data.price * data.discount/100
        data.price -= newPrice
        new Product( data )
        
    });
}
if(searchProduct.length === 1){
    $cardProduct.innerHTML = ''
    listProducts();
}
};


export { listProducts, filterProducts }
