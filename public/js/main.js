// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("projectCarousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".dot-indicator");

  let currentSlide = 0;
  const slideWidth = 709 + 32; // project width + gap
  const maxSlides = 3;

  function updateCarousel() {
    const translateX = -currentSlide * slideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Remove opacity restrictions for infinite loop
    prevBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
  }

  prevBtn.addEventListener("click", () => {
    if (currentSlide === 0) {
      // Jump to last slide with smooth transition
      currentSlide = maxSlides - 1;
    } else {
      currentSlide--;
    }
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide === maxSlides - 1) {
      // Jump to first slide with smooth transition
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Initialize
  updateCarousel();
});

// Custom Cursor functionality
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.getElementById("customCursor");

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 6 + "px";
    cursor.style.top = e.clientY - 6 + "px";
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .group');

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  // Show cursor when entering window
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
});

// Scroll Animation functionality
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.style.transform = "translateY(0)";
        card.style.opacity = "1";
      }
    });
  }, observerOptions);

  // Observe all benefit cards
  const benefitCards = document.querySelectorAll("[data-card]");
  benefitCards.forEach((card) => {
    observer.observe(card);
  });
});

// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll("#faq-section .bg-\\[\\#0f0f0f\\]");

  faqItems.forEach((item) => {
    const header = item.querySelector(".flex.items-center.justify-between");
    const content = item.querySelector(".text-white\\/70");
    const icon = item.querySelector(".w-6.h-6");

    if (header && content && icon) {
      // Initially hide all content except the first one
      if (!item.classList.contains("first-faq")) {
        content.style.display = "none";
      }

      header.addEventListener("click", () => {
        const isOpen = content.style.display !== "none";

        // Close all other items
        faqItems.forEach((otherItem) => {
          const otherContent = otherItem.querySelector(".text-white\\/70");
          const otherIcon = otherItem.querySelector(".w-6.h-6");
          if (otherContent && otherIcon && otherItem !== item) {
            otherContent.style.display = "none";
            otherIcon.classList.remove("rotate-45");
          }
        });

        // Toggle current item
        if (isOpen) {
          content.style.display = "none";
          icon.classList.remove("rotate-45");
        } else {
          content.style.display = "block";
          icon.classList.add("rotate-45");
        }
      });
    }
  });
});

// New FAQ Toggle functionality
function toggleFAQ(faqNumber) {
  const answer = document.getElementById(`faq-answer-${faqNumber}`);
  const icon = document.getElementById(`faq-icon-${faqNumber}`);

  if (answer && icon) {
    const isHidden = answer.classList.contains("hidden");

    // Close all other FAQ answers
    for (let i = 1; i <= 5; i++) {
      const otherAnswer = document.getElementById(`faq-answer-${i}`);
      const otherIcon = document.getElementById(`faq-icon-${i}`);

      if (otherAnswer && otherIcon && i !== faqNumber) {
        otherAnswer.classList.add("hidden");
        otherIcon.classList.remove("rotate-180");
      }
    }

    // Toggle current FAQ
    if (isHidden) {
      answer.classList.remove("hidden");
      icon.classList.add("rotate-180");
    } else {
      answer.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  }
}

// FAQ Animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const faqItem = entry.target;
        faqItem.style.transform = "translateY(0)";
        faqItem.style.opacity = "1";
      }
    });
  }, observerOptions);

  // Observe all FAQ items
  const faqItems = document.querySelectorAll("[data-faq]");
  faqItems.forEach((item) => {
    observer.observe(item);
  });
});

// Custom Budget Dropdown
const btn = document.getElementById("budgetDropdownBtn");
const options = document.getElementById("budgetDropdownOptions");
const selected = document.getElementById("budgetSelected");
if (btn && options && selected) {
  btn.addEventListener("click", function (e) {
    options.classList.toggle("hidden");
  });
  options.querySelectorAll("div").forEach((option) => {
    option.addEventListener("click", function () {
      selected.textContent = this.textContent;
      options.classList.add("hidden");
    });
  });
  document.addEventListener("click", function (e) {
    if (!btn.contains(e.target) && !options.contains(e.target)) {
      options.classList.add("hidden");
    }
  });
}
