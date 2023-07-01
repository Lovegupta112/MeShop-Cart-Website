let showProductsContainer = document.querySelector(".showProducts");
const categoriesBtn = document.querySelectorAll(".toggle-buttons button");
const searchInput=document.getElementById('search-input');
let categoriesArr = [];
let productArr=[];


if(!sessionStorage.getItem('loggedInUser')){
  location.href='../login';
}
window.addEventListener("load", fetchCategories);

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = await response.json();
    console.log(categories);
    categoriesArr = [...categories];
    fetchCategoryProducts(categories);
  } catch (error) {
    console.log("Not able to fetch Categories ", error);
  }
}

function fetchCategoryProducts(categories) {
  categories.forEach(async (category) => {
    const productsData =await fetchProducts(category);
    productArr.push(productsData);
    showProducts(productsData, category);
  });
}

async function fetchProducts(category) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await response.json();
    // console.log(data);

    let dataWithColor=await addRandomColor(data);
    let dataWithColorSize= await addRandomSize(dataWithColor);
    return dataWithColorSize;
  } catch (error) {
    console.log("Not able to fetch category products ", error);
  }
}

function addRandomColor(productsData){
  let colorArr=['red','green','blue','black','white'];
  
  let data=productsData.map((product)=>{
       product.color=colorArr[Math.floor(Math.random()*colorArr.length)];
       return product;
  })
  return data;
  
  }

  function addRandomSize(productsData){
    let sizeArr=['S','M','L','XL'];

    let data=productsData.map((product)=>{
        product.size=sizeArr[Math.floor(Math.random()*sizeArr.length)];
         return product;
    })

    return data;
  }

function showProducts(productsData, category) {
  // addRating();
  const products = document.createElement("div");
  products.className = "products";
  const categoryTitle = document.createElement("h1");
  categoryTitle.className = "category";
  categoryTitle.innerText = category || 'Your Search Results';
  const productCartSection = document.createElement("div");
  productCartSection.className = "product-cart-section";

  productsData.forEach((product) => {
    productCartSection.innerHTML += `

<div class="product-cart">
<div class="image">
    <img src=${product.image} alt="${category}-image">
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
<button class="addToCartBtn" onclick="addToCart(event)" id="${product.id}">Add To Cart</button>
</div>
`;
  });

  products.append(categoryTitle);
  products.append(productCartSection);
  showProductsContainer.append(products);
}



// function addRating(rating){

// let rate=Math.round(Number(rating));
// let div=document.createElement('div');
// div.className='rating-image';
// for(let i=1;i<=rate;i++){
//   div.innerHTML+=' <img src="./images/Star 1.png" alt="">';
// }
// document.querySelector('.rating-info').innerHTML=div;
// }



//for categories  toggle Buttons ----
categoriesBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => updateCategory(event.target.id));
});

async function updateCategory(id) {
  if (id === "all") {
    showProductsContainer.innerHTML = "";
    fetchCategories();
  } else {
    let category = categoriesArr.find((category) => {
      return category.includes(id);
    });
    const productsData = await fetchProducts(category);
    showProductsContainer.innerHTML = "";
    showProducts(productsData, category);
  }
}


// ---------------------------------------


searchInput.addEventListener('input',()=>{
  // console.log(searchInput.value);
 let searchProduct=[];
  let inputValue=searchInput.value;
 showProductsContainer.innerHTML="";
if(inputValue){
  productArr.forEach((products)=>{
    products.forEach((curProduct)=>{
      if(curProduct.title.includes(inputValue)){
        searchProduct.push(curProduct);
      }
     })
      // .includes(inputValue);
   })
   console.log(searchProduct);
// showProducts(searchProduct);
showFilterProducts(searchProduct);
// searchProduct=[];
  } 
else {
  fetchCategories();
}
})

const applyFilterBtn=document.getElementById('applyFilterBtn');

applyFilterBtn.addEventListener('click',()=>{
  let markedCheckBox=document.querySelectorAll("input[type='checkbox']");
  let rateValue=document.querySelector("input[type='range']").value;
  // console.log(markedCheckBox);
  console.log(rateValue);

  markedCheckBox.forEach((checkBox)=>{
    if(checkBox.checked || rateValue>0){
     console.log(checkBox);
     let name=checkBox.name;
     let value=checkBox.id;
     let min,max;
     let obj=[];
    //  console.log(name,value);
    if(name==='price'){
      min=value.split("-")[0];
      max=value.split("-")[1];
    }
     productArr.forEach((product)=>{
      obj= product.filter((elm)=>{
       if(elm.hasOwnProperty(name) && (elm[name]===value || (elm[name]>=min && elm[name]<=max)) || rateValue==Math.round(Number(elm.rating.rate))){
        return elm;
       }
       
       })
     })
    console.log(obj);
    showProductsContainer.innerHTML="";
    showFilterProducts(obj);
    }
  })
})


function showFilterProducts(productsData){

  const productCartSection = document.createElement("div");
  productCartSection.className = "product-cart-section";

  productsData.forEach((product) => {
    productCartSection.innerHTML += `

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
<button class="addToCartBtn" onclick="addToCart(event)" id="${product.id}">Add To Cart</button>
</div>
`;
  });
  showProductsContainer.append(productCartSection);
}


function addToCart(event){
  // console.log(event.target);
  let objId=event.target.id;
  let productObj=JSON.parse(sessionStorage.getItem('cart')) || [];
  let product;
  productArr.forEach((products)=>{
   product= products.find((elm)=>{
                if( elm.id==objId){
                  return elm;
                }
     })
     if(product) {
      productObj.push(product)
     }
   })
  
  //  if(productObj){
    sessionStorage.setItem('cart',JSON.stringify(productObj));
  //  }
}


