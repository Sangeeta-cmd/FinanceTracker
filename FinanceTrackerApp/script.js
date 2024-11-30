let loginForm = document.querySelector(".login_access .login-form")
let signupForm = document.querySelector(".login_register .login-form")
const loginAccessRegister = document.getElementById("loginAccessRegister")
const signUpBtn = document.getElementById("loginButtonRegister")
const logInbtn  = document.getElementById("loginButtonAccess")
let loginEmailIp = document.querySelector('#loginEmail');
let loginPwdIp = document.querySelector('#loginPwd');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let usernameInput = document.getElementById('username');


signUpBtn.addEventListener("click", ()=>{
    loginAccessRegister.classList.add('active')
})

logInbtn.addEventListener("click", ()=>{
    loginAccessRegister.classList.remove('active')
})
 
 
loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const emailId = loginEmailIp.value; 
    const password = loginPwdIp.value;
 
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
        let user = users.find(u => u.emailId === emailId && u.password === password)
        if(user){
            alert("login successful!")
            window.open('dashboard.html', '_blank')
        }else{
            alert("Invalid email id or password")
        }
    })
    .catch(error =>
        console.log(error)
    )

    loginForm.reset()
})

signupForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const emailId = emailInput.value; 
    const username = usernameInput.value;
    const password = passwordInput.value; 

    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
        let user = users.find(u => u.emailId === emailId && u.username === username)
        if(!user){ 
            saveLoginCredentials(username, emailId, password);
        }else{
            alert("emailId is already in use | Please login")
        }
    })
    .catch(error =>
        console.log(error)
    )

    signupForm.reset()
})

function saveLoginCredentials(username, emailId, password){
    console.log(username)
    console.log(emailId)
    console.log(password)

    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({username, emailId, password})
    })
    .then(response =>{ 
        if(response.ok){
            alert("registration successful!")
        }else {
            alert("Signup failed. Please try again.");
        }
    })
    .catch(error =>
        console.log(error)
    )

    loginAccessRegister.classList.remove('active')   
}