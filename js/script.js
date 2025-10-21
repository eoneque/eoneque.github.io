document.addEventListener("DOMContentLoaded", () => {
  const hiddenElements = document.querySelectorAll('.hidden');
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero');

  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navbar.classList.remove('scrolled');
      else navbar.classList.add('scrolled');
    });
  }, { threshold: 0.5 });

  if (heroSection) heroObserver.observe(heroSection);

  const elementObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  hiddenElements.forEach(el => elementObserver.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector('.navbar');

  // Trigger the fade/slide-in on load
  requestAnimationFrame(() => {
    navbar.classList.add('loaded');
  });
});

// === Start of Skill Cards Scroll Navigation ===
const cardsContainer = document.querySelector('.cards-container');
const navButtons = document.querySelectorAll('.technical-skills-nav .nav-btn');

if (cardsContainer && navButtons.length === 2) {
  const scrollAmount = 300; // pixels per click (adjust as you like)

  navButtons[0].addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  navButtons[1].addEventListener('click', () => {
    cardsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}
// === End of Skill Cards Scroll Navigation ===

// Function to handle the smooth scrolling for navigation links (e.g., #contact)
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
// Select all elements that should animate on scroll (e.g., #about, #skills, footer)
const hiddenElements = document.querySelectorAll('.hidden'); 

// === Start of Intersection Observer for Navbar Color ===
// This part changes navbar color/background based on the hero section visibility.
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When in the hero section, remove 'scrolled' class
                navbar.classList.remove('scrolled');
            } else {
                // When outside the hero section, add 'scrolled' class
                navbar.classList.add('scrolled');
            }
        });
    }, {
        root: null,
        threshold: 0.5, // Trigger when 50% of the hero section is out of view
    });
    heroObserver.observe(heroSection);
}
// === End of Intersection Observer for Navbar Color ===

// === Start of Scroll Reveal Logic (for .hidden elements) ===
// Function to handle the intersection of other hidden elements (scroll reveal)
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: uncomment below to make it animate only once
            // elementObserver.unobserve(entry.target); 
        } else {
            // Optional: uncomment below to reset the animation when scrolling back up
            // entry.target.classList.remove('show');
        }
    });
}, {
    root: null,
    threshold: 0.1, // Trigger when 10% of the element is visible
});

// Start observing all elements with the 'hidden' class
hiddenElements.forEach(element => {
    elementObserver.observe(element);
});
// === End of Scroll Reveal Logic ===

// === Start of Hide/Show on Scroll for Navbar ===
let lastScrollY = window.scrollY;
const hideThreshold = 100; // Define the scroll point where hiding begins
const bottomThreshold = 150; // Distance (in px) from bottom to re-show navbar

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const distanceFromBottom = scrollHeight - (currentScrollY + windowHeight);

    // Hide navbar when scrolling down AND past the threshold
    if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        navbar.classList.add('hidden-on-scroll');
    }
    // Show navbar when near the bottom OR scrolling up
    else if (currentScrollY < lastScrollY || distanceFromBottom < bottomThreshold) {
        navbar.classList.remove('hidden-on-scroll');
    }

    // Update last scroll position
    lastScrollY = currentScrollY;
});
// === End of Hide/Show on Scroll for Navbar ===


// Technical Skills Data (Needed for the modal)
const SKILLS_DATA = [
    { 
        id: 1, 
        title: 'UI/UX Designer', 
        details: 'Expertise in wireframing, prototyping, and user journey mapping with <b>Figma</b> and <b>Adobe XD</b> , creating intuitive and visually engaging digital interfaces.<br><br> In personal projects and freelance work, I follow a design-first approach—crafting user experiences and client-side designs before moving into full system development. Passionate about building interfaces that are not only aesthetically pleasing but also user-centered, accessible, and functional.', 
        tools: [
            '/assests/images/tool-icons/figma.png',
            '/assests/images/tech-icons/xd.png',
        ]
    },
    { 
        id: 2, 
        title: 'Full-Stack Web Developer', 
        details: 'Strong foundation in Full-Stack Development with hands-on experience as the <b>lead developer</b> in multiple academic projects and thesis systems.Proficient in designing and implementing both frontend and backend solutions with the use of my preffered languages <b>PHP</b>, <b>HTML</b> and <b>CSS</b>. I use PHP to build robust backend functionality, while leveraging HTML and CSS to create clean, responsive, and user-friendly interfaces.<br><br> Adept at collaborating within teams, troubleshooting complex bugs, and delivering complete end-to-end systems. While these are my favored technologies, I am always eager to learn and adapt to new tools and frameworks as needed. For instance, I am also proficient in Javascript frameworks like React and Next.js and Node.js for web development.', 
        tools: [
            '/assests/images/tech-icons/php.png',
            '/assests/images/tech-icons/html.png',
            '/assests/images/tech-icons/css.png',
        ]
    },
    { 
        id: 3, 
        title: 'Mobile Development', 
        details: 'Experience in developing cross-platform mobile applications for Android and iOS using JavaScript frameworks such as <b>React Native</b> and <b>Next.js</b> for the front end. Skilled in building and integrating back-end servers with <b>Python</b>, and leveraging <b>Supabase</b> as a cloud-based database solution to ensure seamless, reliable, and 24/7 application performance.<br><br> My experience in mobile development was strengthened through my thesis project, where I played a crucial role as the lead developer in designing and building the system.', 
        tools: [
            '/assests/images/tech-icons/react.png',
            '/assests/images/tech-icons/python.png',
            '/assests/images/tech-icons/supabase.png',
        ]
    },
    { 
        id: 4, 
        title: 'Software Development',
        details: 'Proficient in developing desktop applications using C++ and C# for robust and efficient system tools and software solutions.', 
        tools: [
            '/assests/images/tech-icons/csharp.png',
            '/assests/images/tool-icons/vs.png',
        ]
    },
    { 
        id: 5, 
        title: 'Network Engineering', 
        details: 'Skilled in network troubleshooting, configuring routers/switches, and ensuring secure and reliable internet connectivity.', 
        tools: [
            '/assests/images/icons/network.png', 
        ]
    },
    { 
        id: 6, 
        title: 'System Administration',
        details: 'Experienced in setting up and managing user access, security, and basic server maintenance for small to medium workplace environments.', 
        tools: [
            '/assests/images/icons/system.png', 
        ]
    }
];

// === Start of Modal Logic with Image Rotation (Needed for the skills page cards) ===
let imageInterval; // Global variable to hold the rotation timer

const modal = document.getElementById("skill-modal");
const imageCol = document.getElementById("modal-image-col");
const closeBtn = document.querySelector(".close-btn");
// Note: This targets cards in the .cards-container, which might only exist on the skills page
const skillCards = document.querySelectorAll('.cards-container .card'); 
const modalSummary = document.getElementById('modal-summary'); 

/**
 * Loads images and starts the cycling animation.
 * @param {Array<string>} imagesArray - Array of image paths.
 */
function cycleImages(imagesArray) {
    let currentIndex = 0;
    
    clearInterval(imageInterval); 
    imageCol.innerHTML = ''; 

    // 1. Add new image elements to the DOM
    imagesArray.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Tool icon ${index + 1}`;
        if (index === 0) {
            img.classList.add('active'); 
        }
        imageCol.appendChild(img);
    });

    const images = imageCol.querySelectorAll('img');

    // 2. Set the interval for rotation if there's more than one image
    if (images.length > 1) {
        imageInterval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            
            currentIndex = (currentIndex + 1) % images.length;
            
            images[currentIndex].classList.add('active');
        }, 1500); // Change image every 1.5 seconds
    }
}

// Only run the card click listeners if cards exist on the page
if (skillCards.length > 0) {
    skillCards.forEach((card, index) => {
        card.setAttribute('data-skill-id', index + 1);

        card.addEventListener('click', () => {
            const skillId = card.getAttribute('data-skill-id');
            const skillData = SKILLS_DATA.find(skill => skill.id === parseInt(skillId));

            if (skillData) {
                // Populate the modal with data
                document.getElementById('modal-title').textContent = skillData.title;
                if (modalSummary) {
                    modalSummary.textContent = ''; 
                }
                
                // Use innerHTML to render bold tags (<b>) and line breaks (<br>)
                document.getElementById('modal-details').innerHTML = skillData.details;

                // Start the image cycling
                cycleImages(skillData.tools);

                // Display the modal
                modal.style.display = "flex";
            }
        });
    });
}


// Function to close the modal
const closeModal = () => {
    if(modal) {
        modal.style.display = "none";
        clearInterval(imageInterval); // STOP the image rotation when modal closes!
    }
};

// Close the modal when the user clicks on (x)
if(closeBtn) {
    closeBtn.onclick = closeModal;
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};
// === End of Modal Logic with Image Rotation ===