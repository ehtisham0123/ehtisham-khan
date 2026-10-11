/**
* Template Name: Personal - v4.9.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Top Navbar - Hamburger toggle
   */
  const hamburger = document.getElementById('topnavHamburger');
  const mobileMenu = document.getElementById('topnavMobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }



  /**
   * Top Navbar - Section show/hide on link click
   */
  function closeTopnavMobile() {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger && hamburger.classList.remove('open');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  function setActiveNavLink(href) {
    document.querySelectorAll('.topnav-link').forEach(function (lnk) {
      lnk.classList.remove('active');
      if (lnk.getAttribute('href') === href) {
        lnk.classList.add('active');
      }
    });
  }

  document.querySelectorAll('.topnav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();

      const header   = document.getElementById('header');
      const allSections = document.querySelectorAll('section');

      closeTopnavMobile();
      setActiveNavLink(targetId);

      // Home — collapse header back to hero, hide all sections
      if (targetId === '#hero') {
        header && header.classList.remove('header-top');
        allSections.forEach(function (s) { s.classList.remove('section-show'); });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Section link — compact header, show target section
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(function () {
          allSections.forEach(function (s) { s.classList.remove('section-show'); });
          targetSection.classList.add('section-show');
        }, 350);
      } else {
        allSections.forEach(function (s) { s.classList.remove('section-show'); });
        targetSection.classList.add('section-show');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /**
   * Top Navbar - Scroll background change
   */
  const topnav = document.getElementById('topnav');
  window.addEventListener('scroll', function () {
    if (topnav) {
      topnav.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });

  /**
   * Activate section on page load if URL has a hash
   */
  window.addEventListener('load', function () {
    if (window.location.hash && window.location.hash !== '#hero') {
      const header = document.getElementById('header');
      const allSections = document.querySelectorAll('section');
      const target = document.querySelector(window.location.hash);
      if (target && header) {
        header.classList.add('header-top');
        setActiveNavLink(window.location.hash);
        setTimeout(function () { target.classList.add('section-show'); }, 350);
      }
    }
  });






  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
        percentPosition: true
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()