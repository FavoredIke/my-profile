// ---------- Mobile menu ----------
const toggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

// Close the menu after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ---------- Scroll animations (fade-in + skill bars) ----------
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        // Animate skill bars inside this element
        entry.target.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
        });

        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---------- Contact form validation ----------
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    document.getElementById(fieldId + '-error').textContent = message;
    field.closest('.form-group').classList.toggle('invalid', Boolean(message));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (name.length < 2) {
        setError('name', 'Please enter your name (at least 2 characters).');
        valid = false;
    } else {
        setError('name', '');
    }

    if (!emailPattern.test(email)) {
        setError('email', 'Please enter a valid email address.');
        valid = false;
    } else {
        setError('email', '');
    }

    if (message.length < 10) {
        setError('message', 'Your message should be at least 10 characters.');
        valid = false;
    } else {
        setError('message', '');
    }

    if (!valid) return;

    // NOTE: This only validates in the browser. To actually receive messages,
    // send the data to a backend or a form service (e.g. Formspree) here.
    // Always validate again on the server: browser checks are easy to bypass.
    statusEl.textContent = 'Thanks! Your message passed validation (demo only, not sent yet).';
    form.reset();
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
