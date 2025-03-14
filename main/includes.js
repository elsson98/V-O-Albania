document.addEventListener('DOMContentLoaded', function () {
    // Determine current path and directory level
    const path = window.location.pathname;
    const inMainDir = path.includes('/main/') || path.endsWith('/');
    const inCaseStudyDir = path.includes('/case-study/');
    const inFooterDir = path.includes('/footer/');

    // Set base paths based on current location
    let headerPath, footerPath;

    if (inMainDir) {
        headerPath = 'header.html';
        footerPath = 'footer.html';
    } else if (inCaseStudyDir) {
        headerPath = '../main/header.html';
        footerPath = '../main/footer.html';
    } else if (inFooterDir) {
        headerPath = '../main/header.html';
        footerPath = '../main/footer.html';
    } else {
        // Default fallback
        headerPath = './main/header.html';
        footerPath = './main/footer.html';
    }

    // Load header
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-include').innerHTML = data;
            setupMobileMenu();
            setActiveNavItem();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-include').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Remove active class from all nav items
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Set active class based on current page
    if (currentPage === 'index.html' || currentPage === '') {
        document.querySelector('.nav-menu a[href="index.html"]')?.classList.add('active');
    } else if (currentPage.includes('about')) {
        document.querySelector('.nav-menu a[href="about.html"]')?.classList.add('active');
    } else if (currentPage.includes('service')) {
        document.querySelector('.nav-menu a[href="services.html"]')?.classList.add('active');
    } else if (currentPage.includes('case-stud')) {
        document.querySelector('.nav-menu a[href="case-studies.html"]')?.classList.add('active');
    } else if (currentPage.includes('client')) {
        document.querySelector('.nav-menu a[href="clients.html"]')?.classList.add('active');
    } else if (currentPage.includes('contact')) {
        document.querySelector('.nav-menu a[href="contact.html"]')?.classList.add('active');
    } else if (currentPage.includes('blog')) {
        document.querySelector('.nav-menu a[href="blog.html"]')?.classList.add('active');
    } else if (currentPage.includes('career')) {
        document.querySelector('.nav-menu a[href="careers.html"]')?.classList.add('active');
    }

    // Also check for section IDs in the URL for sub-navigation
    const hash = window.location.hash;
    if (hash) {
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            if (link.getAttribute('href').includes(hash)) {
                link.classList.add('active');
                // Also highlight the parent dropdown
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const parentLink = parentDropdown.querySelector('a');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
            }
        });
    }
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Basic form validation
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Form submitted successfully!');
            form.reset();
        });
    });
});