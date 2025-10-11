// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in class to sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    section.classList.add("fade-in");

    // Check if section is already in viewport on load
    const rect = section.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Add a slight delay for sections already visible
      setTimeout(() => {
        section.classList.add("fade-in-visible");
      }, index * 100);
    } else {
      // Observe sections that need to scroll into view
      fadeInObserver.observe(section);
    }
  });

  // Add fade-in to individual cards with stagger effect
  const cards = document.querySelectorAll(".projects .card");
  cards.forEach((card, index) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
  });

  // Add fade-in to experience and education items
  const items = document.querySelectorAll(".experience-item, .education-item, .extra-item");
  items.forEach((item, index) => {
    item.classList.add("fade-in");
    item.style.transitionDelay = `${index * 0.15}s`;
    fadeInObserver.observe(item);
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip if it's just "#" or "#home"
      if (href === "#" || href === "#home") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add active state to navbar links on scroll
  const navItems = document.querySelectorAll(".nav-link");
  const sectionIds = [
    "about",
    "experience",
    "education",
    "extra",
    "projects",
    "contact",
  ];

  window.addEventListener("scroll", () => {
    let current = "";

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          current = id;
        }
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Add typing effect to h1 (optional - can be removed if too much)
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.opacity = "0";
    setTimeout(() => {
      h1.style.transition = "opacity 0.8s ease-in";
      h1.style.opacity = "1";
    }, 100);
  }

  // Add parallax effect to hero heading (subtle)
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector("h1");
    if (hero && scrolled < 500) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - scrolled / 500;
    }
  });
});
