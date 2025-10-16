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
// IMPORTANT: hiddenElements now only selects elements that should *not* animate on load
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

// Function to handle the intersection of other hidden elements (scroll reveal)
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: unobserve after showing once
            // elementObserver.unobserve(entry.target); 
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

// === Start of Skills Page Specific Code (Card Scrolling) ===
const cardsContainer = document.querySelector('.cards-container');
const backButton = document.querySelector('.technical-skills-nav .nav-btn:first-child');
const nextButton = document.querySelector('.technical-skills-nav .nav-btn:last-child');

if (cardsContainer && backButton && nextButton) {
    const scrollDistance = 400;

    nextButton.addEventListener('click', () => {
        cardsContainer.scrollLeft += scrollDistance;
    });

    backButton.addEventListener('click', () => {
        cardsContainer.scrollLeft -= scrollDistance;
    });
}
// === End of Skills Page Specific Code (Card Scrolling) ===

// === Start of Hide/Show on Scroll for Navbar ===
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

// Technical Skills Data
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
        title: 'Full-Stack Developer', 
        details: 'Strong foundation in Full-Stack Development with hands-on experience as the <b>lead developer</b> in multiple academic projects and thesis systems.Proficient in designing and implementing both frontend and backend solutions with the use of my preffered languages <b>PHP</b>, <b>HTML</b> and <b>CSS</b>. I use PHP to build robust backend functionality, while leveraging HTML and CSS to create clean, responsive, and user-friendly interfaces.<br><br> Adept at collaborating within teams, troubleshooting complex bugs, and delivering complete end-to-end systems.', 
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
        title: 'Desktop Development',
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

// === Start of Modal Logic with Image Rotation ===
let imageInterval; // Global variable to hold the rotation timer

const modal = document.getElementById("skill-modal");
const imageCol = document.getElementById("modal-image-col");
const closeBtn = document.querySelector(".close-btn");
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

// Function to close the modal
const closeModal = () => {
    modal.style.display = "none";
    clearInterval(imageInterval); // STOP the image rotation when modal closes!
};

// Close the modal when the user clicks on (x)
closeBtn.onclick = closeModal;

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};
// === End of Modal Logic with Image Rotation ===