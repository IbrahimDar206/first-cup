
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
            " - Rs. " + (item.price * item.quantity) + " ";


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

        let message = "☕ First Cup Order\n\n";

        message += "Customer Details:\n";

        message += "Name: " + customerName + "\n";

        message += "Phone: " + customerPhone + "\n";

        message += "Address: " + customerAddress + "\n\n";

        message += "Order Details:\n";


        // Add Coffee Items

        cart.forEach(function(item) {

            message += item.name +
                       " x " + item.quantity +
                       " = Rs. " +
                       (item.price * item.quantity) + "\n";

        });


        // Calculate Total Bill

        let total = 0;

        cart.forEach(function(item) {

            total += item.price * item.quantity;

        });


        // Add Total to Message

        message += "\nTotal Bill: Rs. " + total;

        message += "\n\nThank you for choosing First Cup! ☕";


        // Create WhatsApp URL

        const whatsappURL =
            "https://wa.me/923205265677?text=" +
            encodeURIComponent(message);


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
