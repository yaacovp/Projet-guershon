document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('login-form');
    const correctPassword = '1234'; // Remplacez par le mot de passe que vous souhaitez utiliser

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;

        if (password === correctPassword) {
            localStorage.setItem('authenticated', 'true');
            window.location.href = 'add-event.html';
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });
});
