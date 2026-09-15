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

  // 1. Generate ambient falling particles (hearts and petals)
  const particlesContainer = document.querySelector('.particles-container');
  const colors = ['#ece4d8', '#c9a24a', '#7a1f26', '#a8323b'];
  
  function createParticles() {
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = 6 + Math.random() * 8;
      const size = 10 + Math.random() * 15;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sway = -25 + Math.random() * 50;
      
      // Render heart shape
      particle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;
      
      particle.style.left = `${left}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.setProperty('--sway', `${sway}px`);
      
      particlesContainer.appendChild(particle);
    }
  }
  
  createParticles();

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

  function openEnvelope() {
    envelopeOverlay.classList.add('opened');
    mainInvitation.classList.add('visible');
    
    // Play music when they open if it hasn't already started
    playMusic();
    
    // Confetti explosion effect (simple canvas)
    triggerConfetti();

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
  }
  
  btnOpen.addEventListener('click', openEnvelope);
  waxSeal.addEventListener('click', openEnvelope);

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

  // 6. Wishes Guestbook Logic
  const defaultWishes = [];
  
  function getWishes() {
    const local = localStorage.getItem('wedding_wishes_v3');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return [];
      }
    }
    return defaultWishes;
  }
  
  function renderWishes() {
    const list = getWishes();
    wishesFeed.innerHTML = '';
    
    if (list.length === 0) {
      wishesFeed.innerHTML = `
        <div class="empty-wishes-placeholder" style="text-align: center; padding: 25px 15px; color: var(--text-muted); font-size: 0.85rem; font-family: var(--font-arabic);">
          <span class="lang-ar">كن أول من يكتب تهنئة للعروسين في دفتر التهاني ❤️✨</span>
          <span class="lang-en">Be the first to leave your congratulations for the couple! ❤️✨</span>
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const wishDiv = document.createElement('div');
      wishDiv.className = 'wish-item';
      wishDiv.innerHTML = `
        <div class="wish-header">
          <span class="wish-name">${escapeHTML(item.name)}</span>
          <span class="wish-date">${item.date}</span>
        </div>
        <p class="wish-text">${escapeHTML(item.text)}</p>
      `;
      wishesFeed.appendChild(wishDiv);
    });
  }
  
  function addWishToList(name, text) {
    const list = getWishes();
    const newWishItem = {
      name: name,
      text: text,
      date: isRtl ? 'الآن' : 'Just now'
    };
    list.unshift(newWishItem);
    localStorage.setItem('wedding_wishes_v3', JSON.stringify(list));
    renderWishes();
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

  // 9. Coverflow Photo Gallery Carousel Logic
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dots .dot');
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

  let autoSlide = setInterval(() => {
    if (slides.length > 0) {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateGallery();
    }
  }, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      if (slides.length > 0) {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateGallery();
      }
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
      '.dresscode-section',
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
