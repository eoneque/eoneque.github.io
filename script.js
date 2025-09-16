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

// Function to handle the intersection of the hero section
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // If the hero section is in view, remove the 'scrolled' class
    if (entry.isIntersecting) {
      navbar.classList.remove('scrolled');
    } else {
      // If the hero section is out of view, add the 'scrolled' class
      navbar.classList.add('scrolled');
    }
  });
}, {
  root: null, // The viewport
  threshold: 0.5, // Trigger when 50% of the hero section is visible
});

// Start observing the hero section
heroObserver.observe(heroSection);

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
  root: null, // The viewport
  threshold: 0.1, // Trigger when 10% of the element is visible
});

// Start observing all hidden elements
hiddenElements.forEach(element => {
  elementObserver.observe(element);
});