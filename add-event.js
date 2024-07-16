document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('add-event-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;
        const photo = document.getElementById('event-photo').files[0];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of the day
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0); // Reset time to start of the day

        // Vérifier si la date de l'événement est dans le passé
        if (eventDate < today) {
            alert('La date de l\'événement ne peut pas être dans le passé.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function() {
            const eventData = {
                title: title,
                date: date,
                description: description,
                photo: reader.result
            };

            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.push(eventData);
            localStorage.setItem('events', JSON.stringify(events));

            alert('Événement ajouté avec succès!');
            form.reset();
        };

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            reader.onload();
        }
    });
});
