document.addEventListener("DOMContentLoaded", () => {
  // Typed.js initialization
  const typedElement = document.querySelector("#typed-output");
  if (!typedElement) {
    console.error("#typed-output element not found. Typed.js will not initialize.");
  } else {
    new Typed("#typed-output", {
      strings: [
        "Every Drop Saves a Life",
        "Every 2 seconds, someone needs blood",
        "1 donation can save up to 3 lives",
        "Less than 5% of eligible people donate blood",
        "Blood cannot be manufactured, only donated",
        "Without donors, surgeries can't happen",
        "Your 15 minutes can give someone years",
        "Over 100 million units of blood are needed yearly",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: true,
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.backdropFilter = "blur(10px)";
      } else {
        navbar.style.background = "#ffffff";
        navbar.style.backdropFilter = "none";
      }
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".step, .testimonial, .stats-text").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Image loading optimization
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });

  // CTA button click tracking (for analytics)
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.textContent.trim();
      console.log(`CTA clicked: ${action}`);
      // Replace with real analytics tracking call here
    });
  });

  // Hover effects for steps
  document.querySelectorAll(".step").forEach((step) => {
    step.addEventListener("mouseenter", () => {
      step.style.transform = "translateY(-10px) scale(1.02)";
    });
    step.addEventListener("mouseleave", () => {
      step.style.transform = "translateY(0) scale(1)";
    });
  });

  // Testimonials cycling
  const testimonials = [
    {
      text: "BloodConnect saved my daughter's life. Within 15 minutes of posting our emergency, we found a donor nearby. I can't thank this platform and the donor enough.",
      author: "- Sarah Johnson, Mother",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      text: "Donating blood is easy and fulfilling. BloodConnect made it so simple for me to find nearby donation camps.",
      author: "- Mark Stevens, Volunteer",
      img: "https://randomuser.me/api/portraits/men/43.jpg",
    },
    {
      text: "Thanks to BloodConnect, I was able to donate blood on time and save a stranger’s life. Truly life-changing.",
      author: "- Priya Desai, Donor",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const testimonialEl = document.getElementById("testimonial");
  if (testimonialEl) {
    const textEl = testimonialEl.querySelector(".testimonial-text");
    const authorEl = testimonialEl.querySelector(".testimonial-author");
    const imgEl = testimonialEl.querySelector(".testimonial-img");

    let currentIndex = 0;
    const fadeDuration = 1000; // 1 second
    const displayDuration = 4000; // 4 seconds before fade out

    function showTestimonial(index) {
      if (textEl) textEl.textContent = testimonials[index].text;
      if (authorEl) authorEl.textContent = testimonials[index].author;
      if (imgEl) imgEl.src = testimonials[index].img;
      testimonialEl.style.opacity = 1;
    }

    function cycleTestimonials() {
      testimonialEl.style.opacity = 0;
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      }, fadeDuration);
    }

    showTestimonial(currentIndex);
    setInterval(cycleTestimonials, displayDuration + fadeDuration);
  }

});
