document.addEventListener("DOMContentLoaded", function() {
    const eventsList = document.getElementById('events-list');
    const noEventsMessage = document.getElementById('no-events-message');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3); // Calculer la date de trois jours avant aujourd'hui

    // Filtrer les événements pour supprimer ceux qui sont passés de plus de trois jours
    events = events.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0); // Reset time to start of the day
        return eventDate >= threeDaysAgo;
    });

    // Mettre à jour le localStorage avec les événements filtrés
    localStorage.setItem('events', JSON.stringify(events));

    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';

    if (events.length === 0) {
        noEventsMessage.style.display = 'block';
    } else {
        noEventsMessage.style.display = 'none';

        // Afficher les événements
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${event.date}</strong> - ${event.title}
                <p>${event.description}</p>
                ${event.photo ? `<a href="${event.photo}" class="lightbox"><img src="${event.photo}" alt="${event.title}"></a>` : ''}
                <div class="social-share">
                    <!-- <a href="#" class="facebook-share" target="_blank">Partager sur Facebook</a>
                    <a href="#" class="twitter-share" target="_blank">Partager sur Twitter</a>
                    <a href="#" class="instagram-share">Partager sur Instagram</a> -->
                </div>
                ${isAuthenticated ? `<button class="delete-event" data-index="${index}">Supprimer l'événement</button>` : ''}
            `;
            eventsList.appendChild(li);
        });
    }

    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('.lightbox');
    images.forEach(image => {
        image.addEventListener('click', e => {
            e.preventDefault();
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.href;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });

    // Partage sur les réseaux sociaux
    /*const facebookShares = document.querySelectorAll('.facebook-share');
    const twitterShares = document.querySelectorAll('.twitter-share');
    const instagramShares = document.querySelectorAll('.instagram-share');
    const currentUrl = window.location.href;

    facebookShares.forEach(share => {
        share.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    });

    twitterShares.forEach(share => {
        share.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=Découvrez cet événement !`;
    });

    instagramShares.forEach((share, index) => {
        share.addEventListener('click', function(e) {
            e.preventDefault();
            const event = events[index];
            if (event.photo) {
                const url = `https://www.instagram.com/stories/create/?url=${encodeURIComponent(event.photo)}`;
                window.open(url, '_blank');
            } else {
                alert("Aucune photo disponible pour partager sur Instagram.");
            }
        });
    });*/

    
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            alert('Vous avez été déconnecté.');
            window.location.href = 'index.html'; // Redirigez vers la page d'accueil ou une autre page
        });
    }

    // Suppression des événements
    if (isAuthenticated) {
        const deleteButtons = document.querySelectorAll('.delete-event');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                events.splice(index, 1);
                localStorage.setItem('events', JSON.stringify(events));
                window.location.reload();
            });
        });
    }
});
