// Responsive menu toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Smooth scroll for anchor links
const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
allAnchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Testimonial slider
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial(idx) {
  if (testimonials.length) {
    testimonials.forEach((el, i) => el.classList.toggle('active', i === idx));
  }
}
function nextTestimonial() {
  if (testimonials.length) {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }
}
function prevTestimonial() {
  if (testimonials.length) {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
  }
}
if (testimonials.length) {
  showTestimonial(testimonialIndex);
  setInterval(nextTestimonial, 6000);
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const success = document.getElementById('contact-success');
    if (success) {
      success.textContent = "Thank you for contacting us! We'll get back to you soon.";
      success.style.display = 'block';
    }
    contactForm.reset();
    setTimeout(() => {
      const success = document.getElementById('contact-success');
      if (success) {
        success.style.display = 'none';
      }
    }, 4000);
  });
}

// Reservation form handler
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formButton = reservationForm.querySelector('button[type="submit"]');
    if (formButton) {
      const originalText = formButton.textContent;
      formButton.textContent = 'Request Sent';
      formButton.disabled = true;
      setTimeout(() => {
        formButton.textContent = originalText;
        formButton.disabled = false;
        reservationForm.reset();
      }, 2600);
    }
  });
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.onscroll = function() {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };
  scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// Staff login handler
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginPanel = document.getElementById('adminLoginPanel');
const adminDashboard = document.getElementById('adminDashboard');
const adminLogout = document.getElementById('adminLogout');
const adminLoginError = document.getElementById('adminLoginError');

if (adminLoginForm && adminLoginPanel && adminDashboard) {
  const isAuthenticated = sessionStorage.getItem('luxuryHotelStaffAuth') === 'true';

  if (isAuthenticated) {
    adminLoginPanel.style.display = 'none';
    adminDashboard.hidden = false;
  }

  adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('staffEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('staffPassword')?.value.trim();

    if (email === 'staff@luxuryhotel.com' && password === 'staff123') {
      sessionStorage.setItem('luxuryHotelStaffAuth', 'true');
      adminLoginPanel.style.display = 'none';
      adminDashboard.hidden = false;
    } else {
      if (adminLoginError) {
        adminLoginError.textContent = 'Invalid staff email or password.';
        adminLoginError.classList.add('show');
      }
    }
  });
}

if (adminLogout) {
  adminLogout.addEventListener('click', function() {
    sessionStorage.removeItem('luxuryHotelStaffAuth');

    if (adminLoginPanel) {
      adminLoginPanel.style.display = 'block';
    }

    if (adminDashboard) {
      adminDashboard.hidden = true;
    }

    const adminEmailField = document.getElementById('staffEmail');
    const adminPasswordField = document.getElementById('staffPassword');
    if (adminEmailField) adminEmailField.value = '';
    if (adminPasswordField) adminPasswordField.value = '';
  });
}
