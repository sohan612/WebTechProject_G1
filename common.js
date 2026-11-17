
// Smart Bazaaar Common JavaScript
// revised common function

const CART_KEY = "sms_cart";


// Get Product Data

function getProducts() {

    return JSON.parse(
        localStorage.getItem("sms_products")
    ) || [];

}


// Get Cart Data

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


// Save Cart Data

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


// Update Navigation Cart Count

function updateCartCount() {

    let cart = getCart();

    let totalItems = 0;

    cart.forEach(function(item) {

        totalItems += Number(item.quantity) || 0;

    });

    let cartCount = document.getElementById("navCartCount");

    if (cartCount) {

        cartCount.textContent = totalItems;

    }

}


// Add Product To Cart

function addToCart(productId) {

    let products = getProducts();

    let product = products.find(function(item) {

        return String(item.id) === String(productId);

    });

    if (!product) {

        alert("Product not found!");

        return;

    }

    let cart = getCart();

    let existingProduct = cart.find(function(item) {

        return String(item.id) === String(productId);

    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: Number(product.price),
            category: product.category,
            image: product.image || "",
            quantity: 1

        });

    }

    saveCart(cart);

    alert("Product added to cart successfully!");

}


// Mobile Navigation Menu

let menuToggle = document.getElementById("menuToggle");

let mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function() {

        mainNav.classList.toggle("show");

    });

}


// Update Cart Count When Page Loads

updateCartCount();


// Update Cart Count When Another Tab Changes Cart

window.addEventListener("storage", function() {

    updateCartCount();

});
