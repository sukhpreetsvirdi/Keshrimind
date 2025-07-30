document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.getElementById('main-body');
    const header = document.getElementById('main-header');
    const heroSection = document.querySelector('.hero-section');
    const animatedElements = document.querySelectorAll('[data-animation]'); // Get all elements with data-animation

    // --- Mobile Menu Toggle Logic ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Prevent body scroll when menu is open on mobile
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Dynamic Navbar & Logo Reveal on Scroll ---
    const handleNavbarScroll = () => {
        const scrollPosition = window.scrollY;
        
        let revealThreshold = 200; // Default threshold in pixels if heroSection not found or small
        if (heroSection) {
            // Use heroSection height, but ensure it's not zero or too small
            revealThreshold = Math.max(heroSection.offsetHeight * 0.7, 150); // Minimum 150px or 70% of hero height
        }
        
        if (scrollPosition > revealThreshold) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    };

    // --- Element Scroll Animation Logic (without IntersectionObserver) ---
    const checkElementVisibility = () => {
        animatedElements.forEach(element => {
            // Get the position of the element relative to the viewport
            const rect = element.getBoundingClientRect();
            
            // Check if element is within the viewport (with a little buffer)
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && // 80% from top
                rect.bottom >= 0 + (window.innerHeight || document.documentElement.clientHeight) * 0.1 // 10% from bottom
            );

            if (isVisible && !element.classList.contains('is-visible')) {
                const delay = element.dataset.delay || '0'; 
               
                element.classList.add('is-visible');
            }
            // Note: This simple method doesn't remove 'is-visible' if scrolled back up
            // To do so, you'd add: else if (!isVisible && element.classList.contains('is-visible')) { element.classList.remove('is-visible'); }
            // but this can lead to re-triggering animations which is often undesirable.
        });
    };

    // Attach all scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        checkElementVisibility();
    });

    // Initial checks on page load
    handleNavbarScroll();
    checkElementVisibility(); // Trigger initial check for elements already in view

    console.log("script.js loaded and ready (without IntersectionObserver)!");
});


window.addEventListener("scroll", function () {
  const logo = document.getElementById("mainLogo");
  const wrapper = document.getElementById("logoWrapper");
  const navLogoContainer = document.getElementById("navbar-logo-container");

  if (window.scrollY > 100) {
    if (!document.body.classList.contains("logo-scrolled")) {
      navLogoContainer.appendChild(logo);
      document.body.classList.add("logo-scrolled");
    }
  } else {
    if (document.body.classList.contains("logo-scrolled")) {
      wrapper.appendChild(logo);
      document.body.classList.remove("logo-scrolled");
    }
  }
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});



  window.addEventListener("load", function () {
    if (!localStorage.getItem("cookiesAccepted")) {
      document.getElementById("cookieConsent").style.display = "flex";
    }

    document.getElementById("acceptCookies").onclick = function () {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookieConsent").style.display = "none";
    };
  });

