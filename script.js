// Responsive navigation toggle
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

// Shared storage keys
const STORAGE_KEYS = {
  reservations: 'luxuryHotelReservations',
  rooms: 'luxuryHotelRooms',
  messages: 'luxuryHotelMessages'
};

function defaultRooms() {
  return [
    { id: 'room-101', name: 'Deluxe King Room', type: 'Room', category: 'Room', status: 'Booked' },
    { id: 'room-102', name: 'Executive Suite', type: 'Suite', category: 'Room', status: 'Occupied' },
    { id: 'room-103', name: 'Garden Room', type: 'Room', category: 'Room', status: 'Free' },
    { id: 'hall-201', name: 'Conference Hall', type: 'Hall', category: 'Hall', status: 'Booked' },
    { id: 'hall-202', name: 'Dining Hall', type: 'Hall', category: 'Hall', status: 'Free' },
    { id: 'hall-203', name: 'Private Event Area', type: 'Hall', category: 'Hall', status: 'Occupied' }
  ];
}

function defaultReservations() {
  return [
    {
      id: 'res-1001',
      guestName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+233 20 000 0001',
      arrivalDate: '2026-08-15',
      departureDate: '2026-08-18',
      roomType: 'Deluxe King Room',
      stayPlan: 'Half Board',
      guests: 2,
      arrivalTime: '02:00 PM',
      specialRequest: 'Late check-in requested.',
      status: 'Pending',
      createdAt: '2026-08-01T10:00:00'
    },
    {
      id: 'res-1002',
      guestName: 'Kwame Mensah',
      email: 'kwame@example.com',
      phone: '+233 24 111 1002',
      arrivalDate: '2026-09-01',
      departureDate: '2026-09-03',
      roomType: 'Executive Suite',
      stayPlan: 'Executive Suite',
      guests: 2,
      arrivalTime: '04:00 PM',
      specialRequest: 'Two breakfast trays in the room.',
      status: 'Confirmed',
      createdAt: '2026-08-02T14:30:00'
    },
    {
      id: 'res-1003',
      guestName: 'Linda Smith',
      email: 'linda@example.com',
      phone: '+233 27 222 1234',
      arrivalDate: '2026-10-02',
      departureDate: '2026-10-06',
      roomType: 'Conference Hall',
      stayPlan: 'Full Board',
      guests: 10,
      arrivalTime: '06:00 PM',
      specialRequest: 'Meeting seating arrangement for 10 people.',
      status: 'Pending',
      createdAt: '2026-08-04T09:10:00'
    }
  ];
}

function defaultMessages() {
  return [
    {
      id: 'msg-01',
      name: 'Amina Sowah',
      email: 'amina@example.com',
      phone: '+233 20 100 2000',
      subject: 'Accommodation enquiry',
      message: 'I would like to know whether the Deluxe King Room is available this weekend.',
      createdAt: '2026-08-04T15:30:00'
    }
  ];
}

function ensureData() {
  if (!localStorage.getItem(STORAGE_KEYS.rooms)) {
    localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(defaultRooms()));
  }

  if (!localStorage.getItem(STORAGE_KEYS.reservations)) {
    localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(defaultReservations()));
  }

  if (!localStorage.getItem(STORAGE_KEYS.messages)) {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(defaultMessages()));
  }
}

function readStorage(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
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
      renderAdminDashboard();
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

    const name = contactForm.querySelector('input[placeholder="Name"]')?.value.trim();
    const email = contactForm.querySelector('input[placeholder="Email"]')?.value.trim();
    const phone = contactForm.querySelector('input[placeholder="Phone"]')?.value.trim();
    const message = contactForm.querySelector('textarea[placeholder="Message"]')?.value.trim();

    if (!name || !email || !message) {
      return;
    }

    ensureData();

    const messages = readStorage(STORAGE_KEYS.messages);
    messages.push({
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || 'Not provided',
      subject: 'Website Contact Message',
      message,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));

    const success = document.getElementById('contact-success');
    if (success) {
      success.textContent = 'Thank you for contacting us! We will respond soon.';
      success.style.display = 'block';
    }

    contactForm.reset();

    if (typeof renderAdminDashboard === 'function') {
      renderAdminDashboard();
    }

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

    const firstName = document.getElementById('guestFirstName')?.value.trim();
    const lastName = document.getElementById('guestLastName')?.value.trim();
    const email = document.getElementById('guestEmail')?.value.trim();
    const phone = document.getElementById('guestPhone')?.value.trim();
    const arrivalDate = document.getElementById('arrivalDate')?.value;
    const departureDate = document.getElementById('departureDate')?.value;
    const guests = document.getElementById('guestsNumber')?.value;
    const stayPlan = document.getElementById('stayPlan')?.value;
    const roomType = document.getElementById('roomCategory')?.value;
    const arrivalTime = document.getElementById('arrivalTime')?.value;
    const specialRequest = document.getElementById('specialRequest')?.value.trim();

    if (!firstName || !lastName || !email || !phone || !arrivalDate || !departureDate || !guests || !stayPlan || !roomType || !arrivalTime) {
      return;
    }

    ensureData();

    const reservations = readStorage(STORAGE_KEYS.reservations);

    const newReservation = {
      id: `res-${Date.now()}`,
      guestName: `${firstName} ${lastName}`,
      email,
      phone,
      arrivalDate,
      departureDate,
      guests: Number(guests),
      stayPlan,
      roomType,
      arrivalTime,
      specialRequest: specialRequest || 'None',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(reservations));

    const success = document.createElement('div');
    success.className = 'reservation-success-message';
    success.textContent = 'Thank you. Your reservation request has been received.';

    const formWrap = reservationForm.closest('.reservation-wrap');
    if (formWrap) {
      const existing = formWrap.querySelector('.reservation-success-message');
      if (existing) existing.remove();
      formWrap.appendChild(success);
    }

    reservationForm.reset();

    if (typeof renderAdminDashboard === 'function') {
      renderAdminDashboard();
    }
  });
}

// Admin dashboard rendering and control
function getStatusClass(status) {
  const normalized = String(status).toLowerCase().replace(/\s/g, '-');
  return `status-${normalized}`;
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderAdminDashboard() {
  if (!document.getElementById('reservationTableBody') || !document.getElementById('roomGrid') || !document.getElementById('contactMessageList')) {
    return;
  }

  ensureData();

  const rooms = readStorage(STORAGE_KEYS.rooms);
  const reservations = readStorage(STORAGE_KEYS.reservations);
  const messages = readStorage(STORAGE_KEYS.messages);

  const tableBody = document.getElementById('reservationTableBody');
  if (tableBody) {
    tableBody.innerHTML = reservations.map((reservation) => `
      <tr data-reservation-id="${reservation.id}">
        <td>
          <strong>${reservation.guestName}</strong><br />
          <span class="muted-text">${reservation.email}</span>
        </td>
        <td>
          <span>${formatDate(reservation.arrivalDate)}</span><br />
          <span>${formatDate(reservation.departureDate)}</span>
        </td>
        <td>${reservation.roomType}</td>
        <td>${reservation.stayPlan}</td>
        <td><span class="status-pill ${getStatusClass(reservation.status)}">${reservation.status}</span></td>
        <td>${formatDate(reservation.createdAt)}</td>
        <td>
          <button class="action-button" data-action="confirm">Confirm</button>
          <button class="action-button" data-action="edit">Edit</button>
          <button class="danger-button" data-action="delete">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  const roomGrid = document.getElementById('roomGrid');
  if (roomGrid) {
    roomGrid.innerHTML = rooms.map((room) => `
      <article class="room-card">
        <h3>${room.name}</h3>
        <p><strong>Type:</strong> ${room.type}</p>
        <span class="status-pill ${getStatusClass(room.status)} room-status">${room.status}</span>
        <select class="room-select" data-status-select="${room.id}">
          <option value="Free" ${room.status === 'Free' ? 'selected' : ''}>Free</option>
          <option value="Booked" ${room.status === 'Booked' ? 'selected' : ''}>Booked</option>
          <option value="Occupied" ${room.status === 'Occupied' ? 'selected' : ''}>Occupied</option>
        </select>
      </article>
    `).join('');
  }

  const messageList = document.getElementById('contactMessageList');
  if (messageList) {
    if (messages.length === 0) {
      messageList.innerHTML = '<div class="message-card"><p>No messages yet.</p></div>';
    } else {
      messageList.innerHTML = messages.map((message) => `
        <article class="message-card">
          <h3>${message.name}</h3>
          <div class="message-date">${formatDate(message.createdAt)}</div>
          <p><strong>${message.subject}</strong></p>
          <p>${message.message}</p>
          <p><strong>Email:</strong> ${message.email}<br /><strong>Phone:</strong> ${message.phone}</p>
        </article>
      `).join('');
    }
  }
}

if (document.getElementById('reservationTableBody')) {
  ensureData();
  renderAdminDashboard();
}

// Admin reservation table actions
const reservationTableBody = document.getElementById('reservationTableBody');
if (reservationTableBody) {
  reservationTableBody.addEventListener('click', function (event) {
    const target = event.target;
    const action = target.getAttribute('data-action');
    const row = target.closest('tr');
    if (!row || !action) return;

    const reservationId = row.getAttribute('data-reservation-id');
    const reservations = readStorage(STORAGE_KEYS.reservations);
    const reservation = reservations.find((item) => item.id === reservationId);
    if (!reservation) return;

    if (action === 'confirm') {
      reservation.status = 'Confirmed';
      localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(reservations));
      renderAdminDashboard();
    }

    if (action === 'delete') {
      const updatedReservations = reservations.filter((item) => item.id !== reservationId);
      localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(updatedReservations));
      renderAdminDashboard();
    }

    if (action === 'edit') {
      openReservationModal(reservation);
    }
  });
}

// Room status update from dashboard
const roomGrid = document.getElementById('roomGrid');
if (roomGrid) {
  roomGrid.addEventListener('change', function (event) {
    const statusControl = event.target.closest('[data-status-select]');
    if (!statusControl) return;

    const rooms = readStorage(STORAGE_KEYS.rooms);
    const room = rooms.find((item) => item.id === statusControl.getAttribute('data-status-select'));
    if (!room) return;

    room.status = statusControl.value;
    localStorage.setItem(STORAGE_KEYS.rooms, JSON.stringify(rooms));
    renderAdminDashboard();
  });
}

// Reservation modal
function openReservationModal(reservation) {
  const modal = document.getElementById('reservationModal');
  const modalTitle = document.getElementById('modalTitle');
  const form = document.getElementById('adminReservationForm');
  const reservationId = document.getElementById('reservationId');
  const guestName = document.getElementById('adminGuestName');
  const guestEmail = document.getElementById('adminGuestEmail');
  const guestPhone = document.getElementById('adminGuestPhone');
  const stayPlan = document.getElementById('adminStayPlan');
  const arrivalDate = document.getElementById('adminArrivalDate');
  const departureDate = document.getElementById('adminDepartureDate');
  const roomType = document.getElementById('adminRoomType');
  const status = document.getElementById('adminStatus');
  const specialRequest = document.getElementById('adminSpecialRequest');

  if (!modal || !form || !reservationId || !guestName || !guestEmail || !guestPhone || !stayPlan || !arrivalDate || !departureDate || !roomType || !status || !specialRequest) return;

  const rooms = readStorage(STORAGE_KEYS.rooms);
  roomType.innerHTML = rooms.map((room) => `<option value="${room.name}">${room.name}</option>`).join('');

  reservationId.value = reservation.id || '';
  modalTitle.textContent = reservation.id ? 'Edit Reservation' : 'Create Reservation';
  guestName.value = reservation.guestName || '';
  guestEmail.value = reservation.email || '';
  guestPhone.value = reservation.phone || '';
  stayPlan.value = reservation.stayPlan || 'Bed & Breakfast';
  arrivalDate.value = reservation.arrivalDate || '';
  departureDate.value = reservation.departureDate || '';
  roomType.value = reservation.roomType || rooms[0]?.name || '';
  status.value = reservation.status || 'Pending';
  specialRequest.value = reservation.specialRequest || '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

const createReservationButton = document.getElementById('createReservation');
if (createReservationButton) {
  createReservationButton.addEventListener('click', function () {
    const empty = {
      id: '',
      guestName: '',
      email: '',
      phone: '',
      arrivalDate: '',
      departureDate: '',
      stayPlan: 'Bed & Breakfast',
      roomType: '',
      status: 'Pending',
      specialRequest: '',
      guests: 1,
      arrivalTime: '02:00 PM'
    };

    openReservationModal(empty);
  });
}

const modalCloseButton = document.getElementById('modalClose');
const cancelModalButton = document.getElementById('cancelModal');
if (modalCloseButton) modalCloseButton.addEventListener('click', closeReservationModal);
if (cancelModalButton) cancelModalButton.addEventListener('click', closeReservationModal);

const modal = document.getElementById('reservationModal');
if (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeReservationModal();
  });
}

const adminReservationForm = document.getElementById('adminReservationForm');
if (adminReservationForm) {
  adminReservationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const reservations = readStorage(STORAGE_KEYS.reservations);
    const id = document.getElementById('reservationId').value || `res-${Date.now()}`;

    const reservation = reservations.find((item) => item.id === id) || {
      id,
      createdAt: new Date().toISOString()
    };

    reservation.guestName = document.getElementById('adminGuestName').value.trim();
    reservation.email = document.getElementById('adminGuestEmail').value.trim();
    reservation.phone = document.getElementById('adminGuestPhone').value.trim();
    reservation.arrivalDate = document.getElementById('adminArrivalDate').value;
    reservation.departureDate = document.getElementById('adminDepartureDate').value;
    reservation.stayPlan = document.getElementById('adminStayPlan').value;
    reservation.roomType = document.getElementById('adminRoomType').value;
    reservation.status = document.getElementById('adminStatus').value;
    reservation.specialRequest = document.getElementById('adminSpecialRequest').value.trim();
    reservation.guests = reservation.guests || 1;
    reservation.arrivalTime = reservation.arrivalTime || '02:00 PM';

    const existingIndex = reservations.findIndex((item) => item.id === id);
    if (existingIndex >= 0) {
      reservations[existingIndex] = reservation;
    } else {
      reservations.push(reservation);
    }

    localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(reservations));
    closeReservationModal();
    renderAdminDashboard();
  });
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.onscroll = function() {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  };

  scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// Initialize site data
ensureData();
