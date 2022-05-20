var hiddenClass = "form--hidden";

function loginForm() {
    return document.forms["login"];
};

function createAccountForm() {
    return document.forms["createAccount"];
}

function logoutForm(){
    return document.querySelector('#logout');
}

function toggleCreateAccountLoginForms () {
    document.querySelector("#linkCreateAccount").addEventListener("click", e=> {
    e.preventDefault();
    loginForm().classList.add( hiddenClass)
    createAccountForm().classList.remove( hiddenClass)
    });

    document.querySelector("#linkLogin").addEventListener("click", e=>{
    e.preventDefault();
    loginForm().classList.remove( hiddenClass)
    createAccountForm().classList.add(hiddenClass)
    });
}

function storingCreatAccountDetails(){
    createAccountForm().addEventListener("submit", (event) => {
        event.preventDefault();
        let  inputs = document.querySelectorAll("#createAccount input");
    
        //check if passwords match 
        let passwordArray = [];
        let username = "";
        let email = "";
        inputs.forEach( input => {
            if (input.name === "password" || input.name === "password-confirm"){
                passwordArray.push(input.value)
            }

            if (input.name === "username"){
                username = input.value
            }

            if (input.name === "email"){
                email = input.value
            }            
        });

       
        //saves information
        if (passwordArray[0] === passwordArray[1]){

            fetch('http://localhost:4567/api/v1/user', {
                method: 'PUT', 
                body: JSON.stringify({'username': username, 'email': email, 'password': passwordArray[0]})
            })
            .then(response => response.json())
            .then(data => console.log(data));

            // inputs.forEach( input => {
            //     localStorage.setItem(input.name, input.value);
            // });

            // loginForm().classList.remove( hiddenClass)
            // createAccountForm().classList.add( hiddenClass)
            // console.log(localStorage)
        }
        else {
            let messageElement = document.querySelector(".create-account-error")
            messageElement.textContent = "Password does not match. Please Try again."
        }
    })
}

function saveLoginInformation (){
    loginForm().addEventListener("submit", (event) => {
        event.preventDefault();

        let informationArray = [];
        let  inputs = document.querySelectorAll("#login input");
        inputs.forEach( input => {
            informationArray.push(input.value);
        });

        if (localStorage.getItem("username") === informationArray[0] && localStorage.getItem("password") === informationArray[1]){
            let messageElement = document.querySelector(".login-error")
            messageElement.textContent = ""

            sessionStorage.setItem("login successful", localStorage.getItem("username"))
            console.log(sessionStorage);

            loginForm().classList.add(hiddenClass)
            logoutForm().classList.remove(hiddenClass)


        }
        else {
            let messageElement = document.querySelector(".login-error")
            messageElement.textContent = "Invalid username or password."
         }
    });
}

function formWhileLoggedIn(){
    if (sessionStorage.length > 1){
        loginForm().classList.add(hiddenClass)
        logoutForm().classList.remove(hiddenClass)

            logoutForm().addEventListener("submit", e =>{
                e.preventDefault();
                sessionStorage.clear();
                loginForm().classList.remove(hiddenClass)
                logoutForm().classList.add(hiddenClass)

            //clear input values
                const inputValues = document.querySelectorAll(".form-input")
                inputValues.forEach(input => {
                input.value = '';
            })
            });
    }
}

let functionArray = [toggleCreateAccountLoginForms, storingCreatAccountDetails, saveLoginInformation, formWhileLoggedIn];

for (i = 0; i < functionArray.length; i++){
    document.addEventListener("DOMContentLoaded", functionArray[i]);
}

// document.addEventListener("DOMContentLoaded", toggleCreateAccountLoginForms);
// document.addEventListener("DOMContentLoaded", storingCreatAccountDetails);
// document.addEventListener("DOMContentLoaded", saveLoginInformation);
// document.addEventListener("DOMContentLoaded", formWhileLoggedIn);
