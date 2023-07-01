

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let cnfPassword = document.getElementById('confirmPassword');


let signupBtn = document.getElementById('signupBtn');
let redirectTologin=document.getElementById('redirectTologin');

signupBtn.addEventListener('click', (event) => {
  // console.log('hi')
  event.preventDefault();
  let firstNameValue = firstName.value.trim();
  let lastNameValue = lastName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value;
  let cnfPasswordValue = cnfPassword.value;

  if (firstNameValue && lastNameValue && emailValue && passwordValue && cnfPasswordValue) {
    if (passwordValue === cnfPasswordValue) {
       //now we will check whether  users array  exist in localStorage or not 
        if(localStorage.getItem('users')){
         
         if(checkIfUserExist(emailValue)){ //if user exist ----
          alert('email exists !');
         } 
         else{ //if user is unique means that user doesnt exist in our users array 
          alert('you are our new user');
          saveUser(firstNameValue,lastNameValue,emailValue,passwordValue);

          // let users=JSON.parse(localStorage.getItem('users'));
          // users.push(userObj);
          // localStorage.setItem('users',JSON.stringify(users)); 
         }
          
        }
        else{
          //if users arr doesnt exist in localStorage  so this is first user in our website so only for this user this else will run only first time .
          alert('you are our first new user');
          saveUser(firstNameValue,lastNameValue,emailValue,passwordValue);
          
          
        }
    }
    else {
      alert('Password is not same ');
      password.value = '';
      cnfPassword.value = '';
    }
  }
  else {
    alert('all fields are required.');
  }
})

//for checking if user exist in users array
function checkIfUserExist(email){
  
  let users=JSON.parse(localStorage.getItem('users'));

 const user=users.find((userObj)=>{
     return userObj.email===email
  })
 
  if(user) return true;
  else false;
}

function  saveUser(firstNameValue,lastNameValue,emailValue,passwordValue){
  let userObj={
    firstName:firstNameValue,
    lastName:lastNameValue,
    email:emailValue,
    password:passwordValue,
  }
  let users=JSON.parse(localStorage.getItem('users')) || [];
  users.push(userObj);
  localStorage.setItem('users',JSON.stringify(users));
  sessionStorage.setItem('loggedInUser',JSON.stringify(userObj));
  firstName.value='';
  lastName.value='';
  email.value='';
  password.value='';
  cnfPassword.value='';

  alert('signup  sucessFully !');
  window.location.href='../profile';
}

//for login---

redirectTologin.addEventListener('click',(event)=>{

  event.preventDefault();
  window.location.href='../login';
})