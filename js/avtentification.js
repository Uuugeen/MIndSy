
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
            localStorage.setItem('currentUser', JSON.stringify({username, email, password})); 
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
    const modalContainer = document.getElementById('modal-conteiner')
    const body = document.querySelector('body'); 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (profileButton) {
        profileButton.addEventListener("click", () => {
            modal.style.opacity = 1;
            modal.style.visibility = 'visible';
            body.style.overflow = 'hidden';
            modalContainer.style.maxWidth = '30rem' ;
            modalContent.innerHTML = '';
            modalContent.innerHTML = `
                <h3 style="margin-bottom:5rem;">User Profile: ${currentUser.username}</h3>
                <div class="profile-content" style="display:flex; flex-direction:column; gap:1.5rem;" >
                    <p style="font-size:20px">Email: ${currentUser.email}</p>
                    <button class="change-info" id="change-info">Change Infotmation</button>
                    <button class="my-projects" id="my-projects"><a href="/html/editor.html">My projects</a></button>
                    <button class="log-out" id="log-out">Logout</button>
                </div>
                
            `;

            logOut();
            changeInfo();
        });

        


    }
}


function logOut() {
    const logOutButton = document.getElementById("log-out");

    const modal = document.getElementById('modal');
    const modalContainer = document.getElementById('modal-conteiner')
    const body = document.querySelector('body'); 

    logOutButton.addEventListener('click', function(e) {
        

        if (logOutButton) {
            // Видаляємо користувача
            localStorage.removeItem('currentUser');
                
            showMessage("You have been logged out.");

            const avtentification = document.getElementById('avtentification');
            avtentification.innerHTML = `
            <button class="login-button" id="login-button">Login</button>
            <button class="register-button" id="register-button">Register</button>
            `;

            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
            body.style.overflow = 'auto';
            modalContainer.style.maxWidth = '23rem' ;
                
            avtentificationButtons();

        }


    });
}


function changeInfo() {
    const changeInfoButton = document.getElementById("change-info");
    const modalContent = document.getElementById("modal-content");
    const modal = document.getElementById('modal');
    const modalContainer = document.getElementById('modal-conteiner');
    const body = document.querySelector('body'); 

    if (!changeInfoButton) return;

    changeInfoButton.addEventListener("click", () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        modalContainer.style.maxWidth = '23rem';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        body.style.overflow = 'hidden';

        modalContent.innerHTML = `
            <h3 style="margin-bottom:3rem;">Please input your password</h3>
            <form id="verifyPasswordForm">
                <input type="password" placeholder="Your current password" id="current-password" name="password" required>
                <button type="submit" id="verifyButton">Verify</button>
            </form>
        `;

        const verifyForm = document.getElementById("verifyPasswordForm");
        verifyForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const enteredPassword = document.getElementById("current-password").value;
            if (enteredPassword !== currentUser.password) {
                showMessage("Incorrect password");
                return;
            }

            // Відображення форми зміни даних
            modalContent.innerHTML = `
                <h3 style="margin-bottom:3rem;">Change Information</h3>
                <form id="changeInfoForm">
                    <label>Your new email:</label>
                    <input type="email" id="new-email" name="new email" value="${currentUser.email}" required>
                    <label>Your new password:</label>
                    <input type="text" id="new-password" name="new password" value="${currentUser.password}" required>
                    <br>
                    <button type="submit" id="changeSubmitButton">Submit</button>
                </form>
            `;

            const changeForm = document.getElementById("changeInfoForm");
            changeForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const newEmail = document.getElementById("new-email").value.trim();
                const newPassword = document.getElementById("new-password").value.trim();

                // Оновлюємо поточного користувача
                const updatedUser = {
                    ...currentUser,
                    email: newEmail,
                    password: newPassword
                };

                // Оновлюємо масив користувачів у localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const updatedUsers = users.map(user =>
                    user.email === currentUser.email ? updatedUser : user
                );
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                showMessage("Information updated");
                setTimeout(() => {
                    modal.style.opacity = '0';
                    modal.style.visibility = 'hidden';
                    body.style.overflow = 'auto';
                }, 2000);
            });
        });
    });
}
