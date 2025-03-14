// Animation and dynamic effects
function setupAnimations() {
    // Setup animations for elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .contact-form, .service-detail, .case-study-card, .team-member, .blog-post');

    if (animatedElements && animatedElements.length > 0) {
        animatedElements.forEach(element => {
            if (element) {
                element.classList.add('animate-on-scroll');
            }
        });

        // Create intersection observer for animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target) {
                    entry.target.classList.add('animated');

                    // Special animations for specific elements
                    if (entry.target.classList.contains('feature-card')) {
                        // Add staggered animations to feature cards
                        const cards = document.querySelectorAll('.feature-card');
                        if (cards && cards.length > 0) {
                            const cardIndex = Array.from(cards).indexOf(entry.target);
                            entry.target.style.animationDelay = `${cardIndex * 0.1}s`;
                        }
                    }

                    // Once animated, unobserve to save performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-20px'
        });

        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Add particle effects to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        addParticles(heroSection);
    }
}

// Fix image loading issues with direct img tags
function loadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // If image fails to load, try with a direct URL
        img.onerror = function () {
            // Extract the category from the src or alt attribute
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || '';
            let category = 'office';

            if (alt.toLowerCase().includes('team')) category = 'team,office';
            if (alt.toLowerCase().includes('telecom')) category = 'telecommunications,technology';
            if (alt.toLowerCase().includes('event')) category = 'event,conference';
            if (alt.toLowerCase().includes('marketing')) category = 'marketing,advertising';

            // Set a fallback URL from Unsplash
            const randomNum = Math.floor(Math.random() * 100);
            img.src = `https://source.unsplash.com/random/800x600/?${category}&sig=${randomNum}`;
        };
    });
}

function setupImagePlaceholders() {
    // Map of section/element types to relevant image queries
    const imageMap = {
        'about': 'team,office',
        'service': 'marketing,business',
        'feature': 'technology,innovation',
        'team-member': 'professional,portrait',
        'case-study': 'project,success',
        'testimonial': 'client,meeting',
        'gallery': 'event,presentation',
        'blog': 'writing,media',
        'telekom': 'telecommunications,phone',
        'wizz': 'airplane,airport',
        'wolt': 'food,delivery',
        'night-run': 'running,event'
    };

    // Get all image placeholders
    const placeholders = document.querySelectorAll('.image-placeholder');

    placeholders.forEach(placeholder => {
        // Get parent element to determine context
        const parent = placeholder.closest('[class*="-card"], [class*="-content"], [class*="-image"], section[id]');
        let imageType = 'marketing';

        // Determine appropriate image type based on context
        if (parent) {
            const parentClass = parent.className;
            const parentId = parent.id || '';

            Object.keys(imageMap).forEach(key => {
                if (parentClass.toLowerCase().includes(key) || parentId.toLowerCase().includes(key)) {
                    imageType = imageMap[key];
                }
            });
        }

        // Add random number to prevent caching and get different images
        const randomNum = Math.floor(Math.random() * 100);
        placeholder.style.backgroundImage = `url('https://source.unsplash.com/random/800x600/?${imageType}&sig=${randomNum}')`;
    });
}

function setupColorScrollEffects() {
    const scrollTriggers = document.querySelectorAll('.feature-card, .service-content, .team-member');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        // Calculate scroll percentage
        const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

        // Update color variables based on scroll position
        document.documentElement.style.setProperty(
            '--scroll-blend',
            `hsl(${240 + (scrollPercentage * 120)}deg, 70%, 60%)`
        );

        // Apply color effects to elements in viewport
        scrollTriggers.forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < windowHeight && rect.bottom > 0;

            if (inView) {
                const viewportPosition = 1 - (rect.top / windowHeight);
                if (viewportPosition > 0 && viewportPosition < 1) {
                    // Apply custom color effect based on position
                    element.style.setProperty('--element-color', `hsl(${220 + (viewportPosition * 60)}deg, 70%, 60%)`);
                }
            }
        });
    });
}

function addParticles(section) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    section.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Interactive hover effects for cards
function setupCardInteractions() {
    const cards = document.querySelectorAll('.feature-card, .blog-post, .team-member, .service-icon-box');

    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                // Create subtle zoom effect instead of tilt
                card.style.transform = 'scale(1.03)';
                card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';

                // Reset on mouse leave
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            });
        });
    }
}

// Update active navigation based on current page
document.addEventListener('DOMContentLoaded', function () {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop();

    // Remove active class from all navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Set active class for current page link
    if (currentPage) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    } else {
        // If on index page
        document.querySelector('.nav-menu a[href="index.html"]').classList.add('active');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    // Get the height of the navbar
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    // Check each section's position
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20; // Subtract navbar height and add some buffer
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the corresponding link
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`).classList.add('active');
        }
    });
});

// Smooth appearance of elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observe feature cards, about section, and contact form
document.querySelectorAll('.feature-card, .about-content, .contact-form').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add fade-in animation class
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.show {
    opacity: 1;
    transform: translateY(0);
}
</style>
`);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill out all fields');
            return;
        }

        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);

        // Reset form
        contactForm.reset();
    });
}

// Button hover effect enhancement
const buttons = document.querySelectorAll('.cta-button, .secondary-button');
buttons.forEach(button => {
    button.addEventListener('mouseover', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mouseout', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Section indicator functionality
function setupSectionIndicator() {
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        // Create section indicator
        const indicator = document.createElement('div');
        indicator.className = 'section-indicator';

        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.setAttribute('data-section', section.id);
            dot.setAttribute('data-label', section.querySelector('h2, h3, .section-title')?.textContent || section.id);

            dot.addEventListener('click', () => {
                window.scrollTo({
                    top: section.offsetTop - 90,
                    behavior: 'smooth'
                });
            });

            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);

        // Update active dot on scroll
        window.addEventListener('scroll', updateActiveDot);
        updateActiveDot(); // Initial call
    }
}

function updateActiveDot() {
    const sections = document.querySelectorAll('section[id]');
    const dots = document.querySelectorAll('.indicator-dot');

    if (sections.length > 0) {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.id;
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }
}

// Back to top button
function setupBackToTop() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

// Initialize page - set home as active when page loads
window.addEventListener('DOMContentLoaded', function () {
    // Initialize all animations and effects
    setupAnimations();
    setupCardInteractions();
    setupSectionIndicator();
    setupBackToTop();
    setupColorScrollEffects();
    setupImagePlaceholders();
    loadImages();

    // Add active class to home link initially
    const homeLink = document.querySelector('.nav-menu a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Visual effect on the target section
                    targetElement.classList.add('highlight-section');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight-section');
                    }, 1500);

                    window.scrollTo({
                        top: targetElement.offsetTop - 90,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add parallax scrolling to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= window.innerHeight) {
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.6));
                }
            }
        });
    }
});