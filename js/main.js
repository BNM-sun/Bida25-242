
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

const stars = document.querySelectorAll('.star-btn');
let selectedStarIndex = -1;
stars.forEach((star, idx) => {
  star.addEventListener('click', () => {
    selectedStarIndex = idx;
    stars.forEach((s, i) => s.classList.toggle('lit', i <= idx));
  });
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => s.classList.toggle('lit', i <= idx));
  });
});
document.querySelector('.rating-group')?.addEventListener('mouseleave', () => {
  stars.forEach((s, i) => s.classList.toggle('lit', i <= selectedStarIndex));
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

/* --- Shared destinations (book + destinations pages) --- */
const BOOK_DESTINATIONS = [
  { id: 'paris-fr', name: 'Paris, France', region: 'europe', hiddenGem: false,
    blurb: 'Art, haute cuisine, and café terraces — the enduring blueprint for romantic city life.',
    priceFrom: 899, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=700&q=80',
    hotel: 'Le Meurice', hotelRating: 4.9, nightlyUsd: 128,
    flightFromUsd: 450, packageFromUsd: 2899,
    flightNote: 'International → CDG / ORY',
    experiences: [
      { id: 'paris-1', title: 'Private Louvre opening & Seine cruise', usd: 349 },
      { id: 'paris-2', title: 'Champagne masterclass & pastry atelier', usd: 219 },
    ],
  },
  { id: 'bali-id', name: 'Bali, Indonesia', region: 'asia', hiddenGem: false,
    blurb: 'Terraced rice fields, temple rituals, and slow wellness in the Island of the Gods.',
    priceFrom: 649, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80',
    hotel: 'Four Seasons Sayan', hotelRating: 4.95, nightlyUsd: 195,
    flightFromUsd: 780, packageFromUsd: 2199,
    flightNote: 'International → DPS',
    experiences: [
      { id: 'bali-1', title: 'Dawn temple blessing & rice terrace trek', usd: 189 },
      { id: 'bali-2', title: 'Balinese cooking with market visit', usd: 149 },
    ],
  },
  { id: 'santorini-gr', name: 'Santorini, Greece', region: 'europe', hiddenGem: false,
    blurb: 'Caldera views, volcanic wines, and sunsets that turn the Aegean to gold.',
    priceFrom: 1199, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac696?w=700&q=80',
    hotel: 'Canaves Oia Suites', hotelRating: 4.92, nightlyUsd: 245,
    flightFromUsd: 620, packageFromUsd: 3299,
    flightNote: 'International → JTR',
    experiences: [
      { id: 'san-1', title: 'Sunset catamaran & volcanic winery', usd: 279 },
      { id: 'san-2', title: 'Archaeology of Akrotiri with historian', usd: 199 },
    ],
  },
  { id: 'machu-pe', name: 'Machu Picchu, Peru', region: 'americas', hiddenGem: false,
    blurb: 'Cloud forests and Incan engineering — one of the world\'s great archaeological reveals.',
    priceFrom: 1450, img: 'https://images.unsplash.com/photo-1587595431973-160b0eae9325?w=700&q=80',
    hotel: 'Inkaterra Machu Picchu', hotelRating: 4.88, nightlyUsd: 210,
    flightFromUsd: 890, packageFromUsd: 3899,
    flightNote: 'International → CUZ / Lima connection',
    experiences: [
      { id: 'mp-1', title: 'Huayna Picchu hike & guided citadel', usd: 319 },
      { id: 'mp-2', title: 'Sacred Valley weaving cooperative visit', usd: 169 },
    ],
  },
  { id: 'tokyo-jp', name: 'Tokyo, Japan', region: 'asia', hiddenGem: false,
    blurb: 'Minimal shrines, maximal neon — precision and poetry in the world\'s greatest mega-city.',
    priceFrom: 1099, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80',
    hotel: 'Aman Tokyo', hotelRating: 4.96, nightlyUsd: 275,
    flightFromUsd: 920, packageFromUsd: 3499,
    flightNote: 'International → HND / NRT',
    experiences: [
      { id: 'tk-1', title: 'Tsukiji chef-led tasting walk', usd: 259 },
      { id: 'tk-2', title: 'Tea ceremony & antique gallery district', usd: 179 },
    ],
  },
  { id: 'okavango-bw', name: 'Okavango Delta, Botswana', region: 'africa', hiddenGem: false,
    blurb: 'Waterways, big game, and lantern-lit camps — Africa\'s incomparable inland delta.',
    priceFrom: 2200, img: 'https://images.unsplash.com/photo-1516026672322-bc92d7a29d7c?w=700&q=80',
    hotel: 'Wilderness Mombo', hotelRating: 4.98, nightlyUsd: 420,
    flightFromUsd: 1650, packageFromUsd: 7999,
    flightNote: 'International → MUB / charter hop',
    experiences: [
      { id: 'ok-1', title: 'Private mokoro & guided bush walk', usd: 0 },
      { id: 'ok-2', title: 'Heli scenic over the floodplains', usd: 549 },
    ],
  },
  { id: 'hallstatt-at', name: 'Hallstatt, Austria', region: 'europe', hiddenGem: true,
    blurb: 'Alpine lake reflections and salt-mine history — storybook Austria without the crowds.',
    priceFrom: 979, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    hotel: 'Heritage Hotel Hallstatt', hotelRating: 4.85, nightlyUsd: 165,
    flightFromUsd: 580, packageFromUsd: 2599,
    flightNote: 'International → SZG / Vienna rail',
    experiences: [
      { id: 'hal-1', title: 'Salt mine tour & skywalk', usd: 89 },
      { id: 'hal-2', title: 'Private lake boat & fondue sunset', usd: 149 },
    ],
  },
  { id: 'luang-la', name: 'Luang Prabang, Laos', region: 'asia', hiddenGem: true,
    blurb: 'Mekong mist, golden temples, and the gentle rhythm of Laos\' spiritual capital.',
    priceFrom: 849, img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=80',
    hotel: 'Amantaka', hotelRating: 4.9, nightlyUsd: 188,
    flightFromUsd: 710, packageFromUsd: 2399,
    flightNote: 'International → LPQ',
    experiences: [
      { id: 'lp-1', title: 'Alms giving & Kuang Si waterfalls', usd: 129 },
      { id: 'lp-2', title: 'Mekong sunset cruise & weaving village', usd: 99 },
    ],
  },
  { id: 'rio-br', name: 'Rio de Janeiro, Brazil', region: 'americas', hiddenGem: false,
    blurb: 'Forest-meets-ocean drama, samba pulse, and icons from Corcovado to Ipanema.',
    priceFrom: 1199, img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8cfe3?w=700&q=80',
    hotel: 'Belmond Copacabana Palace', hotelRating: 4.91, nightlyUsd: 198,
    flightFromUsd: 680, packageFromUsd: 3199,
    flightNote: 'International → GIG / SDU',
    experiences: [
      { id: 'rio-1', title: 'Sugarloaf champagne helicopter', usd: 389 },
      { id: 'rio-2', title: 'Favela art walk with local hosts', usd: 79 },
    ],
  },
  { id: 'valparaiso-cl', name: 'Valparaíso, Chile', region: 'americas', hiddenGem: true,
    blurb: 'Pacific poetry — funiculars, street murals, and bohemian hills overlooking the ocean.',
    priceFrom: 1099, img: 'https://images.unsplash.com/photo-1518471150596-29bd640482f6?w=700&q=80',
    hotel: 'Palacio Astoreca', hotelRating: 4.82, nightlyUsd: 142,
    flightFromUsd: 750, packageFromUsd: 2699,
    flightNote: 'International → SCL + coastal drive',
    experiences: [
      { id: 'val-1', title: 'Street art & winery Casablanca valley', usd: 189 },
      { id: 'val-2', title: 'Historic funiculars & poet Neruda tour', usd: 119 },
    ],
  },
  { id: 'cape-town-za', name: 'Cape Town, South Africa', region: 'africa', hiddenGem: false,
    blurb: 'Table Mountain, Cape wines, and Atlantic-meets-Indian-Ocean edge.',
    priceFrom: 1399, img: 'https://images.unsplash.com/photo-1580060839134-b23587e793bc?w=700&q=80',
    hotel: 'Mount Nelson', hotelRating: 4.89, nightlyUsd: 178,
    flightFromUsd: 980, packageFromUsd: 3599,
    flightNote: 'International → CPT',
    experiences: [
      { id: 'ct-1', title: 'Cape Peninsula & penguins private drive', usd: 249 },
      { id: 'ct-2', title: 'Stellenbosch cellar doors by vintage Land Rover', usd: 219 },
    ],
  },
  { id: 'lamu-ke', name: 'Lamu Island, Kenya', region: 'africa', hiddenGem: true,
    blurb: 'Swahili dhows, car-free lanes, and UNESCO stone architecture on the Indian Ocean.',
    priceFrom: 1699, img: 'https://images.unsplash.com/photo-1590523741374-b733cca28188?w=700&q=80',
    hotel: 'Peponi Hotel', hotelRating: 4.86, nightlyUsd: 195,
    flightFromUsd: 1120, packageFromUsd: 4299,
    flightNote: 'International → MBA / LAU hop',
    experiences: [
      { id: 'lam-1', title: 'Sunset dhow sailing & seafood feast', usd: 159 },
      { id: 'lam-2', title: 'Lamu Old Town heritage walk', usd: 69 },
    ],
  },
  { id: 'sydney-au', name: 'Sydney, Australia', region: 'oceania', hiddenGem: false,
    blurb: 'Harbour icons, coastal walks, and a confident outdoor lifestyle year-round.',
    priceFrom: 1599, img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=700&q=80',
    hotel: 'Park Hyatt Sydney', hotelRating: 4.93, nightlyUsd: 265,
    flightFromUsd: 1180, packageFromUsd: 4199,
    flightNote: 'International → SYD',
    experiences: [
      { id: 'syd-1', title: 'Harbour bridge climb & opera backstage', usd: 289 },
      { id: 'syd-2', title: 'Blue Mountains eucalyptus dawn picnic', usd: 199 },
    ],
  },
  { id: 'fiji-fj', name: 'Fiji', region: 'oceania', hiddenGem: false,
    blurb: 'Coral lagoons, bure bungalows, and welcome songs that reset every clock.',
    priceFrom: 1299, img: 'https://images.unsplash.com/photo-1516819768401-94eAA6405418?w=700&q=80',
    hotel: 'Likuliku Lagoon Resort', hotelRating: 4.94, nightlyUsd: 310,
    flightFromUsd: 1050, packageFromUsd: 4599,
    flightNote: 'International → NAN + boat transfer',
    experiences: [
      { id: 'fj-1', title: 'Private snorkel safari & village kava', usd: 179 },
      { id: 'fj-2', title: 'Spa ritual & sandbank champagne', usd: 229 },
    ],
  },
  { id: 'rotorua-nz', name: 'Rotorua, New Zealand', region: 'oceania', hiddenGem: true,
    blurb: 'Geothermal wonderland — Māori culture, mud pools, and ancient forests next door.',
    priceFrom: 999, img: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=700&q=80',
    hotel: 'Treetops Lodge', hotelRating: 4.87, nightlyUsd: 198,
    flightFromUsd: 920, packageFromUsd: 2899,
    flightNote: 'International → ROT / AKL connection',
    experiences: [
      { id: 'rot-1', title: 'Te Puia geysers & hangi feast', usd: 139 },
      { id: 'rot-2', title: 'Redwoods canopy zipline', usd: 119 },
    ],
  },
];

const FX_PER_USD = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149,
  BWP: 13.6,
  AUD: 1.53,
  CAD: 1.37,
  NZD: 1.67,
  IDR: 15650,
  PEN: 3.74,
  BRL: 5.05,
};

const ROOM_MULT = { standard: 1, deluxe: 1.22, junior: 1.55, presidential: 2.2 };
const FLIGHT_CLASS_MULT = { economy: 1, premium: 1.32, business: 2.05, first: 3.45 };
const PACKAGE_TIER_MULT = { essential: 0.88, luxe: 1, reserve: 1.32 };

function destById(id) {
  return BOOK_DESTINATIONS.find(d => d.id === id);
}

function toUsd(amount, fromCode) {
  const r = FX_PER_USD[fromCode];
  if (!r) return amount;
  return fromCode === 'USD' ? amount : amount / r;
}

function fromUsd(amountUsd, toCode) {
  const r = FX_PER_USD[toCode];
  if (!r) return amountUsd;
  return toCode === 'USD' ? amountUsd : amountUsd * r;
}

function formatMoney(amountUsd, currencyCode) {
  const local = fromUsd(amountUsd, currencyCode);
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode === 'BWP' ? 'BWP' : currencyCode,
      maximumFractionDigits: currencyCode === 'JPY' || currencyCode === 'IDR' ? 0 : 2,
    }).format(local);
  } catch {
    return `${currencyCode} ${local.toFixed(2)}`;
  }
}

function formatShortDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function nightsBetween(checkIn, checkOut, fallback = 7) {
  if (!checkIn || !checkOut) return fallback;
  const a = new Date(checkIn + 'T12:00:00');
  const b = new Date(checkOut + 'T12:00:00');
  const n = Math.round((b - a) / (86400000));
  return n > 0 ? n : fallback;
}

function initDestinationsPage() {
  const page = document.getElementById('destinationsPage');
  if (!page) return;

  const cards = page.querySelectorAll('.dest-card-full');

  function applyFilter(mode) {
    cards.forEach(card => {
      const region = card.dataset.region || '';
      const isGem = card.dataset.gem === 'true';
      let show = false;
      if (mode === 'all') show = true;
      else if (mode === 'gems') show = isGem;
      else show = region === mode;
      card.style.display = show ? '' : 'none';
    });
  }

  page.querySelectorAll('.filter-bar .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      page.querySelectorAll('.filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter || 'all');
    });
  });

  applyFilter('all');
}

function initBookPage() {
  const root = document.getElementById('bookPage');
  if (!root) return;

  const displayCurrency = document.getElementById('displayCurrency');
  const displayCurrencyHint = document.getElementById('displayCurrencyHint');
  const fxAmount = document.getElementById('fxAmount');
  const fxFrom = document.getElementById('fxFrom');
  const fxTo = document.getElementById('fxTo');
  const fxResult = document.getElementById('fxResult');
  const fxCrossHint = document.getElementById('fxCrossHint');

  const currencyCodes = Object.keys(FX_PER_USD);

  function fillSelect(sel, selected) {
    if (!sel) return;
    sel.innerHTML = currencyCodes.map(c => `<option value="${c}" ${c === selected ? 'selected' : ''}>${c}</option>`).join('');
  }

  fillSelect(displayCurrency, 'USD');
  fillSelect(fxFrom, 'USD');
  fillSelect(fxTo, 'EUR');

  function updateFxHints() {
    const cur = displayCurrency?.value || 'USD';
    const per = FX_PER_USD[cur];
    if (displayCurrencyHint && per) {
      displayCurrencyHint.textContent =
        cur === 'USD' ? 'Totals shown in US dollars.' : `Approx. ${per} ${cur} per 1 USD (indicative rates).`;
    }
  }

  function runConverter() {
    const amt = parseFloat(String(fxAmount?.value || '').trim(), 10);
    const from = fxFrom?.value || 'USD';
    const to = fxTo?.value || 'EUR';
    if (!fxResult || Number.isNaN(amt) || amt < 0) {
      if (fxResult) fxResult.textContent = '—';
      return;
    }
    const usd = toUsd(amt, from);
    const out = fromUsd(usd, to);
    fxResult.textContent = formatMoney(usd, to);
    if (fxCrossHint && FX_PER_USD[from] && FX_PER_USD[to]) {
      const cross = FX_PER_USD[to] / FX_PER_USD[from];
      fxCrossHint.textContent = `1 ${from} ≈ ${cross.toFixed(4)} ${to} (via USD)`;
    }
  }

  fxAmount?.addEventListener('input', runConverter);
  fxFrom?.addEventListener('change', runConverter);
  fxTo?.addEventListener('change', runConverter);
  updateFxHints();
  runConverter();

  const destSelects = root.querySelectorAll('.book-destination-select');
  function optionHtml() {
    return BOOK_DESTINATIONS.map(d =>
      `<option value="${d.id}">${d.name}</option>`).join('');
  }
  destSelects.forEach(sel => { sel.innerHTML = '<option value="">Select a destination</option>' + optionHtml(); });

  function getSelectedDestId() {
    const first = root.querySelector('.book-destination-select');
    return first?.value || '';
  }

  function setAllDestinationSelects(id) {
    destSelects.forEach(sel => { sel.value = id; });
    rebuildExperienceOptions();
    updateBookSummary();
  }

  destSelects.forEach(sel => {
    sel.addEventListener('change', () => setAllDestinationSelects(sel.value));
  });

  const experienceSelect = document.getElementById('experienceSelect');

  function rebuildExperienceOptions() {
    if (!experienceSelect) return;
    const d = destById(getSelectedDestId());
    experienceSelect.innerHTML = '';
    if (!d) return;
    d.experiences.forEach(ex => {
      const opt = document.createElement('option');
      opt.value = ex.id;
      opt.textContent = `${ex.title} (${formatMoney(ex.usd, displayCurrency?.value || 'USD')})`;
      opt.dataset.usd = String(ex.usd);
      experienceSelect.appendChild(opt);
    });
  }

  const gridTourist = document.getElementById('bookPickGridTourist');
  const gridGems = document.getElementById('bookPickGridGems');

  function renderPickGrids() {
    const cur = displayCurrency?.value || 'USD';
    const tourists = BOOK_DESTINATIONS.filter(x => !x.hiddenGem);
    const gems = BOOK_DESTINATIONS.filter(x => x.hiddenGem);
    if (gridTourist) gridTourist.innerHTML = tourists.map(d => {
      const priceLabel = formatMoney(d.priceFrom, cur);
      const gemBadge = '';
      return `
      <article class="book-pick-card" data-dest-id="${d.id}" data-region="${d.region}" role="button" tabindex="0">
        <img src="${d.img}" alt="" loading="lazy" />
        <div class="book-pick-card-body">
          <div class="tag-row"><span class="region-tag">${d.region}</span>${gemBadge}</div>
          <h4>${d.name}</h4>
          <p class="hotel-pick"><strong>${d.hotel}</strong> · ${d.hotelRating}★</p>
          <div class="pick-meta"><span>From ${priceLabel} / person</span></div>
        </div>
      </article>`;
    }).join('');
    if (gridGems) gridGems.innerHTML = gems.map(d => {
      const priceLabel = formatMoney(d.priceFrom, cur);
      return `
      <article class="book-pick-card" data-dest-id="${d.id}" data-region="${d.region}" role="button" tabindex="0">
        <img src="${d.img}" alt="" loading="lazy" />
        <div class="book-pick-card-body">
          <div class="tag-row"><span class="region-tag">${d.region}</span><span class="gem-tag">Hidden gem</span></div>
          <h4>${d.name}</h4>
          <p class="hotel-pick"><strong>${d.hotel}</strong> · ${d.hotelRating}★</p>
          <div class="pick-meta"><span>From ${priceLabel} / person</span></div>
        </div>
      </article>`;
    }).join('');

  }

  document.querySelector('.book-inspire')?.addEventListener('click', e => {
    const card = e.target.closest('.book-pick-card');
    if (!card || !root.contains(card)) return;
    const id = card.dataset.destId;
    if (!id) return;
    setAllDestinationSelects(id);
    root.querySelector('#bookTabStrip')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelector('.book-inspire')?.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.book-pick-card');
    if (!card || !root.contains(card)) return;
    e.preventDefault();
    const id = card.dataset.destId;
    if (!id) return;
    setAllDestinationSelects(id);
    root.querySelector('#bookTabStrip')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const tabStrip = root.querySelector('.book-tab-strip');
  let activePanel = 'hotels';

  function setPanel(panel) {
    activePanel = panel;
    tabStrip?.querySelectorAll('.book-tab').forEach(t => {
      const on = t.dataset.panel === panel;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    root.querySelectorAll('.book-panel').forEach(p => {
      const on = p.dataset.panel === panel;
      p.classList.toggle('active', on);
      p.hidden = !on;
    });
    updateBookSummary();
  }

  tabStrip?.querySelectorAll('.book-tab').forEach(tab => {
    tab.addEventListener('click', () => setPanel(tab.dataset.panel || 'hotels'));
  });

  const sumMode = document.getElementById('sumBookingMode');
  const sumLines = document.getElementById('bookingSummaryLines');
  const sumFeeLabel = document.getElementById('sumFeeLabel');
  const sumFeeVal = document.getElementById('sumFeeVal');
  const sumTotalDisplay = document.getElementById('sumTotalDisplay');

  function line(label, value) {
    return `<div class="summary-line"><span>${label}</span><span>${value}</span></div>`;
  }

  function updateBookSummary() {
    const cur = displayCurrency?.value || 'USD';
    rebuildExperienceOptions();
    const destId = getSelectedDestId();
    const d = destById(destId);

    if (!sumLines || !d) {
      if (sumMode) sumMode.textContent = 'Select a destination';
      if (sumLines) sumLines.innerHTML = line('Destination', '—');
      if (sumFeeVal) sumFeeVal.textContent = '—';
      if (sumTotalDisplay) sumTotalDisplay.textContent = '—';
      return;
    }

    if (activePanel === 'hotels') {
      const checkIn = document.getElementById('hotelCheckIn')?.value;
      const checkOut = document.getElementById('hotelCheckOut')?.value;
      const nights = nightsBetween(checkIn, checkOut);
      const adults = parseInt(document.getElementById('hotelAdults')?.value, 10) || 2;
      const children = parseInt(document.getElementById('hotelChildren')?.value, 10) || 0;
      const roomKey = document.getElementById('hotelRoomType')?.value || 'standard';
      const mult = ROOM_MULT[roomKey] || 1;
      const roomUsd = d.nightlyUsd * nights * mult;
      const taxes = roomUsd * 0.1;
      const totalUsd = roomUsd + taxes;
      if (sumMode) sumMode.textContent = 'Hotel stay';
      sumLines.innerHTML =
        line('Destination', d.name) +
        line('Country focus', d.name.split(', ').pop() || '') +
        line('Hotel', d.hotel) +
        line('Room', document.getElementById('hotelRoomType')?.selectedOptions[0]?.textContent || '') +
        line('Check-in', formatShortDate(checkIn)) +
        line('Check-out', formatShortDate(checkOut)) +
        line('Duration', `${nights} night${nights === 1 ? '' : 's'}`) +
        line('Guests', `${adults} adult${adults === 1 ? '' : 's'}${children ? `, ${children} child${children === 1 ? '' : 'ren'}` : ''}`) +
        line(`Room (${nights} × ${formatMoney(d.nightlyUsd * mult, cur)})`, formatMoney(roomUsd, cur));
      if (sumFeeLabel) sumFeeLabel.textContent = 'Taxes & fees';
      if (sumFeeVal) sumFeeVal.textContent = formatMoney(taxes, cur);
      if (sumTotalDisplay) sumTotalDisplay.textContent = formatMoney(totalUsd, cur);
    } else if (activePanel === 'flights') {
      const origin = document.getElementById('flightOrigin')?.value?.trim() || 'Your origin';
      const dep = document.getElementById('flightDepart')?.value;
      const ret = document.getElementById('flightReturn')?.value;
      const cls = document.getElementById('flightClass')?.value || 'economy';
      const cm = FLIGHT_CLASS_MULT[cls] || 1;
      const ad = parseInt(document.getElementById('flightAdults')?.value, 10) || 2;
      const ch = parseInt(document.getElementById('flightChildren')?.value, 10) || 0;
      const seats = ad + ch;
      const baseFare = d.flightFromUsd * cm * seats;
      const taxes = baseFare * 0.08;
      const totalUsd = baseFare + taxes;
      if (sumMode) sumMode.textContent = 'Flights';
      sumLines.innerHTML =
        line('Destination', d.name) +
        line('Route', `${origin} → ${d.name.split(',')[0]}`) +
        line('Hub note', d.flightNote) +
        line('Departure', formatShortDate(dep)) +
        line('Return', formatShortDate(ret)) +
        line('Cabin', document.getElementById('flightClass')?.selectedOptions[0]?.textContent || '') +
        line('Travelers', `${seats} passenger${seats === 1 ? '' : 's'}`) +
        line(`Estimated airfare (${seats} × ${formatMoney(d.flightFromUsd * cm, cur)})`, formatMoney(baseFare, cur));
      if (sumFeeLabel) sumFeeLabel.textContent = 'Carrier surcharges & taxes';
      if (sumFeeVal) sumFeeVal.textContent = formatMoney(taxes, cur);
      if (sumTotalDisplay) sumTotalDisplay.textContent = formatMoney(totalUsd, cur);
    } else if (activePanel === 'packages') {
      const tier = document.getElementById('packageTier')?.value || 'luxe';
      const tm = PACKAGE_TIER_MULT[tier] || 1;
      const ad = parseInt(document.getElementById('packageAdults')?.value, 10) || 2;
      const ch = parseInt(document.getElementById('packageChildren')?.value, 10) || 0;
      const party = ad + ch;
      const pkgUsd = d.packageFromUsd * tm * party;
      const taxes = pkgUsd * 0.06;
      const totalUsd = pkgUsd + taxes;
      const start = document.getElementById('packageStart')?.value;
      const end = document.getElementById('packageEnd')?.value;
      const tripNights = nightsBetween(start, end);
      if (sumMode) sumMode.textContent = 'Land package';
      sumLines.innerHTML =
        line('Destination', d.name) +
        line('Package', document.getElementById('packageTier')?.selectedOptions[0]?.textContent || '') +
        line('Trip length', `${tripNights} night${tripNights === 1 ? '' : 's'}`) +
        line('Start', formatShortDate(start)) +
        line('End', formatShortDate(end)) +
        line('Travelers', `${party} guest${party === 1 ? '' : 's'}`) +
        line(`Package (${party} × ${formatMoney(d.packageFromUsd * tm, cur)})`, formatMoney(pkgUsd, cur));
      if (sumFeeLabel) sumFeeLabel.textContent = 'Booking & local taxes';
      if (sumFeeVal) sumFeeVal.textContent = formatMoney(taxes, cur);
      if (sumTotalDisplay) sumTotalDisplay.textContent = formatMoney(totalUsd, cur);
    } else if (activePanel === 'experiences') {
      const exSel = document.getElementById('experienceSelect');
      const opt = exSel?.selectedOptions[0];
      const exUsd = parseFloat(String(opt?.dataset.usd || '0'), 10) || 0;
      const guests = parseInt(document.getElementById('experienceGuests')?.value, 10) || 2;
      const dateEx = document.getElementById('experienceDate')?.value;
      const sub = exUsd * guests;
      const fees = sub * 0.05;
      const totalUsd = sub + fees;
      if (sumMode) sumMode.textContent = 'Experience';
      sumLines.innerHTML =
        line('Destination', d.name) +
        line('Experience', opt?.textContent?.replace(/\s*\([^)]*\)\s*$/, '') || '—') +
        line('Date', formatShortDate(dateEx)) +
        line('Guests', String(guests)) +
        line(`Activity (${guests} × ${formatMoney(exUsd, cur)})`, formatMoney(sub, cur));
      if (sumFeeLabel) sumFeeLabel.textContent = 'Service fee';
      if (sumFeeVal) sumFeeVal.textContent = formatMoney(fees, cur);
      if (sumTotalDisplay) sumTotalDisplay.textContent = formatMoney(totalUsd, cur);
    }
  }

  [
    'hotelCheckIn', 'hotelCheckOut', 'hotelAdults', 'hotelChildren', 'hotelRoomType',
    'flightOrigin', 'flightDepart', 'flightReturn', 'flightClass', 'flightAdults', 'flightChildren',
    'packageTier', 'packageStart', 'packageEnd', 'packageAdults', 'packageChildren',
    'experienceSelect', 'experienceDate', 'experienceGuests',
  ].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateBookSummary);
    document.getElementById(id)?.addEventListener('input', updateBookSummary);
  });

  displayCurrency?.addEventListener('change', () => {
    updateFxHints();
    renderPickGrids();
    updateBookSummary();
  });

  const regionFilters = document.getElementById('regionFilters');
  regionFilters?.querySelectorAll('.region-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      regionFilters.querySelectorAll('.region-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const reg = btn.dataset.region || 'all';
      root.querySelectorAll('.book-pick-card').forEach(card => {
        const cr = card.dataset.region || '';
        card.style.display = reg === 'all' || cr === reg ? '' : 'none';
      });
    });
  });

  const params = new URLSearchParams(window.location.search);
  const urlDest = params.get('dest');
  if (urlDest && destById(urlDest)) setAllDestinationSelects(urlDest);
  else setAllDestinationSelects(BOOK_DESTINATIONS[0].id);

  setPanel('hotels');
  renderPickGrids();
  updateBookSummary();
}

initDestinationsPage();
initBookPage();
