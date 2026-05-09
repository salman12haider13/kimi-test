/* =========================================================
   SALMAN HAIDER — GIS PORTFOLIO SCRIPTS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- NAVIGATION ---------- */
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('#navToggle');
  const menu = document.querySelector('#navMenu');
  const links = document.querySelectorAll('.nav-menu a');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', open);
    });
    links.forEach(l => l.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  function setActive() {
    const y = window.scrollY + 100;
    let cur = null;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.getAttribute('id'); });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }
  if (sections.length) {
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('load', setActive);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revObs.observe(el));

  /* ---------- PROJECT TOGGLE ---------- */
  const grid = document.querySelector('#projectGrid');
  const btn = document.querySelector('#toggleProjects');
  if (grid && btn) {
    btn.addEventListener('click', () => {
      const expanded = grid.classList.toggle('expanded');
      btn.textContent = expanded ? 'Show Fewer Projects ↑' : 'Show More Projects ↓';
    });
  }

  /* ---------- MAP SHOWCASE ---------- */
  const maps = [
    { title: "Paradise Valley Trail Run Routes", cat: "Terrain / Route Mapping", text: "A terrain-focused race route map showing 5K and 10K trail routes with elevation, route context, and supporting map elements.", focus: "Route design, terrain, elevation profile", tools: "ArcGIS Pro, cartographic layout", img: "assets/images/maps/previews/paradise-valley-trail-run.jpg", story: "maps/paradise-valley-trail-run.html", alt: "Paradise Valley Trail Run route map preview" },
    { title: "Heathrow's Global Reach", cat: "Flowline Cartography", text: "A global aviation flow map showing Heathrow's international connections using a dark basemap, curved flowlines, and strong visual hierarchy.", focus: "Flowlines, global connections, visual hierarchy", tools: "ArcGIS Pro, cartographic design", img: "assets/images/maps/previews/heathrow-global-reach.jpg", story: "maps/heathrow-global-reach.html", alt: "Heathrow global reach flowline map preview" },
    { title: "Flood Affected Settlements of Chiniot", cat: "Disaster Mapping", text: "A flood impact map showing affected settlements, district context, satellite imagery, and supporting location information for disaster mapping.", focus: "Flood impact, settlements, satellite imagery", tools: "ArcGIS Pro, remote sensing context", img: "assets/images/maps/previews/flood-affected-settlements.jpg", story: "maps/flood-affected-settlements.html", alt: "Flood affected settlements of Chiniot map preview" },
    { title: "Town of Olds and Surrounding Area", cat: "Reference Mapping", text: "A traditional reference map showing the Town of Olds and surrounding area with road hierarchy, water features, railway, inset map, and supporting map elements.", focus: "Reference mapping, road hierarchy, inset design", tools: "ArcGIS Pro, cartographic layout", img: "assets/images/maps/previews/town-of-olds-reference-map.jpg", story: "maps/town-of-olds-reference-map.html", alt: "Town of Olds and surrounding area reference map preview" },
    { title: "Red Carpet Community Spatial Overview", cat: "Urban / Neighbourhood Mapping", text: "A local-scale community map showing building types, roads, parks, bus stops, and community boundary with a clean inset and neighbourhood-level layout.", focus: "Community mapping, urban features, local context", tools: "ArcGIS Pro, urban cartography", img: "assets/images/maps/previews/red-carpet-community-overview.jpg", story: "maps/red-carpet-community-overview.html", alt: "Red Carpet community spatial overview map preview" },
    { title: "Housing Cost in Calgary: DA vs CT", cat: "Urban GIS / Census Mapping", text: "A census-based comparison map showing housing costs at dissemination area and census tract scales, useful for explaining spatial aggregation and scale effects.", focus: "Housing cost, census geography, DA vs CT comparison", tools: "ArcGIS Pro, census mapping", img: "assets/images/maps/previews/housing-cost-da-vs-ct.png", story: "maps/housing-cost-da-vs-ct.html", alt: "Housing cost map comparing dissemination areas and census tracts" },
    { title: "Calgary Park Accessibility and Social Deprivation", cat: "Urban GIS / Accessibility", text: "An urban GIS map exploring park accessibility and social deprivation patterns in Calgary, designed for planning and equity-focused interpretation.", focus: "Accessibility, social deprivation, urban planning", tools: "ArcGIS Pro, spatial analysis", img: "assets/images/maps/previews/calgary-park-accessibility.jpg", story: "maps/calgary-park-accessibility.html", alt: "Calgary park accessibility map preview" },
    { title: "Friends of Greens Street Tree Planting", cat: "Environmental / Urban Greening", text: "A thematic map combining street tree planting counts with tree canopy coverage by Calgary electoral division to support urban greening interpretation.", focus: "Tree planting, canopy cover, environmental mapping", tools: "ArcGIS Pro, thematic cartography", img: "assets/images/maps/previews/friends-of-greens-tree-canopy.jpg", story: "maps/friends-of-greens-tree-canopy.html", alt: "Friends of Greens street tree planting and tree canopy map preview" },
    { title: "Stillbirths and Neonatal Deaths in Asia", cat: "Health Geography", text: "A health geography map set comparing stillbirths and neonatal deaths in Asia using multiple thematic mapping approaches.", focus: "Health outcomes, thematic mapping, Asia", tools: "ArcGIS Pro, health geography", img: "assets/images/maps/previews/stillbirths-neonatal-deaths-asia.jpg", story: "maps/stillbirths-neonatal-deaths-asia.html", alt: "Stillbirths and neonatal deaths in Asia map preview" },
    { title: "Pakistan Rural Household Panel Survey Coverage Map", cat: "Research / Survey Mapping", text: "A research-support map showing surveyed districts in Pakistan, designed to communicate geographic coverage for a rural household panel survey.", focus: "Survey coverage, administrative mapping, Pakistan", tools: "ArcGIS Pro, research mapping", img: "assets/images/maps/previews/pakistan-prhps-coverage-map.jpg", story: "maps/pakistan-prhps-coverage-map.html", alt: "Pakistan Rural Household Panel Survey coverage map preview" }
  ];

  let cur = 0;
  const els = {
    img: document.querySelector('#mapShowcaseImage'),
    cat: document.querySelector('#mapShowcaseCategory'),
    title: document.querySelector('#mapShowcaseTitle'),
    text: document.querySelector('#mapShowcaseText'),
    focus: document.querySelector('#mapShowcaseFocus'),
    tools: document.querySelector('#mapShowcaseTools'),
    story: document.querySelector('#mapShowcaseStory'),
    prev: document.querySelector('#prevMap'),
    next: document.querySelector('#nextMap'),
    thumbs: document.querySelectorAll('.map-thumb-button')
  };

  function updateMap(i) {
    const m = maps[i];
    if (els.img) { els.img.src = m.img; els.img.alt = m.alt; }
    if (els.cat) els.cat.textContent = m.cat;
    if (els.title) els.title.textContent = m.title;
    if (els.text) els.text.textContent = m.text;
    if (els.focus) els.focus.textContent = m.focus;
    if (els.tools) els.tools.textContent = m.tools;
    if (els.story) els.story.href = m.story;
    els.thumbs.forEach(t => t.classList.toggle('active', Number(t.dataset.mapIndex) === i));
    cur = i;
  }

  if (els.prev && els.next) {
    els.prev.addEventListener('click', () => updateMap((cur - 1 + maps.length) % maps.length));
    els.next.addEventListener('click', () => updateMap((cur + 1) % maps.length));
    els.thumbs.forEach(t => t.addEventListener('click', () => updateMap(Number(t.dataset.mapIndex))));
  }

  /* ---------- CERTIFICATES TOGGLE ---------- */
  const certList = document.querySelector('#certificatesList');
  const certBtn = document.querySelector('#showMoreCertificates');
  if (certList && certBtn) {
    certBtn.addEventListener('click', () => {
      const expanded = certList.classList.toggle('show-all');
      certBtn.setAttribute('aria-expanded', expanded);
      const span = certBtn.querySelector('span:first-child');
      if (span) span.textContent = expanded ? 'Show fewer certificates' : 'Show more certificates';
      certBtn.classList.toggle('is-open', expanded);
    });
  }

  /* ---------- CONSOLE GREETING ---------- */
  console.log('%c🗺️  Salman Haider — GIS Portfolio', 'font-size:16px;font-weight:bold;color:#2d5a3d;');
  console.log('%cHiring managers: this portfolio was built with care.', 'color:#78716c;');
});
