(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const modal = document.querySelector('#booking-modal');
  const modalPanel = modal?.querySelector('.modal-panel');
  const photoLightbox = document.querySelector('#photo-lightbox');
  const photoLightboxImage = photoLightbox?.querySelector('[data-photo-lightbox-image]');
  let lastFocused = null;
  let lastPhotoFocused = null;

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileMenu?.classList.toggle('is-open', !open);
    mobileMenu?.setAttribute('aria-hidden', String(open));
    body.classList.toggle('menu-open', !open);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1050) closeMenu();
  });

  const openModal = (trigger) => {
    lastFocused = trigger || document.activeElement;
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    window.setTimeout(() => modal?.querySelector('.modal-close')?.focus(), 50);
  };

  const closeModal = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    lastFocused?.focus?.();
  };

  document.querySelectorAll('[data-booking]').forEach((button) => {
    button.addEventListener('click', () => openModal(button));
  });
  document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));

  const openPhotoLightbox = (trigger) => {
    if (!photoLightbox || !photoLightboxImage) return;
    const src = trigger.dataset.photoSrc;
    if (!src) return;
    lastPhotoFocused = trigger;
    photoLightboxImage.src = src;
    photoLightboxImage.alt = 'Фотография Марии';
    photoLightbox.classList.add('is-open');
    photoLightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    window.setTimeout(() => photoLightbox.querySelector('.photo-lightbox-close')?.focus(), 50);
  };

  const closePhotoLightbox = () => {
    if (!photoLightbox) return;
    photoLightbox.classList.remove('is-open');
    photoLightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    window.setTimeout(() => {
      if (photoLightboxImage) photoLightboxImage.removeAttribute('src');
    }, 260);
    lastPhotoFocused?.focus?.();
  };

  document.addEventListener('click', (event) => {
    const photoButton = event.target.closest('[data-photo-src]');
    if (photoButton) openPhotoLightbox(photoButton);
  });
  document.querySelectorAll('[data-photo-close]').forEach((button) => button.addEventListener('click', closePhotoLightbox));

  const servicesCatalog = document.querySelector('[data-services]');
  if (servicesCatalog) {
    const serviceData = {
      dogs: {
        haircut: {
          title: 'Стрижка',
          procedures: [
            ['Вычес подшёрстка', 'распутывание колтунов, исходя из породы'],
            ['Гигиена подушечек лап', 'выбривание'],
            ['Гигиена ушей и глаз'],
            ['Стрижка + подпил когтей'],
            ['Купание в три/четыре этапа', 'очищение, увлажнение, придание яркости цвета/осветление, питание'],
            ['Стрижка допустимая породой', 'с учётом пожелания владельца'],
          ],
          prices: [['Маленькие породы', 'от 1600 руб'], ['Средние породы', 'от 3000 руб'], ['Крупные породы', 'от 4500 руб']],
        },
        trimming: {
          title: 'Триминг',
          procedures: [
            ['Триминг'],
            ['Гигиена подушечек лап', 'выбривание'],
            ['Гигиена ушей и глаз'],
            ['Стрижка + подпил когтей'],
            ['Купание в три/четыре этапа', 'очищение, увлажнение, придание яркости цвета/осветление, питание'],
            ['Окантовка лап', 'допустимая породой'],
          ],
          prices: [['Маленькие породы', 'от 2600 руб'], ['Средние породы', 'от 3500 руб'], ['Крупные породы', 'от 4500 руб'], ['Гигантские породы', 'от 7500 руб']],
        },
        shedding: {
          title: 'Экспресс-линька',
          procedures: [
            ['Первый этап вычеса'],
            ['Гигиена подушечек лап', 'выбривание'],
            ['Гигиена ушей и глаз'],
            ['Стрижка + подпил когтей'],
            ['Купание в три/четыре этапа', 'очищение, увлажнение, придание яркости цвета/осветление, питание'],
            ['Второй этап вычеса'],
            ['Окантовка по корпусу', 'допустимая породой с учётом пожелания владельца'],
          ],
          prices: [['Маленькие породы', 'от 1100 руб'], ['Средние породы', 'от 1800 руб'], ['Крупные породы', 'от 3700 руб'], ['Гигантские породы', 'от 4500 руб']],
        },
        extra: {
          title: 'Дополнительно',
          procedures: [
            ['Стрижка когтей + подпил'],
            ['Вычес с/без колтунов'],
            ['Окантовка ушей'],
            ['Силиконовые ноготки'],
            ['Стрижка по корпусу'],
            ['Чистка глаз'],
            ['Бритьё подушечек лап'],
            ['Стрижка морды'],
            ['Разбор колтунов'],
            ['Стрижка интимных зон'],
            ['Гигиена полости рта'],
            ['Окантовка штанишек с бритьём подушечек лап'],
            ['Гигиена ушей', 'удаление волоса, чистка лосьоном/без лосьона'],
          ],
          prices: [],
        },
      },
      cats: {
        care: {
          title: 'Уход за кошками',
          procedures: [
            ['Вычес / стрижка машинкой'],
            ['Стрижка когтей'],
            ['Купание в три этапа', 'очищение, увлажнение, питание'],
            ['Окантовка', 'с учётом пожелания владельца'],
            ['Стрижка под льва + когти'],
            ['Вычес + когти'],
            ['Комплекс', 'вычес / стрижка, когти, сушка'],
          ],
          prices: [],
        },
      },
    };

    const petTabs = [...servicesCatalog.querySelectorAll('[data-pet]')];
    const dogTabsWrap = servicesCatalog.querySelector('[data-dog-tabs]');
    const dogTabs = [...servicesCatalog.querySelectorAll('[data-service]')];
    const title = servicesCatalog.querySelector('[data-service-title]');
    const procedureList = servicesCatalog.querySelector('[data-service-list]');
    const priceSection = servicesCatalog.querySelector('[data-service-price-section]');
    const priceList = servicesCatalog.querySelector('[data-service-prices]');
    const bookingOnly = servicesCatalog.querySelector('[data-service-booking-only]');
    let activePet = 'dogs';
    let activeDogService = 'haircut';

    const renderProcedures = (procedures) => {
      procedureList.replaceChildren(...procedures.map(([name, description]) => {
        const item = document.createElement('li');
        const check = document.createElement('i');
        const copy = document.createElement('div');
        const heading = document.createElement('strong');
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';
        heading.textContent = name;
        copy.append(heading);
        if (description) {
          const detail = document.createElement('small');
          detail.textContent = description;
          copy.append(detail);
        }
        item.append(check, copy);
        return item;
      }));
    };

    const renderPrices = (prices) => {
      priceList.replaceChildren(...prices.map(([name, cost]) => {
        const row = document.createElement('div');
        const label = document.createElement('span');
        const value = document.createElement('strong');
        label.textContent = name;
        value.textContent = cost;
        row.append(label, value);
        return row;
      }));
    };

    const renderService = () => {
      const service = activePet === 'dogs' ? serviceData.dogs[activeDogService] : serviceData.cats.care;
      title.textContent = service.title;
      renderProcedures(service.procedures);
      renderPrices(service.prices);
      const hasPrices = service.prices.length > 0;
      priceSection.hidden = !hasPrices;
      bookingOnly.hidden = hasPrices;
      dogTabsWrap.hidden = activePet !== 'dogs';

      petTabs.forEach((tab) => {
        const isActive = tab.dataset.pet === activePet;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      dogTabs.forEach((tab) => {
        const isActive = tab.dataset.service === activeDogService;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
    };

    petTabs.forEach((tab) => tab.addEventListener('click', () => {
      activePet = tab.dataset.pet;
      renderService();
    }));
    dogTabs.forEach((tab) => tab.addEventListener('click', () => {
      activePet = 'dogs';
      activeDogService = tab.dataset.service;
      renderService();
    }));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (photoLightbox?.classList.contains('is-open')) closePhotoLightbox();
      else if (modal?.classList.contains('is-open')) closeModal();
      else closeMenu();
    }
    if (event.key === 'Tab' && photoLightbox?.classList.contains('is-open')) {
      event.preventDefault();
      photoLightbox.querySelector('.photo-lightbox-close')?.focus();
    }
    if (event.key === 'Tab' && modal?.classList.contains('is-open')) {
      const focusable = [...modalPanel.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.querySelectorAll('.faq-list details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.faq-list details').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  document.querySelectorAll('.care-steps details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.care-steps details').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const replayDelay = Number(heroVideo.dataset.replayDelay) || 2200;
    let replayTimer = 0;
    let transitionTimer = 0;
    let monitorFrame = 0;
    let waitingToReplay = false;

    const restartVideo = () => {
      window.clearTimeout(replayTimer);
      replayTimer = window.setTimeout(() => {
        if (document.hidden) return;
        heroVideo.currentTime = 0;
        waitingToReplay = false;
        heroVideo.play().catch(() => {});
      }, replayDelay);
    };

    const returnToStart = () => {
      if (waitingToReplay) return;
      waitingToReplay = true;
      heroVideo.pause();
      heroVideo.classList.add('is-transitioning');
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        heroVideo.currentTime = 0;
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
          heroVideo.classList.remove('is-transitioning');
          restartVideo();
        }));
      }, 720);
    };

    const monitorPlayback = () => {
      window.cancelAnimationFrame(monitorFrame);
      if (waitingToReplay || heroVideo.paused) return;
      if (Number.isFinite(heroVideo.duration) && heroVideo.currentTime >= heroVideo.duration - .08) {
        returnToStart();
        return;
      }
      monitorFrame = window.requestAnimationFrame(monitorPlayback);
    };

    heroVideo.addEventListener('play', monitorPlayback);
    heroVideo.addEventListener('playing', monitorPlayback);
    heroVideo.addEventListener('ended', returnToStart);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.clearTimeout(replayTimer);
        window.clearTimeout(transitionTimer);
      }
      else if (waitingToReplay) {
        heroVideo.currentTime = 0;
        heroVideo.classList.remove('is-transitioning');
        restartVideo();
      }
    });
    if (!heroVideo.paused) monitorPlayback();
  }

  const clientGallery = document.querySelector('[data-client-gallery]');
  if (clientGallery) {
    const viewport = clientGallery.querySelector('[data-client-viewport]');
    const slides = [...clientGallery.querySelectorAll('.client-slide')];
    const previous = clientGallery.querySelector('[data-client-prev]');
    const next = clientGallery.querySelector('[data-client-next]');
    const position = clientGallery.querySelector('[data-client-position]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragging = false;
    let galleryFrame = 0;

    const closestSlide = () => slides.reduce((closest, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

    const updateClientPosition = () => {
      const index = closestSlide();
      if (position) position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };

    const scrollBySlide = (direction) => {
      const first = slides[0];
      if (!first) return;
      const gap = Number.parseFloat(getComputedStyle(first.parentElement).gap) || 0;
      viewport.scrollBy({ left: direction * (first.getBoundingClientRect().width + gap), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };

    previous?.addEventListener('click', () => scrollBySlide(-1));
    next?.addEventListener('click', () => scrollBySlide(1));
    viewport?.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollBySlide(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollBySlide(1);
      }
    });
    viewport?.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true;
      dragStartX = event.clientX;
      dragStartScroll = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(event.pointerId);
    });
    viewport?.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });
    const stopClientDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    };
    viewport?.addEventListener('pointerup', stopClientDrag);
    viewport?.addEventListener('pointercancel', stopClientDrag);
    viewport?.addEventListener('scroll', () => {
      window.cancelAnimationFrame(galleryFrame);
      galleryFrame = window.requestAnimationFrame(updateClientPosition);
    }, { passive: true });
    updateClientPosition();
  }

  document.querySelectorAll('[data-review-carousel]').forEach((carousel) => {
    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const slides = [...carousel.querySelectorAll('.review-slide')];
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let scrollFrame = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    if (!viewport || !slides.length || !dotsWrap) return;

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Показать отзыв ${index + 1}`);
      dot.addEventListener('click', () => moveTo(index));
      dotsWrap.append(dot);
      return dot;
    });

    const updateDots = () => {
      dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === current)));
    };

    const moveTo = (index, behavior = reduceMotion.matches ? 'auto' : 'smooth') => {
      current = (index + slides.length) % slides.length;
      viewport.scrollTo({ left: current * viewport.clientWidth, behavior });
      updateDots();
    };

    previous?.addEventListener('click', () => moveTo(current - 1));
    next?.addEventListener('click', () => moveTo(current + 1));
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveTo(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveTo(current + 1);
      }
    });
    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true;
      dragStartX = event.clientX;
      dragStartScroll = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });
    const stopReviewDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    };
    viewport.addEventListener('pointerup', stopReviewDrag);
    viewport.addEventListener('pointercancel', stopReviewDrag);
    viewport.addEventListener('scroll', () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const nextIndex = Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1));
        if (nextIndex !== current && nextIndex >= 0 && nextIndex < slides.length) {
          current = nextIndex;
          updateDots();
        }
      });
    }, { passive: true });
    window.addEventListener('resize', () => moveTo(current, 'auto'));
    updateDots();
  });

  const mobileSticky = document.querySelector('.mobile-sticky');
  const contactsBooking = document.querySelector('#contacts [data-booking]');
  if (mobileSticky && contactsBooking && 'IntersectionObserver' in window) {
    const stickyObserver = new IntersectionObserver(([entry]) => {
      mobileSticky.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0.4 });
    stickyObserver.observe(contactsBooking);
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
