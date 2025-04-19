// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    disable: window.innerWidth < 768 ? true : false // Disable animations on mobile for better performance
  })

  // Initialize Feather icons
  feather.replace()

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const checkbox = document.getElementById("check")
  const navLinks = document.querySelectorAll(".nav-links a")

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        checkbox.checked = false
      }

      // Smooth scroll to section
      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Navbar scroll effect and active section highlighting
  const sections = document.querySelectorAll("section[id]")
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav")
    const scrollY = window.scrollY

    // Navbar scroll effect
    if (scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Back to top button visibility
    if (scrollY > 300) {
      backToTopButton.classList.add("show")
    } else {
      backToTopButton.classList.remove("show")
    }

    // Active section highlighting
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  })

  // Back to top button click event
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Gallery filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Gallery lightbox
  const lightbox = document.querySelector(".lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxClose = document.querySelector(".lightbox-close")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").getAttribute("src")
      lightboxImage.setAttribute("src", imgSrc)
      lightbox.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  let currentSlide = 0

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    dots[index].classList.add("active")
    currentSlide = index
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showSlide(currentSlide)
  })

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  })

  // Auto slide testimonials - slower on mobile
  const autoSlideInterval = window.innerWidth < 768 ? 7000 : 5000
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }, autoSlideInterval)

  // Contact form validation
  const contactForm = document.getElementById("contactForm")
  const toast = document.getElementById("toast")
  const toastClose = document.querySelector(".toast-close")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let isValid = true
      const name = document.getElementById("name")
      const email = document.getElementById("email")
      const phone = document.getElementById("phone")
      const eventDate = document.getElementById("eventDate")
      const eventType = document.getElementById("eventType")
      const message = document.getElementById("message")

      // Reset error messages
      document.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none"
      })

      // Validate name
      if (!name.value.trim()) {
        document.getElementById("nameError").textContent = "Please enter your name"
        document.getElementById("nameError").style.display = "block"
        isValid = false
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address"
        document.getElementById("emailError").style.display = "block"
        isValid = false
      }

      // Validate phone
      if (!phone.value.trim()) {
        document.getElementById("phoneError").textContent = "Please enter your phone number"
        document.getElementById("phoneError").style.display = "block"
        isValid = false
      }

      // Validate event date
      if (!eventDate.value) {
        document.getElementById("eventDateError").textContent = "Please select an event date"
        document.getElementById("eventDateError").style.display = "block"
        isValid = false
      }

      // Validate event type
      if (!eventType.value.trim()) {
        document.getElementById("eventTypeError").textContent = "Please enter the event type"
        document.getElementById("eventTypeError").style.display = "block"
        isValid = false
      }

      // Validate message
      if (!message.value.trim()) {
        document.getElementById("messageError").textContent = "Please enter your message"
        document.getElementById("messageError").style.display = "block"
        isValid = false
      }

      // If form is valid, show toast and reset form
      if (isValid) {
        // In a real application, you would send the form data to a server here
        contactForm.reset()
        toast.classList.add("show")

        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove("show")
        }, 5000)
      }
    })
  }

  // Close toast when clicking the close button
  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toast.classList.remove("show")
    })
  }

  // Create and animate flower elements
  createFlowerAnimations()
  
  // Handle responsive behavior for embeds
  adjustResponsiveEmbeds()
  
  // Add resize listener for responsive adjustments
  window.addEventListener('resize', function() {
    adjustResponsiveEmbeds()
  })
})

// Create flower animations
function createFlowerAnimations() {
  const flowerContainer = document.querySelector(".flower-container")

  // Skip if flower container doesn't exist
  if (!flowerContainer) return

  // Create additional flowers dynamically
  for (let i = 0; i < 15; i++) {
    const flower = document.createElement("div")
    flower.className = "flower"

    // Randomize flower properties
    const size = Math.random() * 30 + 20 // 20-50px
    const posX = Math.random() * 100 // 0-100%
    const delay = Math.random() * 15 // 0-15s
    const duration = Math.random() * 10 + 15 // 15-25s

    flower.style.width = `${size}px`
    flower.style.height = `${size}px`
    flower.style.left = `${posX}%`
    flower.style.top = "-50px"
    flower.style.animationDelay = `${delay}s`
    flower.style.animationDuration = `${duration}s`

    // Randomize flower color
    const colors = ["#e08e6d", "#f9a392", "#d17a57", "#7d5a50"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    flower.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${randomColor.replace("#", "%23")}" d="M50 0C55 25 75 30 100 50C75 70 55 75 50 100C45 75 25 70 0 50C25 30 45 25 50 0Z"/></svg>')`

    flowerContainer.appendChild(flower)
  }
}

// Function to adjust responsive embeds based on screen size
function adjustResponsiveEmbeds() {
  const embeds = document.querySelectorAll('.responsive-embed')
  
  embeds.forEach(embed => {
    if (window.innerWidth < 768) {
      embed.style.paddingBottom = '56.25%' // 16:9 aspect ratio for mobile
    } else {
      embed.style.paddingBottom = '20.25%' // Original aspect ratio for desktop
    }
  })
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm')
  const newsletterSuccess = document.getElementById('newsletterSuccess')
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault()
      
      // In a real application, you would send the form data to a server here
      newsletterForm.reset()
      newsletterSuccess.classList.add('show')
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        newsletterSuccess.classList.remove('show')
      }, 5000)
    })
  }
})






document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Stop the form from refreshing the page

  // Collect data
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let eventDate = document.getElementById("eventDate").value;
  let eventType = document.getElementById("eventType").value;
  let message = document.getElementById("message").value;

  // Your WhatsApp number (with country code, no +, no spaces)
  let whatsappNumber = "917904927094"; // Change this to your number

  // Create the WhatsApp message
  let whatsappMessage = `Hello, I have a new inquiry:
  
Name: ${name}
Email: ${email}
Phone: ${phone}
Event Date: ${eventDate}
Event Type: ${eventType}
Message: ${message}`;

  // Encode the message for URL
  let encodedMessage = encodeURIComponent(whatsappMessage);

  // Create WhatsApp URL
  let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");
});