
// Smart Bazaaar Home Page JavaScript

let featuredProducts = document.getElementById("featuredProducts");


// Display Featured Products
function displayFeaturedProducts() {

    if (!featuredProducts) {

        return;

    }

    let products = window.shopProducts.slice(0, 4);

    featuredProducts.innerHTML = "";

    products.forEach(function(product) {

        featuredProducts.innerHTML += `

            <div class="product-card">

                <div class="product-visual">
                    <span>${product.icon}</span>
                </div>

                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <h3 class="product-price">
                            ৳${product.price}
                        </h3>

                        <button
                            class="add-cart-btn"
                            data-id="${product.id}"
                            type="button">

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// Add To Cart Button Event
if (featuredProducts) {

    featuredProducts.addEventListener("click", function(event) {

        if (event.target.classList.contains("add-cart-btn")) {

            let productId = Number(event.target.dataset.id);

            addToCart(productId);

        }

    });

}


// Load Featured Products
displayFeaturedProducts();
