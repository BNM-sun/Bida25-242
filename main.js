
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});


document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
   
  });
});


const stars = document.querySelectorAll('.star-btn');
stars.forEach((star, idx) => {
  star.addEventListener('click', () => {
    stars.forEach((s, i) => s.classList.toggle('lit', i <= idx));
  });
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => s.classList.toggle('lit', i <= idx));
  });
});
document.querySelector('.rating-group')?.addEventListener('mouseleave', () => {
  const selected = [...stars].findIndex(s => s.dataset.selected === 'true');
  stars.forEach((s, i) => s.classList.toggle('lit', i <= selected));
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-item, .stat, .review-card, .dest-card-full').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});