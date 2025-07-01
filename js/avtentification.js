
import { showMessage } from "./script.js";


 export function avtentificationButtons() {
    const modalContent = document.getElementById('modal-content');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const body = document.querySelector('body');   
    
    

    // Відкриття модального вікна для логіну
    loginButton.addEventListener('click', () => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        body.style.overflow = 'hidden'; 
        modalContent.innerHTML = "";
        modalContent.innerHTML =  `
            <h3>Login</h3>
            <form id="login-form">
                <label for="username">User name:</label>
                <input type="text" id="username" name="username" required>
                <label for="emeil">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit" id="loginButton">Login</button>
            </form id="login-form">
            <span id="register-link"><a>Don't have an account? <span style="color:blue;">Register</span></a></span>
            
        `;

        handleAuthSubmit("login-form",  true);


        const registerLink = document.getElementById('register-link');

        // Перемикання між формами логіну та реєстрації
        registerLink.addEventListener('click', () => {
            if (registerLink) {
                modalContent.innerHTML = "";
                modalContent.innerHTML = `
                <h3>Register</h3>
                <form id="register-form">
                    <label for="username">User name:</label>
                    <input type="text" id="username" name="username" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <button type="submit" id="registerButton">Register</button>
                </form id="register-form">
                
                
            `;
            handleAuthSubmit("register-form",  false);
            } else {
                console.log('Register link not found');
            }
            
        });
    });

    // Відкриття модального вікна для реєстрації
    registerButton.addEventListener('click', () => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        body.style.overflow = 'hidden'; 
        modalContent.innerHTML = "";
        modalContent.innerHTML = `
            <h3>Register</h3>
            <form id="register-form">
                <label for="username">User name:</label>
                <input type="text" id="username" name="username" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit" id="registerButton">Register</button>
            </form id="register-form">
            
        `;
        handleAuthSubmit("register-form", false);
    });

    // Закриття модального вікна
    closeModal.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        body.style.overflow = 'auto'; 
    });

}


function validateFormData(username, email, password) {
    if (!username || !email || !password) {
        showMessage("Please fill in all fields.");
        return false;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showMessage("Invalid email.");
        return false;
    }

    return true;
}

function handleAuthSubmit(formId, isLogin = false) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = form.querySelector('#username').value.trim();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();

        const avtentification = document.getElementById("avtentification")

        if (!validateFormData(username, email, password)) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (isLogin) {
            const foundUser = users.find(user => user.email === email && user.password === password);
            if (!foundUser) {
                showMessage("Invalid credentials");
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            showMessage("Login successful");
            localStorage.setItem('currentUser', JSON.stringify(foundUser));  
            checkAuth(); // одразу рендерить кнопку

        } else {
            if (users.find(user => user.email === email)) {
                showMessage("User already exists");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            showMessage("Registration successful");
            console.log({username, email, password})
            localStorage.setItem('currentUser', JSON.stringify(foundUser));  
            checkAuth(); // одразу рендерить кнопку

        }

        // Закриття модального вікна
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        body.style.overflow = 'auto';
    });
}

export function checkAuth() {
    const avtentification = document.getElementById("avtentification");
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        avtentification.innerHTML = `
            <button class="avtentification-button" id="avtentification-button">
                ${currentUser.username}
            </button>
        `;
        profileUser()
    }
}

function profileUser() {
    const profileButton = document.getElementById("avtentification-button")
    const modalContent = document.getElementById('modal-content');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const body = document.querySelector('body'); 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (profileButton) {
        profileButton.addEventListener("click", () => {
            modal.style.opacity = 1;
            modal.style.visibility = 'visible';
            body.style.overflow = 'hidden';
            modalContent.innerHTML = '';
            modalContent.innerHTML = `
                <h3>User Profile: ${currentUser.username}</h3>
                <div>
                </div>
            `;
        });
    }
}