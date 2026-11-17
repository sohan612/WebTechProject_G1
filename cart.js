
// Smart Bazaaar Cart JavaScript

document.addEventListener("DOMContentLoaded", function() {

    // Get HTML Elements

    let cartItems = document.getElementById("cartItems");
    let totalItems = document.getElementById("totalItems");
    let totalAmount = document.getElementById("totalAmount");
    let clearCartBtn = document.getElementById("clearCartBtn");
    let checkoutBtn = document.getElementById("checkoutBtn");


    // Get Cart Data

    let cart = getCart();


    // Display Cart Products

    function displayCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let count = 0;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <h3>Your Cart is Empty!</h3>
                    <p>Please add some products.</p>
                </div>
            `;

        }

        cart.forEach(function(item) {

            let price = Number(item.price) || 0;
            let quantity = Number(item.quantity) || 1;

            total += price * quantity;
            count += quantity;


            let div = document.createElement("div");
            div.className = "cart-item";


            let details = document.createElement("div");


            let name = document.createElement("h3");
            name.textContent = item.name;


            let priceText = document.createElement("p");
            priceText.textContent = "Price: ৳" + price.toFixed(2);


            // Quantity Controls

            let quantityControl = document.createElement("div");
            quantityControl.className = "quantity-control";


            let minusBtn = document.createElement("button");
            minusBtn.textContent = "-";

            minusBtn.addEventListener("click", function() {
                updateQuantity(item.id, -1);
            });


            let quantityText = document.createElement("span");
            quantityText.textContent = quantity;


            let plusBtn = document.createElement("button");
            plusBtn.textContent = "+";

            plusBtn.addEventListener("click", function() {
                updateQuantity(item.id, 1);
            });


            quantityControl.appendChild(minusBtn);
            quantityControl.appendChild(quantityText);
            quantityControl.appendChild(plusBtn);


            details.appendChild(name);
            details.appendChild(priceText);
            details.appendChild(quantityControl);


            // Remove Button

            let removeBtn = document.createElement("button");

            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";

            removeBtn.addEventListener("click", function() {
                removeItem(item.id);
            });


            div.appendChild(details);
            div.appendChild(removeBtn);

            cartItems.appendChild(div);

        });


        totalItems.textContent = count;
        totalAmount.textContent = "৳" + total.toFixed(2);

        updateCartCount();

    }


    // Update Quantity

    function updateQuantity(id, change) {

        let item = cart.find(function(product) {
            return String(product.id) === String(id);
        });

        if (item) {

            item.quantity = Number(item.quantity) + change;

            if (item.quantity <= 0) {

                removeItem(id);

            } else {

                saveCart(cart);
                displayCart();

            }

        }

    }


    // Remove Product

    function removeItem(id) {

        cart = cart.filter(function(item) {
            return String(item.id) !== String(id);
        });

        saveCart(cart);
        displayCart();

    }


    // Clear Cart

    clearCartBtn.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is already empty!");
            return;

        }

        let confirmClear = confirm(
            "Are you sure you want to clear the cart?"
        );

        if (confirmClear) {

            cart = [];

            saveCart(cart);
            displayCart();

        }

    });


    // Checkout

    checkoutBtn.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;

        }

        let confirmOrder = confirm(
            "Do you want to place this order?"
        );

        if (!confirmOrder) {
            return;
        }


        // Calculate Total

        let total = 0;
        let quantity = 0;

        cart.forEach(function(item) {

            let price = Number(item.price) || 0;
            let qty = Number(item.quantity) || 0;

            total += price * qty;
            quantity += qty;

        });


        // Get Sales Data

        let sales = JSON.parse(
            localStorage.getItem("sms_sales")
        ) || [];


        // Create New Sale

        let newSale = {

            id: Date.now(),

            date: new Date().toLocaleString(),

            items: JSON.parse(JSON.stringify(cart)),

            total: total,

            quantity: quantity

        };


        // Save Sales

        sales.push(newSale);

        localStorage.setItem(
            "sms_sales",
            JSON.stringify(sales)
        );


        // Save Current Receipt ID

        localStorage.setItem(
            "sms_current_sale_id",
            newSale.id
        );


        // Empty Cart

        cart = [];

        saveCart(cart);

        displayCart();


        // Go To Receipt Page

        window.location.href = "receipt.html";

    });


    // Initial Display

    displayCart();

});
