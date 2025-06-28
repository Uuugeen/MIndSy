document.addEventListener('DOMContentLoaded', function() {
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