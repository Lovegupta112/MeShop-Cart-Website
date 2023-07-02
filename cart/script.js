const myProducts=document.querySelector('.myProducts');
const productsList=document.querySelector('.products-list');
const totalPriceSpan=document.querySelector('.totalPrice-section #total-price');
const checkoutBtn=document.getElementById('checkoutBtn');
let cart=JSON.parse(localStorage.getItem('cart'));




if(!cart || cart.length===0){
location.href='../shop/';
alert('there is no Item added in cart');
}

function showProducts(){
 myProducts.innerHTML="";

  cart.forEach((product) => {
   
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
let totalPrice=0;
cart.forEach((product)=>{
  totalPrice +=Number(product.price);
    productsList.innerHTML +=`
 <div class="productList-info">
    <span>${product.title.slice(0,15)}</span>
    <span>$${product.price.toFixed(2)}</span>
  </div>
    `;
})

totalPriceSpan.innerHTML=` ${totalPrice}/-`;
}
showCheckoutList();

function removeFrmCart(event){
  // console.log(event.target.id);
  let removeCartId=event.target.id;
  let remainingProduct=cart.filter((product)=>{
     if(product.id!=removeCartId) 
      return product;
  })
  cart=[...remainingProduct];
  alert('Removed from Cart !');
  showProducts();
  showCheckoutList();
  localStorage.setItem('cart',JSON.stringify(cart));
}


checkoutBtn.addEventListener('click',()=>{
  localStorage.removeItem('cart');
  alert('Purchasing Product..');
  location.href='../razorpay/';
})
