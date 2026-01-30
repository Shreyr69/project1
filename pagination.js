let currentPage = 1;
let itemsPerPage = 12;
let allProducts = [];

let container = document.getElementById("productList");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let pageInfo = document.getElementById("pageInfo");


fetch('https://dummyjson.com/products?limit=100')
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;

        if (allProducts.length === 0) {
            container.innerHTML = '<p>No products available.</p>';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            pageInfo.style.display = 'none';
            return;
        }

        renderPage();
    });

function renderPage() {
    container.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let pageItems = allProducts.slice(start, end);

    pageItems.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₹ ${product.price}</p>
        `;

        container.appendChild(card);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    let totalPages = Math.ceil(allProducts.length / itemsPerPage);

    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

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
