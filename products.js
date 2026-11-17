
// Smart Bazaaar Products JavaScript

document.addEventListener("DOMContentLoaded", function() {

    // Get HTML Elements

    let allProducts = document.getElementById("allProducts");

    let searchInput = document.getElementById("searchInput");

    let categoryFilter = document.getElementById("categoryFilter");

    let productCount = document.getElementById("productCount");

    let noProducts = document.getElementById("noProducts");


    // Get Products from LocalStorage

    function getProducts() {

        return JSON.parse(
            localStorage.getItem("sms_products")
        ) || [];

    }


    // Display Products

    function displayProducts(productList) {

        allProducts.innerHTML = "";

        productCount.textContent = productList.length;

        if (productList.length === 0) {

            noProducts.style.display = "block";

            return;

        }

        noProducts.style.display = "none";


        productList.forEach(function(product) {

            let card = document.createElement("div");

            card.className = "product-card";


            // Product Image

            let visual = document.createElement("div");

            visual.className = "product-visual";

            if (product.image) {

                let img = document.createElement("img");

                img.src = product.image;

                img.alt = product.name;

                img.onerror = function() {

                    img.style.display = "none";

                };

                visual.appendChild(img);

            } else {

                let icon = document.createElement("span");

                icon.textContent = product.icon || "🛍️";

                visual.appendChild(icon);

            }


            // Product Information

            let info = document.createElement("div");

            info.className = "product-info";


            let category = document.createElement("p");

            category.className = "product-category";

            category.textContent = product.category || "Others";


            let name = document.createElement("h3");

            name.textContent = product.name;


            let description = document.createElement("p");

            description.className = "product-description";

            description.textContent =
                product.description || "Quality product.";


            // Price and Button

            let bottom = document.createElement("div");

            bottom.className = "product-bottom";


            let price = document.createElement("h3");

            price.className = "product-price";

            price.textContent =
                "৳" + Number(product.price).toFixed(2);


            let button = document.createElement("button");

            button.className = "add-cart-btn";

            button.textContent = "Add to Cart";

            button.type = "button";

            button.dataset.id = product.id;


            bottom.appendChild(price);

            bottom.appendChild(button);


            info.appendChild(category);

            info.appendChild(name);

            info.appendChild(description);

            info.appendChild(bottom);


            card.appendChild(visual);

            card.appendChild(info);


            allProducts.appendChild(card);

        });

    }


    // Search and Category Filter

    function filterProducts() {

        let products = getProducts();

        let searchText = searchInput.value.toLowerCase();

        let selectedCategory = categoryFilter.value;


        let filteredProducts = products.filter(function(product) {

            let matchName =
                product.name.toLowerCase().includes(searchText);

            let matchCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            return matchName && matchCategory;

        });

        displayProducts(filteredProducts);

    }


    // Search Event

    searchInput.addEventListener("input", filterProducts);


    // Category Event

    categoryFilter.addEventListener("change", filterProducts);


    // Add to Cart

    allProducts.addEventListener("click", function(event) {

        if (event.target.classList.contains("add-cart-btn")) {

            let productId = event.target.dataset.id;

            addToCart(productId);

        }

    });


    // Initial Display

    displayProducts(getProducts());

});
