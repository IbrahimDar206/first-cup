// Dynamic Cafe Name

const cafeNameElement = document.querySelector("#cafe-name");

if (cafeNameElement) {
    cafeNameElement.textContent = window.SITE_CONFIG.cafeName + " ☕";
}

// First Cup Button Interaction

const orderButton = document.querySelector(".order-btn");

if (orderButton) {

    orderButton.addEventListener("click", function() {

        alert("Thank you for choosing First Cup! ☕");

    });

}


// Mobile Hamburger Menu

const menuToggle = document.querySelector("#menu-toggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function() {

        

        navLinks.classList.toggle("active");

        menuToggle.classList.toggle("open");

    });

}


// Close Mobile Menu When a Link is Clicked

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function(link) {

    link.addEventListener("click", function() {

        if (navLinks && menuToggle) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("open");

        }

    });

});


// Dynamic Menu System

const menuContainer = document.querySelector("#menu-container");

if (menuContainer && window.SITE_CONFIG.menuItems) {

    menuContainer.innerHTML = "";

    window.SITE_CONFIG.menuItems.forEach(function(item) {

        const menuCard = document.createElement("div");
        menuCard.className = "menu-card";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const heading = document.createElement("h3");
        heading.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const price = document.createElement("h4");
        price.textContent =
            window.SITE_CONFIG.currency + " " + item.price;

        const button = document.createElement("button");
        button.className = "add-to-cart";
        button.dataset.name = item.name;
        button.dataset.price = item.price;
        button.textContent = "Add to Cart";

        menuCard.appendChild(image);
        menuCard.appendChild(heading);
        menuCard.appendChild(description);
        menuCard.appendChild(price);
        menuCard.appendChild(button);

        menuContainer.appendChild(menuCard);

    });

}



// Shopping Cart Functionality

// Load Cart Data from Browser Storage

let cart = JSON.parse(localStorage.getItem("firstCupCart")) || [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartItems = document.querySelector("#cart-items");

const cartTotal = document.querySelector("#cart-total");

const cartCount = document.querySelector("#cart-count");


// Add Products to Cart

addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;

        const price = Number(button.dataset.price);


        // Check if Product Already Exists

        const existingProduct = cart.find(function(item) {

            return item.name === name;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            const product = {

                name: name,

                price: price,

                quantity: 1

            };

            cart.push(product);

        }

        updateCart();

    });

});


// Update Cart Display

function updateCart() {

    // Save Cart Data in Browser Storage

    localStorage.setItem("firstCupCart", JSON.stringify(cart));

    if (!cartItems || !cartTotal || !cartCount) {

        return;

    }

    cartItems.innerHTML = "";

    let total = 0;

    let itemCount = 0;


    // Check Empty Cart

    if (cart.length === 0) {

        cartItems.textContent =
            "Your cart is empty. Start adding some delicious coffee! ☕";

        cartTotal.textContent = 0;

        cartCount.textContent = 0;

        return;

    }


    // Display Cart Items

    cart.forEach(function(item, index) {

        const itemElement = document.createElement("p");

        itemElement.textContent =
            item.name + " × " + item.quantity +
            " - " + window.SITE_CONFIG.currency + " " + (item.price * item.quantity) + " ";


        // Quantity Decrease Button

        const decreaseButton = document.createElement("button");

        decreaseButton.textContent = "-";

        decreaseButton.addEventListener("click", function() {

            item.quantity--;

            if (item.quantity === 0) {

                cart.splice(index, 1);

            }

            updateCart();

        });


        // Quantity Increase Button

        const increaseButton = document.createElement("button");

        increaseButton.textContent = "+";

        increaseButton.addEventListener("click", function() {

            item.quantity++;

            updateCart();

        });


        // Add Quantity Buttons

        itemElement.appendChild(decreaseButton);

        itemElement.appendChild(increaseButton);

        cartItems.appendChild(itemElement);


        // Calculate Total Price

        total = total + (item.price * item.quantity);


        // Calculate Total Item Quantity

        itemCount = itemCount + item.quantity;

    });


    // Update Total Price

    cartTotal.textContent = total;


    // Update Navbar Cart Count

    cartCount.textContent = itemCount;

}

// Clear Cart Functionality

const clearCartButton = document.querySelector("#clear-cart");

if (clearCartButton) {

    clearCartButton.addEventListener("click", function() {

        // Confirmation Popup

        const confirmClear = confirm(
            "Are you sure you want to clear your cart? 🛒"
        );

        if (confirmClear) {

            cart = [];

            updateCart();

            alert("Your cart has been cleared successfully! ☕");

        }

    });

}


// Display Saved Cart When Page Loads

updateCart();


// WhatsApp Checkout Functionality

const checkoutButton = document.querySelector("#checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function() {

        // Get Customer Details

        const customerName = document.querySelector("#customer-name").value.trim();

        const customerPhone = document.querySelector("#customer-phone").value.trim();
        
         // Validate Pakistani Mobile Number

    const phonePattern = /^03[0-9]{9}$/;

    if (!phonePattern.test(customerPhone)) {
        alert("Please enter a valid 11-digit mobile number (e.g. 03201234567).");
        return;
    }

        const customerAddress = document.querySelector("#customer-address").value.trim();


        // Check Empty Cart

        if (cart.length === 0) {

            alert("Your cart is empty! Please add some coffee first. ☕");

            return;

        }


        // Check Customer Details

        if (customerName === "" || customerPhone === "" || customerAddress === "") {

            alert("Please fill in all customer details!");

            return;

        }


        // Create WhatsApp Message

        let message = "☕ " + window.SITE_CONFIG.cafeName + " Order\n\n";

        message += "Customer Details:\n";

        message += "Name: " + customerName + "\n";

        message += "Phone: " + customerPhone + "\n";

        message += "Address: " + customerAddress + "\n\n";

        message += "Order Details:\n";


        // Add Coffee Items

        cart.forEach(function(item) {

            message += item.name +
                       " x " + item.quantity +
                      " = " + window.SITE_CONFIG.currency + " " +
                       (item.price * item.quantity) + "\n";

        });


        // Calculate Total Bill

        let total = 0;

        cart.forEach(function(item) {

            total += item.price * item.quantity;

        });


        // Add Total to Message

        message += "\nTotal Bill: " + window.SITE_CONFIG.currency + " " + total;

        message += "\n\nThank you for choosing First Cup! ☕";


        // Create WhatsApp URL

        const whatsappURL =
    "https://wa.me/" + window.SITE_CONFIG.whatsappNumber +
    "?text=" + encodeURIComponent(message);


        // Show Order Success Message

const orderSuccess = document.querySelector("#order-success");

if (orderSuccess) {
    orderSuccess.textContent =
        "Your order details are ready! Please send the WhatsApp message to complete your order. ☕";

    orderSuccess.style.display = "block";
}


// Open WhatsApp

window.open(whatsappURL, "_blank");

});

}


// Register Service Worker

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker.register("./service-worker.js")

            .then(function(registration) {

                console.log(
                    "Service Worker registered successfully!",
                    registration
                );

                // Detect New Version

                let hadController = Boolean(
                    navigator.serviceWorker.controller
                );

                navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    function() {

                        if (hadController) {

                            let updateNow = confirm(
                                "A new version of First Cup is available! Would you like to refresh the app?"
                            );

                            if (updateNow) {
                                window.location.reload();
                            }

                        }

                        hadController = true;

                    }
                );

            })

            .catch(function(error) {

                console.log(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}
