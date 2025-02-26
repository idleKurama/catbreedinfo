document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => response.json())
        .then(data => {
            displayBreeds(data);
            document.getElementById("cat-container").style.display = "flex";
        });
});

function displayBreeds(breeds) {
    const container = document.getElementById("cat-container");
    breeds.forEach(breed => {
        if (breed.reference_image_id) {
            fetch(`https://api.thecatapi.com/v1/images/${breed.reference_image_id}`)
                .then(response => response.json())
                .then(imageData => {
                    const imageUrl = imageData.url || "";
                    const card = document.createElement("div");
                    card.className = "card";
                    card.innerHTML = `
                        <img src="${imageUrl}" alt="${breed.name}">
                        <h3>${breed.name}</h3>
                    `;
                    card.onclick = () => showDetails(breed, imageUrl);
                    container.appendChild(card);
                });
        }
    });
}

function showDetails(breed, imageUrl) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <img id="breed-image" src="${imageUrl}" alt="Breed Image">
            <h2 id="breed-name">${breed.name}</h2>
            <p><strong>Origin:</strong> <span id="breed-origin">${breed.origin}</span></p>
            <p><strong>Temperament:</strong> <span id="breed-temperament">${breed.temperament}</span></p>
            <p><strong>Life Span:</strong> <span id="breed-lifespan">${breed.life_span}</span></p>
            <p id="breed-description">${breed.description}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.remove();
}