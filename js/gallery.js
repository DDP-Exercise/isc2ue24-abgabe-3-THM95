// Funktion zum Wechseln des großen Bildes
function switchFullImage(imageUrl, imageDescription) {
    const fullImageElement = document.querySelector('#fullImage img');
    const figCaptionElement = document.querySelector('#fullImage figcaption');

    fullImageElement.src = imageUrl;
    fullImageElement.alt = imageDescription;
    figCaptionElement.textContent = imageDescription;
}

// Funktion zum Anzeigen eines zufälligen Bildes beim Start
function showRandomImageAtStart() {
    const thumbnailLinks = document.querySelectorAll('#thumbnails .card-link');
    const randomIndex = Math.floor(Math.random() * thumbnailLinks.length);
    const randomThumbnail = thumbnailLinks[randomIndex];
    const imageUrl = randomThumbnail.href;
    const imageDescription = randomThumbnail.querySelector('img').alt;

    switchFullImage(imageUrl, imageDescription);
    highlightActiveThumbnail(randomThumbnail);
    loadNotes(imageUrl);
}

// Funktion zum Hervorheben des aktiven Thumbnails
function highlightActiveThumbnail(activeThumbnail) {
    // Entferne die Hervorhebung von allen Karten
    const allCards = document.querySelectorAll('#thumbnails .card-body');
    allCards.forEach(card => {
        card.classList.remove('bg-dark', 'text-white');
    });

    // Füge die Hervorhebung zur aktiven Karte hinzu
    const activeCardBody = activeThumbnail.closest('.card').querySelector('.card-body');
    activeCardBody.classList.add('bg-dark', 'text-white');
}

// Funktion zum Vorbereiten der Links der Thumbnails
function prepareLinks() {
    const thumbnailLinks = document.querySelectorAll('#thumbnails .card-link');
    thumbnailLinks.forEach(thumbnailLink => {
        thumbnailLink.addEventListener('click', function(event) {
            event.preventDefault();

            const imageUrl = thumbnailLink.href;
            const imageDescription = thumbnailLink.querySelector('img').alt;

            switchFullImage(imageUrl, imageDescription);
            highlightActiveThumbnail(thumbnailLink);
            loadNotes(imageUrl);
        });
    });
}

// Funktion zum Speichern der Notizen im Local Storage
function storeNotes() {
    const notesElement = document.querySelector('#notes');
    const fullImageElement = document.querySelector('#fullImage img');
    const imageUrl = fullImageElement.src;

    if (notesElement.textContent.trim() === '') {
        localStorage.removeItem(imageUrl);
    } else {
        localStorage.setItem(imageUrl, notesElement.textContent);
    }
}

// Funktion zum Laden der Notizen aus dem Local Storage
function loadNotes(key) {
    const notesElement = document.querySelector('#notes');
    const storedNote = localStorage.getItem(key);

    if (storedNote) {
        notesElement.textContent = storedNote;
    } else {
        notesElement.textContent = 'Enter your notes here!';
    }
}

// Event Listener für das Speichern der Notizen beim Verlassen des Feldes
document.querySelector('#notes').addEventListener('blur', storeNotes);

// Initialisierung der Galerie
document.addEventListener('DOMContentLoaded', () => {
    showRandomImageAtStart();
    prepareLinks();
});
