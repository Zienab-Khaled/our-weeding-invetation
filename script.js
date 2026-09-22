document.addEventListener('DOMContentLoaded', () => {
  // Config
  const weddingDateStr = '2026-10-16T19:00:00';
  const targetDate = new Date(weddingDateStr);
  
  // DOM Elements
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const mainInvitation = document.getElementById('main-invitation');
  const btnOpen = document.querySelector('.btn-open');
  const waxSeal = document.querySelector('.wax-seal');
  const bgAudio = document.getElementById('bg-audio');
  const musicControlBtn = document.getElementById('music-control');
  
  // Language Switcher
  const btnLangEn = document.getElementById('btn-lang-en');
  const btnLangAr = document.getElementById('btn-lang-ar');
  
  // Modals
  const rsvpBtn = document.getElementById('rsvp-btn');
  const rsvpModal = document.getElementById('rsvp-modal');
  const rsvpCancel = document.getElementById('rsvp-cancel');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpAttendingYes = document.getElementById('rsvp-attending-yes');
  const rsvpAttendingNo = document.getElementById('rsvp-attending-no');
  const rsvpAttendingInput = document.getElementById('rsvp-attending');
  const rsvpGuestsWrapper = document.getElementById('rsvp-guests-wrapper');
  
  const giftBtn = document.getElementById('gift-btn');
  const giftModal = document.getElementById('gift-modal');
  const giftClose = document.getElementById('gift-close');
  
  // Guestbook
  const wishesForm = document.getElementById('wishes-form');
  const wishesFeed = document.getElementById('wishes-feed');
  
  let isRtl = false;

  function getUrlLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam) {
        const clean = langParam.toLowerCase().trim();
        if (clean === 'ar' || clean === 'arabic') return 'ar';
        if (clean === 'en' || clean === 'english') return 'en';
      }
      const hash = window.location.hash.toLowerCase().trim();
      if (hash === '#ar' || hash === '#arabic') return 'ar';
      if (hash === '#en' || hash === '#english') return 'en';
    } catch (e) {
      console.error('Error checking URL language:', e);
    }
    return 'en'; // Default language is English
  }

  function setLanguage(lang, updateUrl = false) {
    if (lang === 'ar') {
      isRtl = true;
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl-active');
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-ar').forEach(el => {
        if (el.tagName === 'DIV' || el.tagName === 'SECTION' || el.tagName === 'FORM') {
          el.style.display = 'block';
        } else {
          el.style.display = 'inline';
        }
      });
      
      // Update form placeholders
      const wishName = document.getElementById('wish-name');
      if (wishName) wishName.placeholder = 'ادخل اسمك الكامل';
      const wishText = document.getElementById('wish-text');
      if (wishText) wishText.placeholder = 'اكتب تهنئتك الجميلة للعروسين...';
      const rsvpName = document.getElementById('rsvp-name');
      if (rsvpName) rsvpName.placeholder = 'أدخل اسمك الكريم';
      const rsvpWish = document.getElementById('rsvp-wish');
      if (rsvpWish) rsvpWish.placeholder = 'اكتب تهنئتك هنا...';
      
      btnLangAr.classList.add('active');
      btnLangEn.classList.remove('active');
    } else {
      isRtl = false;
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('rtl-active');
      document.querySelectorAll('.lang-ar').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-en').forEach(el => {
        if (el.tagName === 'DIV' || el.tagName === 'SECTION' || el.tagName === 'FORM') {
          el.style.display = 'block';
        } else {
          el.style.display = 'inline';
        }
      });
      
      // Update form placeholders
      const wishName = document.getElementById('wish-name');
      if (wishName) wishName.placeholder = 'Enter your name';
      const wishText = document.getElementById('wish-text');
      if (wishText) wishText.placeholder = 'Leave your congratulations...';
      const rsvpName = document.getElementById('rsvp-name');
      if (rsvpName) rsvpName.placeholder = 'Enter your name';
      const rsvpWish = document.getElementById('rsvp-wish');
      if (rsvpWish) rsvpWish.placeholder = 'Leave a congratulatory message...';
      
      btnLangEn.classList.add('active');
      btnLangAr.classList.remove('active');
    }

    if (updateUrl) {
      try {
        const currentUrl = new URL(window.location);
        if (lang === 'ar') {
          currentUrl.searchParams.set('lang', 'ar');
        } else {
          currentUrl.searchParams.set('lang', 'en');
        }
        window.history.replaceState({}, '', currentUrl.toString());
      } catch (err) {
        console.error('Failed to update URL search param:', err);
      }
    }

    renderWishes();
    if (typeof updateCountdown === 'function') {
      updateCountdown();
    }
  }

  btnLangEn.addEventListener('click', () => setLanguage('en', true));
  btnLangAr.addEventListener('click', () => setLanguage('ar', true));

  // 1. Ultra-Lightweight Floating Glassy Hearts System (Zero-Lag, 60fps Locked)
  const glassHeartsLayer = document.getElementById('floating-glass-hearts-layer');

  function initGlassHearts() {
    if (!glassHeartsLayer) return;
    glassHeartsLayer.innerHTML = '';
    const count = 11; // Perfectly balanced: dreamy atmosphere with zero CPU/GPU overhead

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'glassy-heart-item';

      const xStart = Math.random() * 88 + 6; // 6vw to 94vw
      const sway = -30 + Math.random() * 60;
      const xMid = xStart + sway * 0.5;
      const xEnd = xStart + sway;
      const rotMid = -25 + Math.random() * 50;
      const rotEnd = -35 + Math.random() * 70;
      const duration = 11 + Math.random() * 8; // 11s to 19s
      const delay = -(Math.random() * duration); // pre-scattered across entire viewport height
      const size = 18 + Math.random() * 16; // 18px to 34px

      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.setProperty('--x-start', `${xStart}vw`);
      heart.style.setProperty('--x-mid', `${xMid}vw`);
      heart.style.setProperty('--x-end', `${xEnd}vw`);
      heart.style.setProperty('--rot-mid', `${rotMid}deg`);
      heart.style.setProperty('--rot-end', `${rotEnd}deg`);

      heart.innerHTML = `<svg viewBox="0 0 32 32" class="glassy-heart-svg"><use href="#glass-heart-symbol"/></svg>`;
      glassHeartsLayer.appendChild(heart);
    }
  }

  initGlassHearts();

  // 2. Envelope opening and Autoplay logic
  function playMusic() {
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        musicControlBtn.classList.add('playing');
        musicControlBtn.innerHTML = `
          <div class="eq-bars">
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
          </div>
        `;
        // Clean up fallback listeners once it successfully plays
        document.removeEventListener('click', playMusicFallback);
        document.removeEventListener('touchstart', playMusicFallback);
      }).catch(err => {
        console.log('Autoplay blocked by browser. Awaiting interaction.');
      });
    }
  }

  function playMusicFallback() {
    playMusic();
  }

  // Try to play immediately on load
  playMusic();

  // Fallback: play on first user touch/click anywhere
  document.addEventListener('click', playMusicFallback);
  document.addEventListener('touchstart', playMusicFallback);

  let autoScrollRaf = null;
  let autoScrollActive = false;
  let autoScrollPos = 0;

  function stopAutoScroll() {
    autoScrollActive = false;
    if (autoScrollRaf) {
      cancelAnimationFrame(autoScrollRaf);
      autoScrollRaf = null;
    }
    window.removeEventListener('wheel', stopAutoScroll);
    window.removeEventListener('touchstart', stopAutoScroll);
    window.removeEventListener('pointerdown', stopAutoScroll);
    window.removeEventListener('keydown', stopAutoScroll);
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollActive = true;
    autoScrollPos = window.scrollY || document.documentElement.scrollTop || 0;

    // Attach stop listeners after a tick so the OPEN click/touch doesn't cancel immediately
    setTimeout(() => {
      if (!autoScrollActive) return;
      window.addEventListener('wheel', stopAutoScroll, { passive: true });
      window.addEventListener('touchstart', stopAutoScroll, { passive: true });
      window.addEventListener('pointerdown', stopAutoScroll, { passive: true });
      window.addEventListener('keydown', stopAutoScroll);
    }, 50);

    // Accumulate float position — browsers snap scrollY to integers, so
    // adding <1px via scrollY + delta never moves the page.
    const speedPxPerFrame = 0.35;
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    function tick() {
      if (!autoScrollActive) return;

      const max = maxScroll();
      if (max <= 0) {
        stopAutoScroll();
        return;
      }

      autoScrollPos += speedPxPerFrame;

      if (autoScrollPos >= max) {
        window.scrollTo(0, max);
        stopAutoScroll();
        return;
      }

      window.scrollTo(0, autoScrollPos);
      autoScrollRaf = requestAnimationFrame(tick);
    }

    autoScrollRaf = requestAnimationFrame(tick);
  }

  function openEnvelope() {
    envelopeOverlay.classList.add('opened');
    mainInvitation.classList.add('visible');
    
    // Play music when they open if it hasn't already started
    playMusic();
    
    // Confetti explosion effect (simple canvas)
    triggerConfetti();

    // Celebratory burst of 12 glassy hearts floating up when opening invitation!
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        spawnDynamicGlassHeart(Math.random() * 90 + 5);
      }, i * 85);
    }

    // Anime.js entrance animation for hero elements
    if (typeof anime !== 'undefined') {
      anime({
        targets: ['header .badge', 'header .names', 'header .section-divider', 'header .date'],
        opacity: [0, 1],
        translateY: [25, 0],
        delay: anime.stagger(120, { start: 250 }),
        duration: 850,
        easing: 'easeOutCubic'
      });
    }

    // After the envelope slides away, gently auto-scroll through the invitation
    setTimeout(startAutoScroll, 900);
  }
  
  if (btnOpen) btnOpen.addEventListener('click', openEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);

  // 3. Audio Controls
  musicControlBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play();
      musicControlBtn.classList.add('playing');
      musicControlBtn.innerHTML = `
        <div class="eq-bars">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </div>
      `;
    } else {
      bgAudio.pause();
      musicControlBtn.classList.remove('playing');
      musicControlBtn.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
        </svg>
      `;
    }
  });

  // 4. RSVP Modal Controls
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', () => {
      rsvpModal.classList.add('active');
    });
  }
  
  rsvpCancel.addEventListener('click', () => {
    rsvpModal.classList.remove('active');
  });
  
  // Close modals on clicking overlay outside box
  [rsvpModal, giftModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  // RSVP Form attending selection
  rsvpAttendingYes.addEventListener('click', () => {
    rsvpAttendingInput.value = 'yes';
    rsvpAttendingYes.style.backgroundColor = 'var(--burgundy)';
    rsvpAttendingYes.style.color = 'var(--cream)';
    rsvpAttendingNo.style.backgroundColor = 'white';
    rsvpAttendingNo.style.color = 'var(--charcoal)';
    rsvpGuestsWrapper.style.display = 'block';
  });
  
  rsvpAttendingNo.addEventListener('click', () => {
    rsvpAttendingInput.value = 'no';
    rsvpAttendingNo.style.backgroundColor = '#b91c1c';
    rsvpAttendingNo.style.color = 'white';
    rsvpAttendingYes.style.backgroundColor = 'white';
    rsvpAttendingYes.style.color = 'var(--charcoal)';
    rsvpGuestsWrapper.style.display = 'none';
  });
  
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('rsvp-name').value;
    const rsvpWishText = document.getElementById('rsvp-wish').value;
    
    alert(isRtl ? 'تم تأكيد حضورك بنجاح! شكراً لك.' : 'Your RSVP has been confirmed successfully! Thank you.');
    
    // Add wish if left
    if (rsvpWishText.trim()) {
      addWishToList(guestName, rsvpWishText);
    }
    
    rsvpForm.reset();
    rsvpGuestsWrapper.style.display = 'block';
    rsvpAttendingYes.click();
    rsvpModal.classList.remove('active');
  });

  // 5. Gift Box Modal Controls
  if (giftBtn) {
    giftBtn.addEventListener('click', () => {
      giftModal.classList.add('active');
    });
  }
  
  giftClose.addEventListener('click', () => {
    giftModal.classList.remove('active');
  });

  // 6. Wishes Guestbook Logic (Persistent Cloud Storage + Instant Local Cache)
  const CLOUD_WISHES_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0aa90d72d1d69';
  const defaultWishes = [
    {
      name: 'زينب & مصطفى',
      text: 'نورتم فرحتنا وشاركتونا أجمل يوم في حياتنا، شكراً لكل كلمة حلوة وتهنئة من قلوبكم! ❤️✨',
      date: '١٦ أكتوبر ٢٠٢٦'
    }
  ];

  function getLocalWishes() {
    const local = localStorage.getItem('wedding_wishes_v5');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        return defaultWishes;
      }
    }
    return defaultWishes;
  }

  function saveLocalWishes(list) {
    try {
      localStorage.setItem('wedding_wishes_v5', JSON.stringify(list));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  let allWishes = getLocalWishes();

  function renderWishes() {
    wishesFeed.innerHTML = '';
    
    if (allWishes.length === 0) {
      const emptyText = isRtl
        ? 'كن أول من يكتب تهنئة للعروسين في دفتر التهاني ❤️✨'
        : 'Be the first to leave your congratulations for the couple! ❤️✨';
      wishesFeed.innerHTML = `
        <div class="empty-wishes-placeholder" style="text-align: center; padding: 25px 15px; color: var(--text-muted); font-size: 0.88rem; font-family: ${isRtl ? 'var(--font-arabic)' : 'inherit'};">
          ${emptyText}
        </div>
      `;
      return;
    }

    allWishes.forEach(item => {
      const wishDiv = document.createElement('div');
      wishDiv.className = 'wish-item';
      wishDiv.innerHTML = `
        <div class="wish-header">
          <span class="wish-name">${escapeHTML(item.name)}</span>
          <span class="wish-date">${escapeHTML(item.date)}</span>
        </div>
        <p class="wish-text">${escapeHTML(item.text)}</p>
      `;
      wishesFeed.appendChild(wishDiv);
    });
  }

  async function syncWishesFromCloud() {
    try {
      const res = await fetch(CLOUD_WISHES_URL);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && Array.isArray(json.data.wishes)) {
          allWishes = json.data.wishes;
          saveLocalWishes(allWishes);
          renderWishes();
        }
      }
    } catch (err) {
      console.log('Using local wishes fallback:', err);
    }
  }

  async function pushWishesToCloud(list) {
    try {
      await fetch(CLOUD_WISHES_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'mostafa_and_zienab_wedding_wishes_2026',
          data: {
            wishes: list
          }
        })
      });
    } catch (err) {
      console.error('Failed to sync wish to cloud:', err);
    }
  }

  function addWishToList(name, text) {
    const formattedDate = new Intl.DateTimeFormat(isRtl ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    const newWishItem = {
      name: name.trim(),
      text: text.trim(),
      date: formattedDate
    };

    allWishes.unshift(newWishItem);
    saveLocalWishes(allWishes);
    renderWishes();
    pushWishesToCloud(allWishes);
  }

  wishesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const wName = document.getElementById('wish-name').value;
    const wText = document.getElementById('wish-text').value;
    
    if (wName.trim() && wText.trim()) {
      addWishToList(wName, wText);
      wishesForm.reset();
    }
  });

  renderWishes();
  syncWishesFromCloud();

  // Helper utility to escape HTML
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // 7. Confetti Effect (Simple Canvas Particle generator)
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = 0;
    canvas.style.zIndex = 999;
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    
    const confettiColors = ['#511419', '#C9A24A', '#FAF6F0', '#a8323b'];
    const confettiCount = 150;
    const confettis = [];
    
    for (let i = 0; i < confettiCount; i++) {
      confettis.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: 4 + Math.random() * 6,
        d: Math.random() * confettiCount,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }
    
    let animationFrame;
    let opacity = 1.0;
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;
      
      confettis.forEach((c) => {
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(c.tiltAngle);
        c.tilt = Math.sin(c.tiltAngle - c.d / 3) * 15;
        
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });
      
      // Gradually fade out confetti
      opacity -= 0.005;
      if (opacity <= 0) {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
      } else {
        animationFrame = requestAnimationFrame(draw);
      }
    }
    
    draw();
  }
  
  // 8. Countdown Timer Logic
  const countdownEl = document.getElementById('countdown-timer');
  
  function updateCountdown() {
    if (!countdownEl) return;
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
      countdownEl.innerHTML = isRtl ? 'لقد بدأ الحفل السعيد!' : 'The celebration has begun!';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (isRtl) {
      countdownEl.innerHTML = `<span>${days} يوم</span> &nbsp;&nbsp; <span>${hours} ساعة</span> &nbsp;&nbsp; <span>${minutes} دقيقة</span> &nbsp;&nbsp; <span>${seconds} ثانية</span>`;
    } else {
      countdownEl.innerHTML = `<span>${days}d</span> &nbsp;&nbsp; <span>${hours}h</span> &nbsp;&nbsp; <span>${minutes}m</span> &nbsp;&nbsp; <span>${seconds}s</span>`;
    }
  }
  
  setInterval(updateCountdown, 1000);

  // Set initial language from URL parameter (default is 'en')
  const initialLang = getUrlLanguage();
  setLanguage(initialLang, false);

  // 9. Coverflow Photo Gallery Carousel Logic (Hand Swipe, Drag & Arrow Navigation)
  const galleryContainer = document.getElementById('gallery-container') || document.querySelector('.gallery-container');
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dots .dot');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  let currentSlideIndex = 0;

  function updateGallery() {
    if (slides.length === 0) return;
    slides.forEach((slide, idx) => {
      slide.className = 'gallery-slide'; // reset class
      
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else if (idx === (currentSlideIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('prev');
      } else if (idx === (currentSlideIndex + 1) % slides.length) {
        slide.classList.add('next');
      } else if (idx < currentSlideIndex) {
        slide.classList.add('hidden-left');
      } else {
        slide.classList.add('hidden-right');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateGallery();
  }

  function prevSlide() {
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateGallery();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentSlideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      updateGallery();
      resetAutoSlide();
    });
  });

  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => {
      if (idx !== currentSlideIndex) {
        currentSlideIndex = idx;
        updateGallery();
        resetAutoSlide();
      }
    });
  });

  // Touch Swipe Gesture Support (Direct hand swiping for mobile)
  if (galleryContainer) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwiping = false;

    galleryContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        touchEndY = touchStartY;
        isSwiping = true;
      }
    }, { passive: true });

    galleryContainer.addEventListener('touchmove', (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }, { passive: true });

    galleryContainer.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Check if horizontal swipe was intentional (> 32px) and greater than vertical movement
      if (Math.abs(diffX) > 32 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swiped left -> Next photo
          nextSlide();
        } else {
          // Swiped right -> Previous photo
          prevSlide();
        }
        resetAutoSlide();
      }
    }, { passive: true });

    // Mouse Drag Gesture Support (Desktop mouse drag)
    let isMouseDown = false;
    let mouseStartX = 0;

    galleryContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.gallery-nav-arrow') || e.target.closest('.gallery-dots')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 38) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoSlide();
      }
    });
  }

  let autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // 10. Scroll Animations powered by Anime.js (https://animejs.com/)
  function initScrollAnimations() {
    if (typeof anime === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const revealSelectors = [
      '.intro-section',
      '.burgundy-card',
      '.families-union-box',
      '.gallery-section',
      '.gallery-container',
      '.gallery-share-box',
      '.venue-location-section',
      '.photobooth-section',
      '.photobooth-card',
      '.wishes-section'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.willChange = 'opacity, transform';
    });

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 850,
            easing: 'easeOutCubic'
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => scrollObserver.observe(el));
  }

  initScrollAnimations();
  updateGallery();
});
