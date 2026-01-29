async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        const container = document.getElementById("products");

        data.products.slice(0, 8).forEach(product => {
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
