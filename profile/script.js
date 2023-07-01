const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const email=document.getElementById('email');

const oldPassword=document.getElementById('oldPassword');
const newPassword=document.getElementById('newPassword');
const confirmNewPassword=document.getElementById('confirmNewPassword');

const saveInfoBtn=document.getElementById('saveInfoBtn');
const changePasswordBtn=document.getElementById('changePasswordBtn');
const logoutBtn=document.getElementById('logoutBtn');



const userObj=JSON.parse(sessionStorage.getItem('loggedInUser'));

if(userObj){
firstName.value=userObj.firstName;
lastName.value=userObj.lastName;
email.value=userObj.email;
}
else {
 location.href='../signup';
}

function updateInfo(){
    const curUserObj={
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        password:newPassword.value || userObj.password //if we dont change password 
    }
    const users=JSON.parse(localStorage.getItem('users'));
    users.forEach((curUser,index)=>{
   if(curUser.email===userObj.email){
       users[index]=curUserObj;
       return;
   }
  })
  localStorage.setItem('users',JSON.stringify(users));
  sessionStorage.setItem('loggedInUser',JSON.stringify(curUserObj));

}


//----for saving information ---------
saveInfoBtn.addEventListener('click',(event)=>{
event.preventDefault();
updateInfo();
alert('profile Information updated !')
})

//----for changing password ---------
changePasswordBtn.addEventListener('click',(event)=>{

    event.preventDefault();
    if(userObj.password===oldPassword.value){
      if(newPassword.value===confirmNewPassword.value){
       updateInfo();
       alert('password uptated !');
       oldPassword.value='';
       newPassword.value='';
       confirmNewPassword.value='';
      }
      else{
        alert('Password is not same');
      }
    }
    else {
        alert('incorrect Old password');
    }
})


//for logout --------------

logoutBtn.addEventListener('click',()=>{
    sessionStorage.removeItem('loggedInUser');
    window.location.href='../login';
})

