const myProducts=document.querySelector('.myProducts');
const productsList=document.querySelector('.products-list');
const totalPriceSpan=document.querySelector('.totalPrice-section #total-price');
let cart=JSON.parse(sessionStorage.getItem('cart'));

if(!cart){
location.href='../login/';
}
let totalPrice=0;
function showProducts(){
 myProducts.innerHTML="";

  cart.forEach((product) => {
    totalPrice +=Number(product.price);
      myProducts.innerHTML += `
    
  <div class="product-cart">
  <div class="image">
      <img src=${product.image} alt="image">
  </div>
  <div class="product-info">
      <h5 class="product-title">${product.title}</h5>
       <div class="price-size-section">
          <span class="price">${product.price}$</span>
          <span class="size">${product.size}</span>
       </div>
       <div class="colors">
          Colors : <div class="color"><div style='background-Color:${product.color}'></div></div>
       </div>
       <div class="rating-info"> Rating :  ${product.rating.rate}
        <div class="rating-image"><img src="./images/Star 1.png" alt=""></div>
       </div>
       
  </div>
  <button class="removeFrmCart" onclick="removeFrmCart(event)" id="${product.id}">Remove From Cart</button>
  </div>
  `;
    });

}
showProducts();

function showCheckoutList(){
productsList.innerHTML="";

cart.forEach((product)=>{
    productsList.innerHTML +=`
 <div class="productList-info">
    <span>${product.title.slice(0,15)}</span>
    <span>$${product.price}</span>
  </div>
    `;
})

totalPriceSpan.innerHTML=`Rs ${totalPrice}/-`;
}

showCheckoutList();