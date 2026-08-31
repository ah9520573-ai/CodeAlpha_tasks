/**
 * PORTFOLIO APPLICATION JAVASCRIPT ENGINE
 * Author: Full Stack Developer Portfolio (Task 2)
 * Features: Mobile Drawer, Dynamic Typewriter, Theme Switcher, Project Filter,
 *           Interactive Modal, Testimonials Carousel, Stat Counters, Form Validation & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. THEME SWITCHER (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('portfolio-theme', theme);
  };

  // Initial Theme Setup
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (!prefersDark) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast('Theme Changed', `Switched to ${newTheme} mode!`);
    });
  }

  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (shouldOpen) {
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('active');
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('active');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileNav());
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileNav(false));
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // ==========================================
  // 3. STICKY HEADER & SCROLL SPY
  // ==========================================
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header Background
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to Top Visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll Spy for Nav Links
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
      mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================
  // 4. DYNAMIC TYPEWRITER EFFECT
  // ==========================================
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const phrases = [
      'Computer Science Student',
      'Aspiring Web Developer',
      'React & Node.js Learner',
      'Agentic AI Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = 400;
      }

      setTimeout(type, timeout);
    };

    type();
  }

  // ==========================================
  // 5. ANIMATED STATISTIC COUNTERS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const suffix = stat.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = ease * target;

        stat.textContent = isDecimal ? currentVal.toFixed(1) + suffix : Math.floor(currentVal) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  // Observer for Stats Section
  const statsSection = document.getElementById('stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsCounted) {
        statsCounted = true;
        animateStats();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 6. SKILLS FILTER & PROGRESS BARS
  // ==========================================
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Filter skills
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Animate skill progress bars
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-progress');
          bar.style.width = width + '%';
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillsObserver.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-progress') + '%';
    });
  }

  // ==========================================
  // 7. PROJECTS FILTER & DETAIL MODAL
  // ==========================================
  const projectFilters = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // Project Details Data Map
  const projectsData = {
    '1': {
      title: 'Task Dashboard',
      tag: 'Full-Stack CRUD App',
      image: 'assets/images/project1.jpg',
      tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
      description: 'A task management dashboard with complete create, read, update, and delete workflows connected to a PostgreSQL-backed Express API.',
      features: [
        'Create, read, update, and delete task workflows',
        'React frontend connected to an Express backend',
        'PostgreSQL persistence for task records',
        'Loading and error states for a practical user experience'
      ],
      liveUrl: '#',
      repoUrl: 'https://github.com'
    },
    '2': {
      title: 'Secure Ecommerce Store',
      tag: 'Full-Stack E-Commerce',
      image: 'assets/images/project2.jpg',
      tags: ['React', 'Node.js', 'Express', 'JWT Auth', 'PostgreSQL'],
      description: 'A React and Express ecommerce application with authentication, product browsing, persistent carts, checkout, and delivery flows.',
      features: [
        'User registration and JWT-based authentication',
        'Product browsing and product detail views',
        'Persistent cart quantity updates and clearing',
        'Protected checkout and delivery pages'
      ],
      liveUrl: '#',
      repoUrl: 'https://github.com'
    },
    '3': {
      title: 'Ecommerce User API',
      tag: 'AI & Developer Tooling',
      image: 'assets/images/project3.jpg',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'GitHub Actions'],
      description: 'A REST API with a POST /users endpoint backed by PostgreSQL for user creation and persistent storage.',
      features: [
        'POST /users endpoint for user creation',
        'Database schema designed for persistent user records',
        'Express backend integrated with PostgreSQL',
        'GitHub Actions CI pipeline running tests against PostgreSQL'
      ],
      liveUrl: '#',
      repoUrl: 'https://github.com'
    },
    '4': {
      title: 'Agentic AI Development',
      tag: 'DevOps & Cloud Monitoring',
      image: 'assets/images/project4.jpg',
      tags: ['Agentic AI', 'Python', 'Coursera', 'Blender Interest'],
      description: 'An emerging area of practice developed through the Agentic AI Developer certification on Coursera and continued independent learning.',
      features: [
        'Agentic AI Developer certification from Coursera',
        'Growing interest in practical AI development',
        'Continued learning alongside web development studies',
        'Exploring 3D design using Blender'
      ],
      liveUrl: '#',
      repoUrl: 'https://github.com'
    }
  };

  // Modal DOM Elements
  const modalOverlay = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalLiveBtn = document.getElementById('modal-live-btn');
  const modalRepoBtn = document.getElementById('modal-repo-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    // Render Tags
    modalTags.innerHTML = data.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('');

    // Render Features
    modalFeatures.innerHTML = data.features.map(f => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${f}</span>
      </li>
    `).join('');

    modalLiveBtn.href = data.liveUrl;
    modalRepoBtn.href = data.repoUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Trigger modal on buttons
  const detailButtons = document.querySelectorAll('.open-modal-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  // Keyboard Close (ESC)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) closeProjectModal();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) toggleMobileNav(false);
    }
  });

  // ==========================================
  // 8. TESTIMONIALS SLIDER
  // ==========================================
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  let currentSlide = 0;
  let sliderInterval = null;

  const goToSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetSliderInterval(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetSliderInterval(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetSliderInterval();
    });
  });

  const startSliderInterval = () => {
    sliderInterval = setInterval(nextSlide, 6000);
  };
  const resetSliderInterval = () => {
    clearInterval(sliderInterval);
    startSliderInterval();
  };

  if (slides.length > 0) startSliderInterval();

  // ==========================================
  // 9. INTERACTIVE CONTACT FORM & TOAST ENGINE
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');
  let toastTimer = null;

  function showToast(title, message) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastDesc.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  window.showToast = showToast;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const validateField = (input, condition) => {
        const parent = input.closest('.form-group');
        if (!condition) {
          parent.classList.add('has-error');
          isValid = false;
        } else {
          parent.classList.remove('has-error');
        }
      };

      validateField(nameInput, nameInput.value.trim().length >= 2);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      validateField(subjectInput, subjectInput.value.trim().length >= 3);
      validateField(messageInput, messageInput.value.trim().length >= 10);

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Sending...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();
          showToast('Message Dispatched!', `Thank you ${nameInput.value.trim()}, I'll reply within 24 hours.`);
        }, 1200);
      }
    });

    // Real-time error clearing on input
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const parent = input.closest('.form-group');
        if (parent) parent.classList.remove('has-error');
      });
    });
  }

  // ==========================================
  // 10. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // 11. BACK TO TOP CLICK HANDLER
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
