// admin java script
document.addEventListener("DOMContentLoaded", function() {

    let productForm = document.getElementById("productForm");
    let productList = document.getElementById("adminProductList");

    let products = JSON.parse(localStorage.getItem("sms_products")) || [];

    // Save Products
    function saveProducts() {
        localStorage.setItem("sms_products", JSON.stringify(products));
    }

    // Display Products
    function displayProducts() {

        productList.innerHTML = "";

        if (products.length === 0) {
            productList.innerHTML = `
                <p class="no-products">No Products Available!</p>
            `;
            return;
        }

        products.forEach(function(product) {

            let card = document.createElement("div");
            card.className = "admin-product-card";

            if (product.image) {

                let img = document.createElement("img");

                img.src = product.image;
                img.alt = product.name;

                img.onerror = function() {
                    img.style.display = "none";
                };

                card.appendChild(img);
            }

            let name = document.createElement("h4");
            name.textContent = product.name;

            let price = document.createElement("p");
            price.textContent = "Price: ৳" + Number(product.price).toFixed(2);

            let category = document.createElement("p");
            category.textContent = "Category: " + product.category;

            let deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Delete Product";
            deleteBtn.className = "delete-product-btn";

            deleteBtn.addEventListener("click", function() {

                let confirmDelete = confirm(
                    "Are you sure you want to delete " + product.name + "?"
                );

                if (confirmDelete) {

                    products = products.filter(function(item) {
                        return String(item.id) !== String(product.id);
                    });

                    saveProducts();
                    displayProducts();

                    alert("Product Deleted Successfully!");
                }

            });

            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(category);
            card.appendChild(deleteBtn);

            productList.appendChild(card);

        });
    }

    // Add Product
    productForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("productName").value.trim();

        let price = Number(document.getElementById("productPrice").value);

        let category = document.getElementById("productCategory").value;

        let image = document.getElementById("productImage").value.trim();

        if (name === "" || price <= 0 || category === "") {
            alert("Please enter valid product information!");
            return;
        }

        let newProduct = {

            id: Date.now(),
            name: name,
            price: price,
            category: category,
            image: image

        };

        products.push(newProduct);

        saveProducts();
        displayProducts();

        productForm.reset();

        alert("Product Added Successfully!");

    });

    // Initial Display
    displayProducts();

});
