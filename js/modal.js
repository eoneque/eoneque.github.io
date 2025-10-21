// === Modal Logic with Image Rotation ===
import { SKILLS_DATA } from './skillsData.js';

let imageInterval;

const modal = document.getElementById("skill-modal");
const imageCol = document.getElementById("modal-image-col");
const closeBtn = document.querySelector(".close-btn");
const skillCards = document.querySelectorAll('.cards-container .card'); 
const modalSummary = document.getElementById('modal-summary'); 

const cardsContainer = document.querySelector('.cards-container');
const navButtons = document.querySelectorAll('.technical-skills-nav .nav-btn');

if (cardsContainer && navButtons.length === 2) {
  const scrollAmount = 350; // pixels per click (adjust as you like)

  navButtons[0].addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  navButtons[1].addEventListener('click', () => {
    cardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

function cycleImages(imagesArray) {
  let currentIndex = 0;
  clearInterval(imageInterval);
  imageCol.innerHTML = '';

  imagesArray.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tool icon ${index + 1}`;
    if (index === 0) img.classList.add('active');
    imageCol.appendChild(img);
  });

  const images = imageCol.querySelectorAll('img');
  if (images.length > 1) {
    imageInterval = setInterval(() => {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, 1500);
  }
}

if (skillCards.length > 0) {
  skillCards.forEach((card, index) => {
    card.setAttribute('data-skill-id', index + 1);

    card.addEventListener('click', () => {
      const skillId = parseInt(card.getAttribute('data-skill-id'));
      const skillData = SKILLS_DATA.find(skill => skill.id === skillId);

      if (skillData) {
        document.getElementById('modal-title').textContent = skillData.title;
        document.getElementById('modal-details').innerHTML = skillData.details;
        document.getElementById('modal-experience').innerHTML = skillData.experience;
        cycleImages(skillData.tools);
        modal.classList.add("show");
        const content = modal.querySelector(".modal-content");
        content.style.animation = "none";
        content.offsetHeight; // restart animation
        content.style.animation = "modalPop 0.35s ease-out";

      }
    });
  });
}

function closeModal() {
  const content = modal.querySelector(".modal-content");

  if (!content) return; // safety check

  // Cancel any ongoing image cycle
  clearInterval(imageInterval);

  // Play the close animation
  content.style.animation = "modalClose 0.25s ease-in forwards";

  // After the animation ends, hide the modal safely
  const handleAnimationEnd = () => {
    modal.classList.remove("show");
    content.style.animation = ""; // reset for next open
    content.removeEventListener("animationend", handleAnimationEnd);
  };

  content.addEventListener("animationend", handleAnimationEnd);
}


if (closeBtn) closeBtn.onclick = closeModal;

window.onclick = function(e) {
  if (e.target === modal) closeModal();
};


