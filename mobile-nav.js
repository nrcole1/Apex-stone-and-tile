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
    #mobile-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(44, 40, 37, 0.55);
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    #mobile-drawer-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }
    #mobile-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 78%;
      max-width: 340px;
      background: #2c2825;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      padding: 1.25rem 1.5rem 1.5rem;
      box-shadow: -8px 0 24px rgba(0, 0, 0, 0.25);
    }
    #mobile-drawer.open {
      transform: translateX(0);
    }
    /* Hide the main nav while the drawer is open so the cream nav
       doesn't bleed over the top of the dark drawer */
    body.drawer-open nav { visibility: hidden; }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }
    .drawer-brand {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }
    .drawer-brand span:first-child {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.05rem;
      letter-spacing: 0.12em;
      color: #fdfaf7;
    }
    .drawer-brand span:last-child {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.6rem;
      letter-spacing: 0.25em;
      color: #b89a6a;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .drawer-close {
      background: none;
      border: none;
      cursor: pointer;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e8e0d5;
      transition: color 0.2s;
    }
    .drawer-close:hover { color: #b89a6a; }
    .drawer-close svg { width: 18px; height: 18px; }

    .drawer-accent {
      width: 32px;
      height: 2px;
      background: #8b4a2b;
      margin-bottom: 1.25rem;
      flex-shrink: 0;
    }
    .drawer-links {
      display: flex;
      flex-direction: column;
      list-style: none;
    }
    .drawer-link {
      display: block;
      text-decoration: none;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(201, 185, 154, 0.12);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #e8e0d5;
      transition: color 0.2s;
    }
    .drawer-link:last-child { border-bottom: none; }
    .drawer-link:hover,
    .drawer-link.active { color: #b89a6a; }
    .drawer-cta {
      margin-top: auto;
      padding-top: 1.5rem;
      flex-shrink: 0;
    }
    .drawer-cta a {
      display: block;
      text-align: center;
      background: #8b4a2b;
      color: #fdfaf7;
      padding: 0.9rem 1rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .drawer-cta a:hover { background: #a0583a; }
  `;
  document.head.appendChild(style);

  // ── Detect active page ───────────────────────────────────────────────────
  const isGallery = window.location.pathname.includes('gallery');

  // ── Inject backdrop ──────────────────────────────────────────────────────
  const backdrop = document.createElement('div');
  backdrop.id = 'mobile-drawer-backdrop';
  document.body.appendChild(backdrop);

  // ── Inject drawer panel ──────────────────────────────────────────────────
  const drawer = document.createElement('div');
  drawer.id = 'mobile-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Navigation menu');
  drawer.setAttribute('aria-modal', 'true');
  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-brand">
        <span>Apex Stone &amp; Tile</span>
        <span>Fernandina Beach</span>
      </div>
      <button class="drawer-close" type="button" aria-label="Close navigation">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="drawer-accent"></div>
    <div class="drawer-links" role="navigation" aria-label="Mobile navigation">
      <a href="index.html" class="drawer-link${!isGallery ? ' active' : ''}">Home</a>
      <a href="index.html#services" class="drawer-link">Services</a>
      <a href="gallery.html" class="drawer-link${isGallery ? ' active' : ''}">Gallery</a>
      <a href="index.html#about" class="drawer-link">About</a>
      <a href="index.html#inquiry" class="drawer-link">Contact</a>
    </div>
    <div class="drawer-cta">
      <a href="index.html#inquiry">Get a Quote</a>
    </div>
  `;
  document.body.appendChild(drawer);

  // ── Inject hamburger into nav ────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (!nav) return;
  const hamburger = document.createElement('button');
  hamburger.className = 'mobile-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  const closeBtn = drawer.querySelector('.drawer-close');
  const drawerLinks = drawer.querySelectorAll('.drawer-link, .drawer-cta a');
  // Both "Contact" and "Get a Quote" point at the inquiry form.
  const inquiryLinks = drawer.querySelectorAll('a[href$="#inquiry"]');

  // ── Open / close logic ───────────────────────────────────────────────────
  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-label', 'Close navigation');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-label', 'Open navigation');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close after tapping any link so the next section is visible
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // ── "Contact" / "Get a Quote" → land on the inquiry form, not a reload ────
  // When the inquiry section is already on this page (the home page), close the
  // drawer and smooth-scroll straight to it. Reloading via the href would jump
  // before the JS-populated content settles and land at the wrong spot. On the
  // gallery page (no #inquiry present) the normal href navigation is used.
  inquiryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const inquiry = document.getElementById('inquiry');
      if (!inquiry) return; // let the href take us to index.html#inquiry
      e.preventDefault();
      closeDrawer();
      inquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
})();
