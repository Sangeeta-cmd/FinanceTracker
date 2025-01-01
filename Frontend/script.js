t1 = gsap.timeline();
t1.from("h1",{
    y: 60,
    duration: 1.5,
    opacity: 0,
})

t1.from("#init-para",{
    y: 60,
    duration: 1.5,
    opacity:0,
})

t1.from("#img",{
    y: 60,
    opacity: 0,
    duration:1.5
})

t1.from(".login_access",{
    duration: 2,
    scale: 0
})


let loginForm = document.querySelector(".login_access form");
let signupForm = document.querySelector(".login_register form");
let mainContainer = document.getElementById("main-container");
let signUpBtn = document.getElementById("loginButtonRegister");
let logInbtn  = document.getElementById("loginButtonAccess");
let login_email = document.querySelector('.login_access #email');
let login_password = document.querySelector('.login_access #password');
let user_email = document.querySelector('.login_register #email');
let user_password = document.querySelector('.login_register #password');
let user_name = document.querySelector('.login_register #username');


signUpBtn.addEventListener("click", ()=>{
    console.log("click")
    mainContainer.classList.add('active');
})

logInbtn.addEventListener("click", ()=>{
    mainContainer.classList.remove('active');
})
 
 
loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const email = login_email.value; 
    const password = login_password.value;
 
    fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(users => {
        let user = users.find(u => u.email === email && u.password === password)
        if(user){
            alert("login successful!")
            window.open('dashboard.html', '_blank');
        }else{
            alert("Invalid email id or password");
        }
    })
    .catch(error =>
        console.log(error)
    )

    loginForm.reset();
})

signupForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const email = user_email.value; 
    const username = user_name.value;
    const password = user_password.value; 

    fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(users => {
        let user = users.find(u => u.email === email && u.username === username)
        if(!user){ 
            saveLoginCredentials(username, email, password);
        }else{
            alert("emailId is already in use | Please login");
        }
    })
    .catch(error =>
        console.log(error)
    )

    signupForm.reset();
})

function saveLoginCredentials(username, email, password){
    fetch('http://localhost:8080/', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({username, email, password})
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

    mainContainer.classList.remove('active');
}