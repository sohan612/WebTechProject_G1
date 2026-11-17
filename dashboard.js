
// Smart Bazaaar Dashboard JavaScript

document.addEventListener("DOMContentLoaded", function() {

    // HTML Elements

    let totalProducts = document.getElementById("totalProducts");

    let totalCategories = document.getElementById("totalCategories");

    let totalCartItems = document.getElementById("totalCartItems");

    let totalCartValue = document.getElementById("totalCartValue");

    let totalSales = document.getElementById("totalSales");

    let totalSoldItems = document.getElementById("totalSoldItems");

    let totalQuantity = document.getElementById("totalQuantity");

    let recentProducts = document.getElementById("recentProducts");


    // Update Dashboard

    function updateDashboard() {

        let products = getProducts();

        let cart = getCart();

        let sales = JSON.parse(
            localStorage.getItem("sms_sales")
        ) || [];


        // Total Products

        totalProducts.textContent = products.length;


        // Total Categories

        let categories = [];

        products.forEach(function(product) {

            if (!categories.includes(product.category)) {

                categories.push(product.category);

            }

        });

        totalCategories.textContent = categories.length;


        // Cart Statistics

        let cartCount = 0;

        let cartValue = 0;

        cart.forEach(function(item) {

            let quantity = Number(item.quantity) || 0;

            let price = Number(item.price) || 0;

            cartCount += quantity;

            cartValue += price * quantity;

        });

        totalCartItems.textContent = cartCount;

        totalCartValue.textContent = "৳" + cartValue.toFixed(2);


        // Sales Statistics

        let salesAmount = 0;

        let soldItems = 0;

        let soldQty = 0;

        sales.forEach(function(sale) {

            salesAmount += Number(sale.total) || 0;

            sale.items.forEach(function(item) {

                soldItems++;

                soldQty += Number(item.quantity) || 0;

            });

        });

        totalSales.textContent = "৳" + salesAmount.toFixed(2);

        totalSoldItems.textContent = soldItems;

        totalQuantity.textContent = soldQty;

    }


    // Display Recent Products

    function displayRecentProducts() {

        let products = getProducts();

        recentProducts.innerHTML = "";

        let recent = products.slice(-4).reverse();

        if (recent.length === 0) {

            recentProducts.innerHTML = "<p>No Products Available!</p>";

            return;

        }

        recent.forEach(function(product) {

            let card = document.createElement("div");

            card.className = "product-card";

            let visual = document.createElement("div");

            visual.className = "product-visual";

            if (product.image) {

                let img = document.createElement("img");

                img.src = product.image;

                img.alt = product.name;

                visual.appendChild(img);

            } else {

                let icon = document.createElement("span");

                icon.textContent = product.icon || "🛍️";

                visual.appendChild(icon);

            }

            let info = document.createElement("div");

            info.className = "product-info";

            let category = document.createElement("p");

            category.className = "product-category";

            category.textContent = product.category;

            let name = document.createElement("h3");

            name.textContent = product.name;

            let description = document.createElement("p");

            description.className = "product-description";

            description.textContent = product.description || "";

            let bottom = document.createElement("div");

            bottom.className = "product-bottom";

            let price = document.createElement("h3");

            price.className = "product-price";

            price.textContent = "৳" + product.price;

            let button = document.createElement("button");

            button.className = "add-cart-btn";

            button.dataset.id = product.id;

            button.type = "button";

            button.textContent = "Add to Cart";

            bottom.appendChild(price);

            bottom.appendChild(button);

            info.appendChild(category);

            info.appendChild(name);

            info.appendChild(description);

            info.appendChild(bottom);

            card.appendChild(visual);

            card.appendChild(info);

            recentProducts.appendChild(card);

        });

    }


    // Add To Cart Event

    recentProducts.addEventListener("click", function(event) {

        if (event.target.classList.contains("add-cart-btn")) {

            let productId = event.target.dataset.id;

            addToCart(productId);

            updateDashboard();

        }

    });


    // Load Dashboard

    updateDashboard();

    displayRecentProducts();


    // Update When LocalStorage Changes

    window.addEventListener("storage", function() {

        updateDashboard();

        displayRecentProducts();

    });

});
