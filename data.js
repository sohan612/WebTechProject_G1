
// Smart Bazaaar Product Database
// checked 2x

let defaultProducts = [

    {
        id: 1,
        name: "Wireless Headphone",
        category: "Electronics",
        price: 1500,
        icon: "🎧",
        description: "High quality wireless headphone."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2200,
        icon: "⌚",
        description: "Modern smartwatch for daily use."
    },
    {
        id: 3,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 650,
        icon: "👕",
        description: "Comfortable cotton t-shirt."
    },
    {
        id: 4,
        name: "Backpack",
        category: "Fashion",
        price: 1200,
        icon: "🎒",
        description: "Stylish backpack for students."
    },
    {
        id: 5,
        name: "Running Shoes",
        category: "Fashion",
        price: 2500,
        icon: "👟",
        description: "Comfortable running shoes."
    },
    {
        id: 6,
        name: "Smartphone",
        category: "Electronics",
        price: 18000,
        icon: "📱",
        description: "Modern smartphone."
    },
    {
        id: 7,
        name: "Coffee Mug",
        category: "Accessories",
        price: 350,
        icon: "☕",
        description: "Simple ceramic coffee mug."
    },
    {
        id: 8,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        icon: "💻",
        description: "Laptop for study and work."
    }

];


// Get Existing Products

let savedProducts = JSON.parse(
    localStorage.getItem("sms_products")
) || [];


// Add Missing Default Products

defaultProducts.forEach(function(product) {

    let exists = savedProducts.some(function(item) {

        return String(item.id) === String(product.id);

    });

    if (!exists) {

        savedProducts.push(product);

    }

});


// Save All Products

localStorage.setItem(
    "sms_products",
    JSON.stringify(savedProducts)
);


// Load Products

window.shopProducts = savedProducts;
