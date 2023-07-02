
document.getElementById("rzp-button1").onclick = function (e) {
    var options = {
      key: "rzp_test_M002D7SKFAu", 
      amount: 300 * 100, 
      currency: "INR",
      name: "MyShop Checkout",
      description: "This is your order", 
      theme: {
        color: "#000",
      },
      image:
        "https://i.pinimg.com/originals/7c/d7/81/7cd781a7a29b266d6efa30b01cd3a238.jpg",
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    //clear cart product from localStorage--
    localStorage.removeItem('cart');
    e.preventDefault();
  };

  document.getElementById('backToShopBtn').onclick=function(){

    location.href='../shop'
  }