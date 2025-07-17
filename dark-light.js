const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    body.classList.toggle('dark');
    themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
});