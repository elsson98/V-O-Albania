// Unified Animation Controller
const animationConfig = {
    components: {
        sections: '.cs-section',
        intro: '.section-intro',
        timeline: {
            container: '.process-timeline',
            items: '.timeline-item',
            stagger: 300
        },
        metrics: {
            selector: '.metric-card',
            stagger: 150
        },
        stats: {
            selector: '.stat-box',
            stagger: 200
        },
        headings: '.section-heading',
        content: ['.results-detail', '.section-description']
    },
    observerOptions: {
        threshold: 0.05,
        rootMargin: '-25px 0px -50px 0px'
    }
};

function animateElements(elements, stagger = 0) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        }, index * stagger);
    });
}

function handleSectionAnimations() {
    const sections = document.querySelectorAll(animationConfig.components.sections);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;

                // Animate section intro
                const intro = section.querySelector(animationConfig.components.intro);
                if (intro) animateElements([intro]);

                // Animate headings
                const headings = section.querySelectorAll(animationConfig.components.headings);
                if (headings.length) {
                    animateElements(headings, 150);
                }

                // Handle timeline animation
                const timeline = section.querySelector(animationConfig.components.timeline.container);
                if (timeline) {
                    timeline.classList.add('animated');
                    animateElements(
                        timeline.querySelectorAll(animationConfig.components.timeline.items),
                        animationConfig.components.timeline.stagger
                    );
                }

                // Animate other components
                ['metrics', 'stats'].forEach(type => {
                    const elements = section.querySelectorAll(animationConfig.components[type].selector);
                    if (elements.length) {
                        animateElements(elements, animationConfig.components[type].stagger);
                    }
                });

                // Force content visibility
                animationConfig.components.content.forEach(selector => {
                    section.querySelectorAll(selector).forEach(el => {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    });
                });
            }
        });
    }, animationConfig.observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Optimized Card Interactions
function setupCardInteractions() {
    const cards = document.querySelectorAll([
        '.case-study-card',
        '.challenge-card',
        '.timeline-content',
        '.testimonial-card',
        '.gallery-item',
        '.related-card'
    ].join(','));

    cards.forEach(card => {
        let spotlight;

        card.addEventListener('mouseenter', (e) => {
            spotlight = document.createElement('div');
            spotlight.className = 'card-spotlight';
            card.appendChild(spotlight);
            updateSpotlight(e);

            card.addEventListener('mousemove', updateSpotlight);
        });

        const updateSpotlight = (e) => {
            const rect = card.getBoundingClientRect();
            spotlight.style.left = `${e.clientX - rect.left}px`;
            spotlight.style.top = `${e.clientY - rect.top}px`;
        };

        card.addEventListener('mouseleave', () => {
            card.removeEventListener('mousemove', updateSpotlight);
            spotlight?.remove();
        }, { once: true });
    });
}

// Optimized Color Effects
function setupColorEffects() {
    const scrollHandler = () => {
        document.querySelectorAll('.cs-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const heading = section.querySelector('.section-heading h2');
                if (heading) {
                    heading.style.setProperty('--section-color',
                        getComputedStyle(document.documentElement)
                            .getPropertyValue('--primary-color'));
                }
            }
        });
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(scrollHandler);
    }, { passive: true });
}

// Parallax with RAF
function setupParallax() {
    const heroSection = document.querySelector('.case-study-hero');
    if (!heroSection) return;

    const parallax = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition <= window.innerHeight) {
            heroSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.4}px)`;
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.6));
            }
        }
        requestAnimationFrame(parallax);
    };
    parallax();
}

// Particle System
function setupParticles() {
    const heroSection = document.querySelector('.case-study-hero');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);

    Array.from({ length: 50 }).forEach(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        Object.assign(particle.style, {
            width: `${Math.random() * 5 + 1}px`,
            height: 'auto',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
        });
        particlesContainer.appendChild(particle);
    });
}

// Unified Initialization
document.addEventListener('DOMContentLoaded', () => {
    handleSectionAnimations();
    setupCardInteractions();
    setupColorEffects();
    setupParallax();
    setupParticles();

    // Sticky Navigation
    const navBar = document.getElementById('case-study-nav');
    if (navBar) {
        const updateNav = () => {
            navBar.classList.toggle('sticky', window.scrollY > 300);

            const currentSection = [...document.querySelectorAll('.cs-section')]
                .find(section => {
                    const { top, bottom } = section.getBoundingClientRect();
                    return top <= 150 && bottom >= 150;
                })?.id;

            document.querySelectorAll('.case-study-nav a').forEach(link => {
                link.classList.toggle('active', link.hash === `#${currentSection}`);
            });
        };

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateNav);
        }, { passive: true });

        // Smooth scroll
        document.querySelectorAll('.case-study-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});