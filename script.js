document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('copyEmailButton').addEventListener('click', function() {
        const email = "perezyaacov9@gmail.com";
        navigator.clipboard.writeText(email).then(function() {
            alert('L\'adresse e-mail a été copiée dans le presse-papier !');
        }, function(err) {
            console.error('Erreur lors de la copie du texte : ', err);
        });
    });

    document.getElementById('copyPhoneButton').addEventListener('click', function() {
        const phone = "+33 6 12 34 56 78";
        navigator.clipboard.writeText(phone).then(function() {
            alert('Le numéro de téléphone a été copié dans le presse-papier !');
        }, function(err) {
            console.error('Erreur lors de la copie du texte : ', err);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('nav a');
    
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
    
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    });
    
    document.getElementById('copyMessageButton').addEventListener('click', function() {
        const message = document.getElementById('preconfiguredMessage').innerText;
        navigator.clipboard.writeText(message).then(function() {
            alert('Le message a été copié dans le presse-papier !');
        }, function(err) {
            console.error('Erreur lors de la copie du texte : ', err);
        });
    });
});
