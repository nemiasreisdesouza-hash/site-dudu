// ===== HEADER DINÂMICO NO SCROLL =====
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});

// Fecha menu ao clicar em link
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ===== SCROLL SUAVE COM OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== ANIMAÇÕES DE ENTRADA (IntersectionObserver) =====
const fadeEls = [
  '.hero-title', '.hero-sub', '.hero-ctas', '.hero-badges',
  '.about-text', '.about-visual',
  '.section-head',
  '.service-card', '.graphic-item',
  '.cta-inner'
];
fadeEls.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });
});

// Observador para animações gerais
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// ===== ANIMAÇÃO DE ENTRADA DOS CASES DO PORTFÓLIO =====
(function() {
  const cases = document.querySelectorAll('.portfolio-case');
  cases.forEach((item, i) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = (i % 2) * 120 + 'ms';
  });

  const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        caseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  cases.forEach(item => caseObserver.observe(item));
})();

// ===== FILTROS DOS CASES DO PORTFÓLIO =====
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCases = document.querySelectorAll('.portfolio-case');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCases.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        if (show) {
          item.classList.remove('filter-out');
          item.style.transitionDelay = (index * 50) + 'ms';
          item.classList.add('filter-in');
          setTimeout(() => {
            item.classList.remove('filter-in');
          }, 600);
        } else {
          item.classList.add('filter-out');
          item.classList.remove('filter-in');
          item.style.transitionDelay = '0ms';
        }
      });
    });
  });
})();

// ===== ANO NO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== RASTREAMENTO SIMPLES DE CLIQUE WHATSAPP =====
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.gtag) {
      gtag('event', 'click_whatsapp', {
        event_category: 'conversao',
        event_label: btn.textContent.trim().slice(0, 50)
      });
    }
  });
});
