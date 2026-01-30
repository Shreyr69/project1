let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

console.log("Product ID from URL:", productId);

fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        console.log("Fetched Product:", product);

        document.getElementById("brand").innerText = product.brand;
        document.getElementById("title").innerText = product.title;
        document.getElementById("productImage").src = product.thumbnail;
        document.getElementById("description").innerText = product.description;
        document.getElementById("price").innerText = `₹ ${product.price}`;
        document.getElementById("availability").innerText = product.availabilityStatus;
        document.getElementById("discount").innerText = `${product.discountPercentage}% off`;
        document.getElementById("sku").innerText = `SKU: ${product.sku}`;
        document.getElementById("category").innerText = product.category;
        document.getElementById("weight").innerText = `${product.weight} kg`;
        document.getElementById("warranty").innerText = product.warranty ? "Yes" : "No";
        document.getElementById("returnable").innerText = product.returnable ? "Yes" : "No";
        document.getElementById("rating").innerText = `Rating: ${product.rating} / 5`;
        document.getElementById("shipping").innerText = product.shipping ? "Free Shipping" : "Shipping Charges Apply";


        let viewedHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

        const alreadyViewed = viewedHistory.some(item => item.id === product.id);

        if (!alreadyViewed) {
            viewedHistory.push({
                id: product.id,
                title: product.title,
                time: Date.now()
            });

            localStorage.setItem("viewHistory", JSON.stringify(viewedHistory));
        }


    })
    .catch(error => {
        console.log("Error fetching product details:", error);
    });