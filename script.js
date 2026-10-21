(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const selectors = [
    '.hero-inner > div',
    '.subhero .wrap',
    '.section-head',
    '.feature-panel',
    '.card',
    '.course-card',
    '.step',
    '.banner',
    '.contact-list > div',
    '.stat',
    '.story-narrative',
    '.story-milestone',
    '.pathway-card',
    '.pathways-footer',
    '.interview-frame'
  ].join(',');

  const items = document.querySelectorAll(selectors);
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.add('reveal');
    if (item.matches('.card, .course-card, .step, .stat')) {
      item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
    }
  });

  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  items.forEach(item => observer.observe(item));
})();



