//  name HTML DOM //
const signin = document.querySelector(".signin");
const signout = document.querySelector(".signout");
const signin_box = document.querySelector(".signin_box");
const covering = document.querySelector(".covering");
const icon_close = document.querySelectorAll(".icon_close");
const change_signup = document.querySelector(".changeTo_signup");
const change_signin = document.querySelector(".changeTo_signin");
const signup_box = document.querySelector(".signup_box");
const signin_btn = document.querySelector(".signin_btn");
const signup_btn = document.querySelector(".signup_btn");
const error_signin = document.querySelector(".error_signin")
const repeat_signup = document.querySelector(".repeat_signup")
const success_signup = document.querySelector(".success_signup")
let username;
let usermail;
let password;
let user_url=`/api/user`;

// check user signin/out //
function checkUser(){
    fetch(user_url, {
        method:'GET',
        headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => {
        return res.json();   
    })
    .then(result => { 
        if(result.data == null){
            signout.style.display = "none";
            signin.style.display = "block";
        }else{
            signout.style.display = "block";
            signin.style.display = "none";
        }
      })
}

// click nav 登入/註冊  //
signin.addEventListener("click" ,() =>{
    signin_box.style.display = "grid";
    signup_box.style.display = "none";
    covering.style.display = "block";
    // clear signup error message //
    repeat_signup.innerHTML=" ";
    // clear signup successful message //
    success_signup.style.display = "none";
    // clear signup value //
    document.getElementsByName("username")[0].value="";
    document.getElementsByName("usermail")[1].value="";
    document.getElementsByName("password")[1].value="";
    // clear signin error message //
    error_signin.style.display = "none";
    // clear input value //
    document.getElementsByName("usermail")[0].value="";
    document.getElementsByName("password")[0].value="";

    
});

// press signin_btn //
signin_btn.addEventListener("click" ,() =>{
    usermail = document.getElementsByName("usermail")[0].value;
    password = document.getElementsByName("password")[0].value;
    // signin /api/user PATCH //
    fetch(user_url, {
        method:'PATCH',
        body:JSON.stringify({"email":usermail,
                            "password":password            
        }),
        headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => {
        return res.json();   
    })
    .then(result => { 
        if(result.ok == true){
            // clear input value //
            document.getElementsByName("usermail")[0].value="";
            document.getElementsByName("password")[0].value="";
            console.log("ok");
            signout.style.display = "block";
            signin.style.display = "none";
            window.location.reload();

        }else{
            error_signin.style.display = "block";
        }
      })
    console.log(usermail);
    console.log(password);
});


//  還沒有帳戶？點此註冊_change to signup//
change_signup.addEventListener("click",() =>{
    signup_box.style.display = "grid";
    signin_box.style.display = "none";
    covering.style.display = "block";
    // clear signin error message //
    error_signin.style.display = "none";
    // clear input value //
    document.getElementsByName("usermail")[0].value="";
    document.getElementsByName("password")[0].value="";
});

// 已經有帳戶了？點此登入_change to signin //
change_signin.addEventListener("click",() =>{
    signup_box.style.display = "none";
    signin_box.style.display = "grid";
    covering.style.display = "block";
    // clear signup error message //
    repeat_signup.innerHTML=" ";
    // clear signup value //
    document.getElementsByName("username")[0].value="";
    document.getElementsByName("usermail")[1].value="";
    document.getElementsByName("password")[1].value="";
});

// press signup_btn //
signup_btn.addEventListener("click" ,() =>{
    username = document.getElementsByName("username")[0].value;
    usermail = document.getElementsByName("usermail")[1].value;
    password = document.getElementsByName("password")[1].value;
    // clean input value //
    if(!username){
        repeat_signup.style.display = "block";
        success_signup.style.display = "none";
        repeat_signup.innerHTML="姓名未輸入";
        return;
    }else if(!usermail){
        repeat_signup.style.display = "block";
        success_signup.style.display = "none";
        repeat_signup.innerHTML="電子郵件未輸入";
        return;
    }else if(!password){
        repeat_signup.style.display = "block";
        success_signup.style.display = "none";
        repeat_signup.innerHTML="密碼未輸入";
        return;
    }
    document.getElementsByName("username")[0].value="";
    document.getElementsByName("usermail")[1].value="";
    document.getElementsByName("password")[1].value="";
    console.log(username);
    console.log(usermail);
    console.log(password);
    // signup /api/user POST //
    fetch(user_url, {
        method:'POST',
        body:JSON.stringify({"name":username,
                            "email":usermail,
                            "password":password            
        }),
        headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => {
        return res.json();   
    })
    .then(result => { 
        if(result.ok == true){
            console.log("ok");
            success_signup.style.display = "block";
            repeat_signup.style.display = "none";
            signout.style.display = "block";
            signin.style.display = "none";
        }else{
            success_signup.style.display = "none";
            repeat_signup.style.display = "block";
            repeat_signup.innerHTML="";
            repeat_signup.innerHTML="此電子郵件已重複註冊";
        }
      })
});
//  press signout_btn //
signout.addEventListener("click" ,() =>{
    signout.style.display = "none";
    signin.style.display = "block";
    //  signout /api/user DELETE //
    fetch(user_url, {
        method:'DELETE',
        headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => {
        return res.json();   
    })
    .then(result => { 
        if(result.ok == true){
            window.location.reload(); 
        }
      })
    
});

//  close_btn -- close box //
icon_close[0].addEventListener("click", close_box , false);
icon_close[1].addEventListener("click", close_box , false);

function close_box(){
    signin_box.style.display = "none";
    signup_box.style.display = "none";
    covering.style.display = "none";
};