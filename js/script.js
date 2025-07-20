
import { innit } from './core.js';


document.addEventListener('DOMContentLoaded', function() {
    renderComments()
    comments();
    animateFooter();
    innit(); 

    const TOGGLE_THEME = document.getElementById('theme-switch');
    const THEME_LABEL = document.getElementById('theme-label');

    // Зчитування теми з localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        THEME_LABEL.innerText = 'Light Mode';
        TOGGLE_THEME.checked = true;
    }else THEME_LABEL.innerText = 'Dark Mode';

  // Перемикання теми
    TOGGLE_THEME.addEventListener('change', function () {
        const isDark = TOGGLE_THEME.checked;
        document.body.classList.toggle('dark-theme', isDark);
        THEME_LABEL.innerText = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});


export function showMessage(message) {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modalMessage.style.opacity = '1';
    setTimeout(() => {
        modalMessage.style.opacity = '0';
    }, 2000);
}

function comments() {
    const comentForm = document.getElementById("commentForm");

    comentForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        let commentName = document.getElementById("nameCommentInput").value;
        let commentValue = document.getElementById("commentInput").value;

        if (commentName && commentValue){
            const comments = JSON.parse(localStorage.getItem("comments")) || [];
            comments.unshift({ username: commentName, commentText: commentValue });
            localStorage.setItem("comments", JSON.stringify(comments));
            renderComments()
            comentForm.reset();
        } else {
            showMessage("Complete all fields");
        }

        

    });
   
}

function renderComments() {
    const showComments = document.getElementById("see-comments");
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const lastThree = comments.slice(0, 3);

    showComments.innerHTML= "";

    lastThree.forEach(comment => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${comment.username}</strong>:<p> ${comment.commentText}</p>`;
        showComments.appendChild(div);
    });

}

function animateFooter() {
    const target = document.getElementById("footer");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target); 
            }
            else {
                entry.target.classList.remove("animate");
            }
        });
    });

    if (target) observer.observe(target);
}

