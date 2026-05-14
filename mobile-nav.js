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
      background: rgba(44, 40, 37, 0.45);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    #mobile-drawer-backdrop.open {
      opacity: 1;
      pointer-events: all;
    }
    #mobile-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 72%;
      max-width: 320px;
      background: #2c2825;
      z-index: 201;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }
    #mobile-drawer.open {
      transform: translateX(0);
    }
    .drawer-accent {
      width: 32px;
      height: 2px;
      background: #8b4a2b;
      margin-bottom: 2rem;
      margin-top: 0.5rem;
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
      padding: 0.9rem 0;
      border-bottom: 1px solid rgba(201, 185, 154, 0.12);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem;
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
      padding: 0.8rem 1rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem;
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
  drawer.innerHTML = `
    <div class="drawer-accent"></div>
    <nav class="drawer-links" aria-label="Mobile navigation">
      <a href="index.html" class="drawer-link${!isGallery ? ' active' : ''}">Home</a>
      <a href="index.html#about" class="drawer-link">About</a>
      <a href="gallery.html" class="drawer-link${isGallery ? ' active' : ''}">Gallery</a>
      <a href="index.html#inquiry" class="drawer-link">Contact</a>
    </nav>
    <div class="drawer-cta">
      <a href="index.html#inquiry">Get a Quote</a>
    </div>
  `;
  document.body.appendChild(drawer);

  // ── Inject hamburger into nav ────────────────────────────────────────────
  const nav = document.querySelector('nav');
  const hamburger = document.createElement('button');
  hamburger.className = 'mobile-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  // ── Open / close logic ───────────────────────────────────────────────────
  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-label', 'Close navigation');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-label', 'Open navigation');
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
})();
