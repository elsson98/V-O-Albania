// Enhanced Animation Functions for Case Studies

// Intersection Observer for section animations
function setupSectionAnimations() {
    const sections = document.querySelectorAll('.cs-section');


    // Create observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // If section contains intro, animate it
                const intro = entry.target.querySelector('.section-intro');
                if (intro) {
                    setTimeout(() => {
                        intro.classList.add('animated');
                    }, 300);
                }

                // If section contains timeline, animate it
                const timeline = entry.target.querySelector('.process-timeline');
                if (timeline) {
                    setTimeout(() => {
                        timeline.classList.add('animated');

                        // Animate timeline items with delay
                        const items = timeline.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animated');
                            }, 500 + (index * 200));
                        });
                    }, 300);
                }

                // If section contains metric cards, animate them
                const metrics = entry.target.querySelectorAll('.metric-card');
                if (metrics.length > 0) {
                    metrics.forEach((metric, index) => {
                        setTimeout(() => {
                            metric.classList.add('animated');
                        }, 300 + (index * 150));
                    });
                }

                // Once animated, unobserve
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, rootMargin: '-50px'
    });

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Interactive hover effects for case study cards
function setupCardInteractions() {
    const cards = document.querySelectorAll('.case-study-card, .challenge-card, .timeline-content, .testimonial-card, .gallery-item, .related-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Create spotlight effect
            const spotlight = document.createElement('div');
            spotlight.className = 'card-spotlight';
            card.appendChild(spotlight);

            // Position spotlight based on mouse position
            const updateSpotlight = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                spotlight.style.left = `${x}px`;
                spotlight.style.top = `${y}px`;
            };

            updateSpotlight(e);

            // Move spotlight with mouse
            card.addEventListener('mousemove', updateSpotlight);

            // Remove spotlight on mouseleave
            card.addEventListener('mouseleave', () => {
                card.removeEventListener('mousemove', updateSpotlight);
                if (spotlight) {
                    spotlight.remove();
                }
            }, {once: true});
        });
    });
}

// Dynamic color shifts for section headers
function setupColorEffects() {
    const sectionHeadings = document.querySelectorAll('.section-heading h2');

    // Random pastel color generator
    const getRandomPastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 80%)`;
    };

    sectionHeadings.forEach(heading => {
        // Change color on scroll
        let lastScrollY = window.scrollY;
        let ticking = false;

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sections = document.querySelectorAll('.cs-section');
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const progress = 1 - (rect.top / window.innerHeight);
                            if (progress > 0 && progress < 1) {
                                const sectionHeading = section.querySelector('.section-heading h2');
                                if (sectionHeading) {
                                    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                                    sectionHeading.style.setProperty('--section-color', color);
                                }
                            }
                        }
                    });
                    ticking = false;
                });

                ticking = true;
            }
        });
    });
}

// Parallax effects for hero section
function setupParallax() {
    const heroSection = document.querySelector('.case-study-hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition <= window.innerHeight) {
            const translateY = scrollPosition * 0.4;
            heroSection.style.backgroundPositionY = `calc(50% + ${translateY}px)`;

            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.6));
            }
        }
    });
}

// Add particle background to hero section
function setupParticles() {
    const heroSection = document.querySelector('.case-study-hero');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position and size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

        particlesContainer.appendChild(particle);
    }
}

// Initialize all dynamic effects
document.addEventListener('DOMContentLoaded', () => {
    setupSectionAnimations();
    setupCardInteractions();
    setupColorEffects();
    setupParallax();
    setupParticles();

    // Setup sticky navigation with animation
    const navBar = document.getElementById('case-study-nav');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                navBar.classList.add('sticky');
            } else {
                navBar.classList.remove('sticky');
            }

            // Highlight active section in nav
            const sections = document.querySelectorAll('.cs-section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            const navLinks = document.querySelectorAll('.case-study-nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling for nav links
        const navLinks = document.querySelectorAll('.case-study-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(this.getAttribute('href'));

                window.scrollTo({
                    top: target.offsetTop - 100, behavior: 'smooth'
                });
            });
        });
    }
});