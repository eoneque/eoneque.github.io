// === Navbar Scroll Behavior (color + hide/show) ===
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');

if (heroSection) {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navbar.classList.remove('scrolled');
      else navbar.classList.add('scrolled');
    });
  }, { threshold: 0.5 });

  heroObserver.observe(heroSection);
}

// Hide/Show navbar on scroll
let lastScrollY = window.scrollY;
const hideThreshold = 100;
const bottomThreshold = 150;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const distanceFromBottom = scrollHeight - (currentScrollY + windowHeight);

  if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
    navbar.classList.add('hidden-on-scroll');
  } else if (currentScrollY < lastScrollY || distanceFromBottom < bottomThreshold) {
    navbar.classList.remove('hidden-on-scroll');
  }

  lastScrollY = currentScrollY;
});

// Navbar fade-in on load
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    navbar.classList.add('loaded');
  });
});
