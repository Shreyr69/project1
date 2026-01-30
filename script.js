async function fetchProducts() {
    const container = document.getElementById("products");
    if (!container) return; 

    try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
        const data = await response.json();

        data.products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="product-title">${product.title}</div>
                <div class="price">₹ ${product.price}</div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

fetchProducts();


async function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    const container = document.getElementById("searchResults");

    if (!searchInput || !container) return;

    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await response.json();

        container.innerHTML = "";

        data.products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="product-title">${product.title}</div>
                <div class="price">₹ ${product.price}</div>
            `;

            container.appendChild(card);
        });

        let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

        const exists = history.some(item => item.query === query);

        if (!exists) {
            history.push({
                query: query,
                time: Date.now()
            });

            localStorage.setItem("searchHistory", JSON.stringify(history));
        }

    } catch (error) {
        console.log("Error searching products:", error);
    }
}


const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

if (searchInput && suggestionsBox) {

    searchInput.addEventListener("input", () => {
        const text = searchInput.value.trim().toLowerCase();

        if (!text) {
            suggestionsBox.style.display = "none";
            return;
        }

        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

        const matches = history.filter(item =>
            item.query.toLowerCase().includes(text)
        );

        suggestionsBox.innerHTML = "";

        matches.slice(0, 5).forEach(item => {
            const suggestion = document.createElement("div");
            suggestion.textContent = item.query;
            suggestion.className = "suggestion-item";

            suggestion.addEventListener("click", () => {
                searchInput.value = item.query;
                suggestionsBox.style.display = "none";
                searchProducts();
            });

            suggestionsBox.appendChild(suggestion);
        });

        suggestionsBox.style.display = matches.length ? "block" : "none";
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) &&
            !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = "none";
        }
    });
}
