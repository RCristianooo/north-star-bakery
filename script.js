// Favorites feature
const products = [
    { id: "sourdough", name: "Sourdough Loaf" },
    { id: "signature", name: "Signature Loaf" },
    { id: "croissants", name: "Croissants" },
    { id: "muffins", name: "Muffins" },
    { id: "scones", name: "Scones" },
    { id: "cinnamon-rolls", name: "Cinnamon Rolls" },
    { id: "sponge-cakes", name: "Sponge Cakes" },
    { id: "layer-cakes", name: "Layer Cakes" },
    { id: "cupcakes", name: "Cupcakes" },
    { id: "bundt-cakes", name: "Bundt Cakes" }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updatePage();
}

function updatePage() {
    const buttons = document.querySelectorAll(".favorite");
    const list = document.getElementById("favorites");

    buttons.forEach(button => {
        const id = button.parentElement.dataset.product;

        if (favorites.includes(id)) {
            button.textContent = "Favorited";
        } else {
            button.textContent = "Add to Favorites";
        }
    });

    if (list) {
        if (favorites.length === 0) {
            list.innerHTML = "<li>No favorites yet.</li>";
        } else {
            list.innerHTML = "";

            favorites.forEach(id => {
                const product = products.find(item => item.id === id);
                list.innerHTML += `<li>${product.name}</li>`;
            });
        }
    }
}

document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", function () {
        const id = this.parentElement.dataset.product;
        toggleFavorite(id);
    });
});

updatePage();


// Form validation

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const details = document.getElementById("item-details");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const detailsError = document.getElementById("details-error");

        let valid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        detailsError.textContent = "";

        if (name.value.trim().length < 2) {
            nameError.textContent = "Please enter at least 2 characters.";
            valid = false;
        }

        if (email.value.trim() === "" || !email.value.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (details.value.trim().length < 10) {
            detailsError.textContent = "Please enter at least 10 characters.";
            valid = false;
        }

        if (valid) {
            alert("Your request has been submitted!");
            form.reset();
        }
    });
}