// Function to handle the smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Select the navbar and the sections to observe
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
const hiddenElements = document.querySelectorAll('.hidden');

// === Start of Intersection Observer for Navbar Color ===
// This part is for the color change based on the hero section.
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled');
            }
        });
    }, {
        root: null,
        threshold: 0.5,
    });
    heroObserver.observe(heroSection);
}
// === End of Intersection Observer for Navbar Color ===

// Function to handle the intersection of other hidden elements
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    root: null,
    threshold: 0.1,
});

// Start observing all hidden elements if they exist
hiddenElements.forEach(element => {
    elementObserver.observe(element);
});

// === Start of Skills Page Specific Code ===
// Check if the cards container and buttons exist before adding event listeners
const cardsContainer = document.querySelector('.cards-container');
const backButton = document.querySelector('.technical-skills-nav .nav-btn:first-child');
const nextButton = document.querySelector('.technical-skills-nav .nav-btn:last-child');

if (cardsContainer && backButton && nextButton) {
    const scrollDistance = 400; // Adjust this value to control how far it scrolls per click

    // Scroll to the right when the Next button is clicked
    nextButton.addEventListener('click', () => {
        cardsContainer.scrollLeft += scrollDistance;
    });

    // Scroll to the left when the Back button is clicked
    backButton.addEventListener('click', () => {
        cardsContainer.scrollLeft -= scrollDistance;
    });
}
// === End of Skills Page Specific Code ===

// === Start of Hide/Show on Scroll for Navbar ===
// This part handles the hide on scroll down, show on scroll up behavior.
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('hidden-on-scroll');
    } else {
        navbar.classList.remove('hidden-on-scroll');
    }
    lastScrollY = window.scrollY;
});
// === End of Hide/Show on Scroll for Navbar ===