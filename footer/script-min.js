// Combined functionality script
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 90, behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Set active class on current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Simple form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Form submitted successfully!');
            form.reset();
        });
    });

    // Hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // SECTION INDICATOR
    // Create section indicator
    function setupSectionIndicator() {
        // Remove any existing indicators
        const existingIndicator = document.querySelector('.section-indicator');
        if (existingIndicator) existingIndicator.remove();

        // Get all sections with IDs
        const sections = document.querySelectorAll('section[id]');

        if (sections.length > 0) {
            // Create indicator container
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';

            // Apply styles directly to ensure they work
            Object.assign(indicator.style, {
                position: 'fixed',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                zIndex: '9999',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                backgroundColor: 'rgba(242, 241, 234, 0.3)',
                padding: '10px 5px',
                borderRadius: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
            });

            // Create dots for each section
            sections.forEach(section => {
                const dot = document.createElement('div');
                dot.className = 'indicator-dot';

                // Get section title
                let sectionTitle = '';
                const heading = section.querySelector('h2, h3, .section-title');
                if (heading) {
                    sectionTitle = heading.textContent;
                } else {
                    sectionTitle = section.id
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/-/g, ' ')
                        .replace(/^\w/, c => c.toUpperCase());
                }

                dot.setAttribute('data-section', section.id);
                dot.setAttribute('data-label', sectionTitle);

                // Add styles to dot
                Object.assign(dot.style, {
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#d3d3d0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    border: '2px solid transparent'
                });

                // Add click handler
                dot.addEventListener('click', () => {
                    window.scrollTo({
                        top: section.offsetTop - 90,
                        behavior: 'smooth'
                    });
                });

                // Add tooltip styles
                const style = document.createElement('style');
                style.textContent = `
                    .indicator-dot::before {
                        content: attr(data-label);
                        position: absolute;
                        right: 25px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #333333;
                        color: #f2f1ea;
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 12px;
                        white-space: nowrap;
                        opacity: 0;
                        transition: opacity 0.3s;
                        pointer-events: none;
                    }
                    
                    .indicator-dot:hover::before,
                    .indicator-dot.active::before {
                        opacity: 1;
                    }
                `;
                document.head.appendChild(style);

                indicator.appendChild(dot);
            });

            document.body.appendChild(indicator);

            // Update on scroll
            window.addEventListener('scroll', updateActiveDot);
            updateActiveDot(); // Initial update
        }
    }

    function updateActiveDot() {
        const sections = document.querySelectorAll('section[id]');
        const dots = document.querySelectorAll('.indicator-dot');

        if (sections.length > 0 && dots.length > 0) {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.id;
                }
            });

            dots.forEach(dot => {
                if (dot.getAttribute('data-section') === current) {
                    dot.classList.add('active');
                    dot.style.backgroundColor = '#333333';
                    dot.style.transform = 'scale(1.3)';
                    dot.style.borderColor = '#f2f1ea';
                } else {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = '#d3d3d0';
                    dot.style.transform = '';
                    dot.style.borderColor = 'transparent';
                }
            });
        }
    }

    // Initialize section indicator
    setupSectionIndicator();

    // TESTIMONIAL SLIDESHOW
    const slides = document.querySelectorAll('.testimonial-slide');
    const slideDots = document.querySelectorAll('.dot');

    if (slides.length > 0 && slideDots.length > 0) {
        let currentSlide = 0;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slideDots.forEach(dot => dot.classList.remove('active'));

            slides[n].classList.add('active');
            slideDots[n].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlide = (currentSlide + direction + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function goToSlide(n) {
            currentSlide = n;
            showSlide(currentSlide);
        }

        // Set up click handlers
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Auto rotate slides
        setInterval(() => changeSlide(1), 5000);
    }
});