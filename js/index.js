const swiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    360: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || "0";
          entry.target.style.transitionDelay = `${delay / 1000}s`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  fadeInElements.forEach((el) => observer.observe(el));

  // Share
  const shareLinks = document.querySelectorAll(".share");
  const alertContainer = document.getElementById("alert-container");

  shareLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const platform = link.getAttribute("data-share-to");
      const currentUrl = encodeURIComponent(window.location.href);
      const shareText = encodeURIComponent("Check this out!");
      let shareUrl = "";

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
          break;
        case "youtube":
          shareUrl = `https://www.youtube.com/results?search_query=${shareText}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${shareText} ${currentUrl}`;
          break;
        case "instagram":
          navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
              showAlert(
                "success",
                "Link copied! Share this on Instagram by pasting it into a post or story."
              );
            })
            .catch((err) => {
              showAlert("danger", "Failed to copy the link. Please try again.");
              console.error("Clipboard error: ", err);
            });
          return;
        default:
          console.error("Unsupported platform:", platform);
          return;
      }

      window.open(shareUrl, "_blank");
    });
  });
  function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.classList.remove("show");
      alert.addEventListener("transitionend", () => alert.remove());
    }, 5000);
  }
});

document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseover", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.show();
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.hide();
    }
  });
});
// Booking Form - Send to WhatsApp
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    
    // Format the message for WhatsApp
    const message = `🌿 *Nouvelle Réservation - Saratherapie*\n\n` +
                   `👤 *Nom:* ${name}\n` +
                   `📱 *Téléphone:* ${phone}\n` +
                   `📅 *Date souhaitée:* ${date}\n` +
                   `💆 *Service:* ${service}\n\n` +
                   `Merci de confirmer ma réservation.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (without + sign, with country code)
    const whatsappNumber = '212689519190';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Optional: Reset form after submission
    bookingForm.reset();
  });
}

const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.style.display = "block";
    setTimeout(() => {
      popupMessage.style.display = "none";
    }, 3000);
  });
}
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const popupMessage = document.getElementById("popupMessageContact");
      popupMessage.style.display = "block";
      setTimeout(() => {
        popupMessage.style.display = "none";
      }, 3000);
    });
}

// Testimonials Carousel
const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 800,
  navigation: {
    nextEl: ".testimonial-nav-next",
    prevEl: ".testimonial-nav-prev",
  },
  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  effect: 'slide',
  grabCursor: true,
});

// Footer Newsletter Form Handler
const footerNewsletterForm = document.getElementById('footerNewsletterForm');
if (footerNewsletterForm) {
  footerNewsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // Show success message
      const button = this.querySelector('.footer-newsletter-button');
      const originalText = button.textContent;
      
      button.textContent = '✓ Inscrit !';
      button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        emailInput.value = '';
      }, 3000);
      
      // Here you can add actual newsletter subscription logic
      console.log('Newsletter subscription for:', email);
    }
  });
}
