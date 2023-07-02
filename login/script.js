
let email=document.getElementById('email');
let password=document.getElementById('password');
let loginBtn=document.getElementById('loginBtn');


loginBtn.addEventListener('click',(event)=>{
event.preventDefault();

let users=JSON.parse(localStorage.getItem('users'));
let access_token=JSON.parse(sessionStorage.getItem('access_token'));
let loggedInUser=JSON.parse(sessionStorage.getItem('loggedInUser'));

if(access_token && loggedInUser){
  location.href='../profile';
}

if( email.value.trim()==='' || password.value==='' ){
  alert('Please Enter the all fields');
} 
else{
    if(users){
     let userObj=users.find((currentUser)=>{
        return currentUser.email===email.value.trim();
     })
     if(userObj){
      if(userObj.password===password.value){
        sessionStorage.setItem('loggedInUser',JSON.stringify(userObj));
        sessionStorage.setItem('access_token',JSON.stringify(genrateRandomToken()));
        location.href='../profile';
        alert('login successfull');
      }
      else {
        alert('incorrect password');
      }
     }
     else{
        alert('User doesnt exist');
     }
     
    }
    else{
        // alert('You have not singed in !');
        alert('You have not signed up !');
        location.href='../signup';
    }
}

})

function genrateRandomToken() {
  const Strings =
    "@#$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomToken = "";
  for (let i = 1; i <= 16; i++) {
    randomToken += Strings[Math.floor(Math.random() * 17)];
  }
  return randomToken;
}