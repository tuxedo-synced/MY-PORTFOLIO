// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});
// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .stagger');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));
// ===== NAVBAR SCROLL STYLE =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0, 10, 22, 0.95)';
  } else {
    navbar.style.background = 'rgba(0, 15, 31, 0.7)';
  }
});
// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObserver.observe(s));
// ===== CONTACT FORM =====
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  // --- Option 1: mailto fallback ---
  const mailtoLink = `mailto:yourname@email.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;
  // Show success state
  status.classList.add('success');
  form.reset();
  setTimeout(() => status.classList.remove('success'), 5000);
});
/* 
 * ===== OPTIONAL: EMAILJS INTEGRATION =====
 * 1. Sign up at https://www.emailjs.com
 * 2. Create a service + template
 * 3. Replace the mailto block above with:
 *
 * emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
 *   from_name: name,
 *   reply_to: email,
 *   subject: subject,
 *   message: message
 * }, 'YOUR_PUBLIC_KEY')
 * .then(() => { status.classList.add('success'); form.reset(); })
 * .catch(err => console.error('EmailJS error:', err));
 *
 * Also add this in <head>:
 * <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"><\/script>
 * <script> emailjs.init('YOUR_PUBLIC_KEY'); <\/script>
*/
