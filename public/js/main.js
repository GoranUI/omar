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
