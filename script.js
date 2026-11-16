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
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
    });

});

