(function () {
  // ── Inject styles ────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .mobile-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
    }
    .mobile-hamburger span {
      display: block;
      height: 2px;
      background: var(--stone, #2c2825);
      border-radius: 1px;
      transition: width 0.2s;
    }
    .mobile-hamburger span:nth-child(1),
    .mobile-hamburger span:nth-child(2) { width: 22px; }
    .mobile-hamburger span:nth-child(3) { width: 14px; }
    @media (max-width: 900px) {
      .mobile-hamburger { display: flex; }
    }
  `;
  document.head.appendChild(style);

  // ── Inject hamburger into nav ────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (!nav) return;
  const hamburger = document.createElement('button');
  hamburger.className = 'mobile-hamburger';
  hamburger.setAttribute('aria-label', 'Request a quote');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  // ── Scroll helper → jump straight to the quote form ──────────────────────
  // The inquiry form lives on index.html. From the gallery page we hop over
  // with a hash so the browser lands on the form once index.html loads.
  function goToQuoteForm(e) {
    if (e) e.preventDefault();
    const inquiry = document.getElementById('inquiry');
    if (inquiry) {
      inquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = 'index.html#inquiry';
    }
  }

  // The hamburger takes mobile visitors straight to the quote form at the
  // bottom of the page so they can fill out their information right away.
  hamburger.addEventListener('click', goToQuoteForm);
})();
