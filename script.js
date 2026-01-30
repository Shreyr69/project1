let currentPage = 1;
let itemsPerPage = 10;
let allProducts = [];

const productContainer = document.getElementById("products");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

async function fetchProducts() {

    if (!productContainer) return;

    try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
        const data = await response.json();

        allProducts = data.products;

        renderPage();

    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

function renderPage() {
    productContainer.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let pageItems = allProducts.slice(start, end);

    pageItems.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="price">₹ ${product.price}</div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        productContainer.appendChild(card);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    if (!pageInfo) return;

    let totalPages = Math.ceil(allProducts.length / itemsPerPage);

    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

if (prevBtn && nextBtn) {

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });

    nextBtn.addEventListener("click", () => {
        let totalPages = Math.ceil(allProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPage();
        }
    });
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

            card.addEventListener("click", () => {
                window.location.href = `product.html?id=${product.id}`;
            });

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

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) &&
            !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = "none";
        }
    });
}
