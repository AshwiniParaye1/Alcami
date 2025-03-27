document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");

      if (mainNav) {
        mainNav.classList.toggle("active");

        if (mainNav.classList.contains("active")) {
          mainNav.style.display = "block";
        } else {
          mainNav.style.display = "none";
        }
      }
    });
  }

  // Search Toggle
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.getElementById("searchBox");
  const closeSearch = document.querySelector(".close-search");

  if (searchToggle && searchBox) {
    searchToggle.addEventListener("click", function () {
      searchBox.classList.toggle("active");
    });

    if (closeSearch) {
      closeSearch.addEventListener("click", function () {
        searchBox.classList.remove("active");
      });
    }

    // Close search on click outside
    document.addEventListener("click", function (event) {
      if (
        !searchBox.contains(event.target) &&
        !searchToggle.contains(event.target)
      ) {
        searchBox.classList.remove("active");
      }
    });
  }

  // Product Gallery
  const mainProductImage = document.getElementById("mainProductImage");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");
  const galleryDots = document.getElementById("galleryDots");
  const productThumbnails = document.getElementById("productThumbnails");

  if (mainProductImage && productThumbnails) {
    const productImages = [
      "assets/product-main.png",
      "assets/product-alt-1.png",
      "assets/product-alt-2.png",
      "assets/product-alt-3.png"
    ];

    let currentImageIndex = 0;

    // Function to update the main image
    function updateMainImage(index) {
      mainProductImage.src = productImages[index];

      // Update active thumbnail
      const thumbnails = productThumbnails.querySelectorAll(".thumbnail");
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");

      // Update active dot
      const dots = galleryDots.querySelectorAll(".dot");
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");

      currentImageIndex = index;
    }

    // Next button
    if (galleryNext) {
      galleryNext.addEventListener("click", function () {
        let nextIndex = currentImageIndex + 1;
        if (nextIndex >= productImages.length) {
          nextIndex = 0;
        }
        updateMainImage(nextIndex);
      });
    }

    // Previous button
    if (galleryPrev) {
      galleryPrev.addEventListener("click", function () {
        let prevIndex = currentImageIndex - 1;
        if (prevIndex < 0) {
          prevIndex = productImages.length - 1;
        }
        updateMainImage(prevIndex);
      });
    }

    // Thumbnail clicks
    const thumbnails = productThumbnails.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        updateMainImage(index);
      });
    });

    // Dot clicks
    const dots = galleryDots.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        updateMainImage(index);
      });
    });
  }

  // Radio button functionality for Add to Cart
  const flavorRadios = document.querySelectorAll('input[name="flavor"]');
  const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (flavorRadios.length && purchaseRadios.length && addToCartBtn) {
    function updateAddToCartLink() {
      let selectedFlavor = "";
      let selectedPurchase = "";

      flavorRadios.forEach((radio) => {
        if (radio.checked) {
          selectedFlavor = radio.value;
        }
      });

      purchaseRadios.forEach((radio) => {
        if (radio.checked) {
          selectedPurchase = radio.value;
        }
      });

      // Create a unique link based on selections
      const baseUrl = "https://example.com/cart/add?product=alcami-elements";
      const newUrl = `${baseUrl}&flavor=${selectedFlavor}&purchase=${selectedPurchase}`;

      addToCartBtn.href = newUrl;
    }

    // Initialize the link
    updateAddToCartLink();

    // Update link when selections change
    flavorRadios.forEach((radio) => {
      radio.addEventListener("change", updateAddToCartLink);
    });

    purchaseRadios.forEach((radio) => {
      radio.addEventListener("change", updateAddToCartLink);
    });
  }

  // Quantity selector
  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");

  if (quantityInput && minusBtn && plusBtn) {
    minusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    plusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
      }
    });
  }

  // Stats counter animation
  const statElements = [
    { id: "stat1", target: 84 },
    { id: "stat2", target: 78 },
    { id: "stat3", target: 92 },
    { id: "stat4", target: 96 }
  ];

  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    statElements.forEach((stat) => {
      const element = document.getElementById(stat.id);
      if (!element) return;

      let current = 0;
      const increment = Math.ceil(stat.target / 50); // Divide animation into 50 steps
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        element.textContent = `${current}%`;
      }, 30);
    });

    statsAnimated = true;
  }

  // Check if stats section is in viewport and trigger animation
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    window.addEventListener("scroll", function () {
      if (isInViewport(statsSection)) {
        animateStats();
      }
    });

    // Check on page load as well
    if (isInViewport(statsSection)) {
      animateStats();
    }
  }

  // Testimonials Slider
  const testimonialsContainer = document.getElementById(
    "testimonialsContainer"
  );
  const testimonialPrev = document.getElementById("testimonialPrev");
  const testimonialNext = document.getElementById("testimonialNext");
  const testimonialDots = document.getElementById("testimonialDots");

  if (testimonialsContainer && testimonialPrev && testimonialNext) {
    const testimonials = testimonialsContainer.querySelectorAll(".testimonial");
    let currentTestimonialIndex = 0;

    // Function to scroll to a specific testimonial
    function scrollToTestimonial(index) {
      if (!testimonials[index]) return;

      const testimonialWidth = testimonials[0].offsetWidth;
      const gap = 20; // Gap between testimonials (matches CSS)
      const scrollPosition = index * (testimonialWidth + gap);

      testimonialsContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });

      // Update active dot
      if (testimonialDots) {
        const dots = testimonialDots.querySelectorAll(".dot");
        dots.forEach((dot) => dot.classList.remove("active"));
        dots[index].classList.add("active");
      }

      currentTestimonialIndex = index;
    }

    // Next button
    testimonialNext.addEventListener("click", function () {
      let nextIndex = currentTestimonialIndex + 1;
      if (nextIndex >= testimonials.length) {
        nextIndex = 0;
      }
      scrollToTestimonial(nextIndex);
    });

    // Previous button
    testimonialPrev.addEventListener("click", function () {
      let prevIndex = currentTestimonialIndex - 1;
      if (prevIndex < 0) {
        prevIndex = testimonials.length - 1;
      }
      scrollToTestimonial(prevIndex);
    });

    // Dot clicks
    if (testimonialDots) {
      const dots = testimonialDots.querySelectorAll(".dot");
      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          const index = parseInt(this.getAttribute("data-index"));
          scrollToTestimonial(index);
        });
      });
    }
  }

  // FAQ Accordion
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", function () {
      // Close all other items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Here you would typically show/hide content based on the selected tab
      const tabId = this.getAttribute("data-tab");
      console.log(`Tab selected: ${tabId}`);

      // For a real implementation, you would have code like:
      // const tabContents = document.querySelectorAll('.tab-content');
      // tabContents.forEach(content => content.style.display = 'none');
      // document.getElementById(`${tabId}-content`).style.display = 'block';
    });
  });

  // Lazy loading for images
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.getAttribute("data-src");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      lazyImageObserver.observe(img);
    });
  }
});
