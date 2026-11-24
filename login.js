

// Smart Bazaaar Login & Registration



// Show Login / Registration Sections
function showSection(sectionId) {

    const sections = [
        "accountSelection",
        "adminLogin",
        "customerLogin",
        "customerRegister"
    ];

    sections.forEach(function(id) {

        document.getElementById(id).style.display = "none";

    });

    document.getElementById(sectionId).style.display = "block";

}


// Get Registered Customers
function getCustomers() {

    return JSON.parse(
        localStorage.getItem("sms_customers") || "[]"
    );

}


// Save Registered Customers
function saveCustomers(customers) {

    localStorage.setItem(
        "sms_customers",
        JSON.stringify(customers)
    );

}


// Hash Customer Password
async function hashPassword(password, salt) {

    if (!window.crypto || !window.crypto.subtle) {
        throw new Error(
            "Secure password hashing unavailable. Run the project using localhost."
        );
    }

    const data = new TextEncoder().encode(salt + ":" + password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}


// Generate Password Salt
function generateSalt() {

    const saltArray = new Uint8Array(16);

    crypto.getRandomValues(saltArray);

    return Array.from(saltArray)
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}




// Demo ID: admin
// Demo Password: admin123


document.getElementById("adminLoginForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const userId = document.getElementById("adminId").value.trim();

        const password = document.getElementById("adminPassword").value;

        const message = document.getElementById("adminMessage");


        if (userId === "admin" && password === "admin123") {

            sessionStorage.removeItem("sms_customer_logged_in");

            sessionStorage.setItem("sms_admin_logged_in", "true");

            window.location.href = "index.html";

        } else {

            message.textContent = "Invalid Admin ID or Password!";
            message.style.color = "red";

        }

    }
);



// Customer Registration


document.getElementById("customerRegisterForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();

        const userId = document.getElementById("registerUserId").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");


        message.textContent = "";


        if (password.length < 6) {

            message.textContent = "Password must contain at least 6 characters.";
            message.style.color = "red";
            return;

        }


        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match!";
            message.style.color = "red";
            return;

        }


        const customers = getCustomers();


        // Check Duplicate User ID
        const existingUser = customers.find(function(customer) {

            return customer.userId.toLowerCase() === userId.toLowerCase();

        });


        if (existingUser) {

            message.textContent = "This User ID is already registered!";
            message.style.color = "red";
            return;

        }


        // Check Duplicate Email
        const existingEmail = customers.find(function(customer) {

            return customer.email.toLowerCase() === email.toLowerCase();

        });


        if (existingEmail) {

            message.textContent = "This email is already registered!";
            message.style.color = "red";
            return;

        }


        try {

            const salt = generateSalt();

            const passwordHash = await hashPassword(password, salt);


            const newCustomer = {

                name: name,
                userId: userId,
                email: email,
                salt: salt,
                passwordHash: passwordHash

            };


            customers.push(newCustomer);

            saveCustomers(customers);


            message.textContent = "Registration successful! Please login.";

            message.style.color = "green";


            document.getElementById("customerRegisterForm").reset();


            setTimeout(function() {

                showSection("customerLogin");

                document.getElementById("customerLoginId").value = userId;

            }, 1200);


        } catch (error) {

            message.textContent = error.message;
            message.style.color = "red";

        }

    }
);


// =====================================
// Customer Login
// =====================================

document.getElementById("customerLoginForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const userId = document.getElementById("customerLoginId").value.trim();

        const password = document.getElementById("customerLoginPassword").value;

        const message = document.getElementById("customerLoginMessage");


        message.textContent = "";


        const customers = getCustomers();


        const customer = customers.find(function(item) {

            return item.userId.toLowerCase() === userId.toLowerCase();

        });


        if (!customer) {

            message.textContent = "User ID not found!";
            message.style.color = "red";
            return;

        }


        try {

            const enteredHash = await hashPassword(password, customer.salt);


            if (enteredHash === customer.passwordHash) {

                sessionStorage.removeItem("sms_admin_logged_in");

                sessionStorage.setItem("sms_customer_logged_in", "true");

                sessionStorage.setItem("sms_customer_user_id", customer.userId);

                window.location.href = "products.html";

            } else {

                message.textContent = "Incorrect password!";
                message.style.color = "red";

            }

        } catch (error) {

            message.textContent = error.message;
            message.style.color = "red";

        }

    }
);
