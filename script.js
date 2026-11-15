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
    });

}
