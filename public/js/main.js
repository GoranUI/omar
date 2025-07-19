// Hero Carousel functionality with smooth horizontal scroll behavior
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("projectCarousel");
  const slides = carousel.children;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".dot-indicator");
  const slideCount = 6; // 5 project cards + 1 CTA card

  let currentSlide = 0;

  // Touch/swipe variables
  let touchStartX = 0;
  let touchEndX = 0;

  function getSlideWidth() {
    return slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);
  }

  function updateCarousel() {
    const slideWidth = getSlideWidth();
    const maxIndex = slideCount - 1;
    
    if (currentSlide > maxIndex) currentSlide = maxIndex;
    if (currentSlide < 0) currentSlide = 0;
    
    const translateX = -currentSlide * slideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Video pause on hover functionality
  const videos = carousel.querySelectorAll('video');
  videos.forEach((video) => {
    const parentContainer = video.closest('.group');
    if (parentContainer) {
      parentContainer.addEventListener('mouseenter', () => {
        video.pause();
      });
      
      parentContainer.addEventListener('mouseleave', () => {
        video.play();
      });
    }
  });

  // Horizontal scroll behavior for touchpad gestures
  function handleHorizontalScroll(e) {
    // Only handle horizontal scroll events (touchpad left/right)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        
        // Only activate when carousel is visible
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
          const scrollSensitivity = 0.5; // Adjust for sensitivity
          const scrollThreshold = 50; // Minimum scroll distance
          
          if (Math.abs(e.deltaX) > scrollThreshold) {
            if (e.deltaX > 0) {
              // Scroll right - previous slide
              if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
              }
            } else {
              // Scroll left - next slide
              if (currentSlide < slideCount - 1) {
                currentSlide++;
                updateCarousel();
              }
            }
          }
        }
      }
    }
  }

  // Touch/swipe functionality
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    if (!touchStartX) return;
    
    touchEndX = e.touches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - next slide
        if (currentSlide < slideCount - 1) {
          currentSlide++;
          updateCarousel();
        }
      } else {
        // Swipe right - previous slide
        if (currentSlide > 0) {
          currentSlide--;
          updateCarousel();
        }
      }
      touchStartX = 0;
      touchEndX = 0;
    }
  }

  function handleTouchEnd() {
    touchStartX = 0;
    touchEndX = 0;
  }

  // Button controls
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Dot controls
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Touch events for mobile
  carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
  carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
  carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Wheel event for horizontal scroll behavior (touchpad left/right)
  window.addEventListener('wheel', handleHorizontalScroll, { passive: false });
  window.addEventListener('resize', updateCarousel);

  // Initialize carousel
  updateCarousel();
});

// Enhanced Custom Cursor functionality with smooth following
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.getElementById("customCursor");
  
  if (!cursor) return;

  // Cursor position variables
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Smoothing factor (lower = smoother, higher = more responsive)
  const smoothing = 0.12;
  
  // Distance offset for the trailing effect
  const distanceOffset = 8;

  // Update mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation with magnetic effect
  function animateCursor() {
    // Calculate distance between current cursor position and mouse position
    const deltaX = mouseX - cursorX;
    const deltaY = mouseY - cursorY;
    
    // Apply smoothing with easing
    cursorX += deltaX * smoothing;
    cursorY += deltaY * smoothing;
    
    // Apply distance offset for trailing effect
    const offsetX = deltaX * 0.08; // Slight offset based on movement direction
    const offsetY = deltaY * 0.08;
    
    // Update cursor position with offset
    cursor.style.left = (cursorX - 6 + offsetX) + "px";
    cursor.style.top = (cursorY - 6 + offsetY) + "px";
    
    // Continue animation
    requestAnimationFrame(animateCursor);
  }

  // Start the animation
  animateCursor();

  // Add hover effect for interactive elements with magnetic effect
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .group');

  interactiveElements.forEach((element) => {
    // Skip footer hover elements to avoid conflicts
    if (element.classList.contains("footer-hover")) {
      return;
    }

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      // Increase smoothing for hover state
      cursor.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease";
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursor.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease";
    });
  });

  // Hide cursor when leaving window with smooth fade
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursor.style.transform = "scale(0)";
  });

  // Show cursor when entering window with smooth fade
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursor.style.transform = "scale(1)";
  });

  // Add click effect with ripple
  document.addEventListener("click", () => {
    cursor.classList.add("click");
    setTimeout(() => {
      cursor.classList.remove("click");
    }, 150);
  });

  // Performance optimization: Throttle mousemove events
  let ticking = false;
  function updateCursorPosition(e) {
    if (!ticking) {
      requestAnimationFrame(() => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        ticking = false;
      });
      ticking = true;
    }
  }

  // Replace the original mousemove listener with throttled version
  document.removeEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  document.addEventListener("mousemove", updateCursorPosition);
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
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

    // Close all other FAQ answers
    for (let i = 1; i <= 10; i++) {
      const otherAnswer = document.getElementById(`faq-answer-${i}`);
      const otherIcon = document.getElementById(`faq-icon-${i}`);

      if (otherAnswer && otherIcon && i !== faqNumber) {
        otherAnswer.style.maxHeight = "0px";
        otherAnswer.style.opacity = "0";
        otherAnswer.classList.remove("faq-open");
        otherIcon.classList.remove("rotate-180");
      }
    }

    // Toggle current FAQ
    if (isOpen) {
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";
      answer.classList.remove("faq-open");
      icon.classList.remove("rotate-180");
    } else {
      // Calculate the height of the content
      const scrollHeight = answer.scrollHeight;
      answer.style.maxHeight = scrollHeight + "px";
      answer.style.opacity = "1";
      answer.classList.add("faq-open");
      icon.classList.add("rotate-180");
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

  // Initialize first FAQ as open
  const firstAnswer = document.getElementById("faq-answer-1");
  const firstIcon = document.getElementById("faq-icon-1");
  if (firstAnswer && firstIcon) {
    // Set initial state
    firstAnswer.style.maxHeight = "0px";
    firstAnswer.style.opacity = "0";

    // Open first FAQ after a short delay
    setTimeout(() => {
      const scrollHeight = firstAnswer.scrollHeight;
      firstAnswer.style.maxHeight = scrollHeight + "px";
      firstAnswer.style.opacity = "1";
      firstIcon.classList.add("rotate-180");
    }, 100);
  }
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

// Mobile Menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const hamburgerLine1 = document.getElementById("hamburger-line-1");
  const hamburgerLine2 = document.getElementById("hamburger-line-2");
  const hamburgerLine3 = document.getElementById("hamburger-line-3");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  if (mobileMenuBtn && mobileMenuOverlay) {
    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        // Open menu
        mobileMenuOverlay.classList.remove("translate-x-full");
        mobileMenuOverlay.classList.add("translate-x-0");
        
        // Animate hamburger to X
        hamburgerLine1.classList.add("rotate-45", "translate-y-2");
        hamburgerLine2.classList.add("opacity-0");
        hamburgerLine3.classList.add("-rotate-45", "-translate-y-2");
        
        // Prevent body scroll
        document.body.style.overflow = "hidden";
      } else {
        // Close menu
        mobileMenuOverlay.classList.remove("translate-x-0");
        mobileMenuOverlay.classList.add("translate-x-full");
        
        // Animate X back to hamburger
        hamburgerLine1.classList.remove("rotate-45", "translate-y-2");
        hamburgerLine2.classList.remove("opacity-0");
        hamburgerLine3.classList.remove("-rotate-45", "-translate-y-2");
        
        // Restore body scroll
        document.body.style.overflow = "";
      }
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener("click", toggleMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (isMenuOpen) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay && isMenuOpen) {
        toggleMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    });
  }
});

// Pause/play video on hover for Recent Designs cards
const recentDesignVideos = document.querySelectorAll('.recent-design-video');
recentDesignVideos.forEach((video) => {
  const parentContainer = video.closest('.group');
  if (parentContainer) {
    parentContainer.addEventListener('mouseenter', () => {
      video.pause();
    });
    parentContainer.addEventListener('mouseleave', () => {
      video.play();
    });
  }
});

// Show More/Show Less Projects functionality
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById('show-more-projects');
  const showLessBtn = document.getElementById('show-less-projects');
  const hiddenProjects = document.querySelectorAll('[data-project="hidden"]');
  
  if (showMoreBtn && showLessBtn && hiddenProjects.length > 0) {
    // Show More button functionality
    showMoreBtn.addEventListener('click', function() {
      // Show all hidden projects
      hiddenProjects.forEach(project => {
        project.classList.remove('hidden', 'md:hidden');
        project.classList.add('block');
      });
      
      // Hide the show more button and show the show less button
      showMoreBtn.classList.add('hidden');
      showLessBtn.classList.remove('hidden');
      
      // Smooth scroll to show the newly revealed projects
      setTimeout(() => {
        const firstHiddenProject = hiddenProjects[0];
        if (firstHiddenProject) {
          firstHiddenProject.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }
      }, 100);
    });
    
    // Show Less button functionality
    showLessBtn.addEventListener('click', function() {
      // Hide all hidden projects
      hiddenProjects.forEach(project => {
        project.classList.add('hidden', 'md:hidden');
        project.classList.remove('block');
      });
      
      // Show the show more button and hide the show less button
      showMoreBtn.classList.remove('hidden');
      showLessBtn.classList.add('hidden');
      
      // Smooth scroll back to the projects section
      setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    });
  }
});
