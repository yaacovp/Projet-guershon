document.addEventListener("DOMContentLoaded", function() {
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated !== 'true') {
        window.location.href = 'login.html';
    }
});
