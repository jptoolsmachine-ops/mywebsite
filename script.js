// ==================== MOBILE MENU TOGGLE ==================== 

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
        
        // Add active class to clicked link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ==================== SCROLL TO TOP ==================== 

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== ACTIVE NAV LINK ON SCROLL ==================== 

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    document.querySelectorAll('.address-card').forEach(card => {
        observer.observe(card);
    });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Counter animation for stats
    animateCounters();
});

// ==================== COUNTER ANIMATION FOR STATISTICS ==================== 

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const finalNumber = parseInt(numberElement.textContent);
                let currentNumber = 0;
                
                const increment = Math.ceil(finalNumber / 30);
                
                const interval = setInterval(() => {
                    currentNumber += increment;
                    
                    if (currentNumber >= finalNumber) {
                        numberElement.textContent = finalNumber + (numberElement.textContent.includes('+') ? '+' : '');
                        clearInterval(interval);
                        counterObserver.unobserve(numberElement);
                    } else {
                        numberElement.textContent = currentNumber;
                    }
                }, 30);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => counterObserver.observe(number));
}

// ==================== SMOOTH SCROLL FOR NAVIGATION LINKS ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== HAMBURGER MENU ANIMATION ==================== 

const hamburger = document.getElementById('hamburger');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// ==================== RIPPLE EFFECT ON BUTTONS ==================== 

document.querySelectorAll('.cta-button, .product-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== HEADER SHADOW ON SCROLL ==================== 

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    }
    
    lastScrollTop = window.pageYOffset <= 0 ? 0 : window.pageYOffset;
});

// ==================== PRODUCT INFO MODAL (OPTIONAL) ==================== 

document.querySelectorAll('.product-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('h3').textContent;
        const productDescription = productCard.querySelector('.product-description').textContent;
        const productSpecs = Array.from(productCard.querySelectorAll('.product-specs li'))
            .map(li => li.textContent)
            .join('\n');
        
        // Create a simple alert with product details
        console.log(`
            Product: ${productTitle}
            Description: ${productDescription}
            Specifications:
            ${productSpecs}
            
            For more information, please contact us at:
            Phone: 7016522044
            Email: info@jptools.co.in
        `);
        
        // You can replace this with a proper modal if needed
        alert(`${productTitle}\n\nFor detailed information and pricing, please contact us at 7016522044 or info@jptools.co.in`);
    });
});

// ==================== FORM VALIDATION (IF CONTACT FORM ADDED) ==================== 

function validateForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!formData.name || formData.name.trim().length < 2) {
        return 'Please enter a valid name';
    }
    
    if (!emailRegex.test(formData.email)) {
        return 'Please enter a valid email address';
    }
    
    if (!phoneRegex.test(formData.phone)) {
        return 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    
    return null;
}

// ==================== PRINT FRIENDLY STYLES ==================== 

window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = '#fff';
    document.querySelectorAll('.header').forEach(el => el.style.display = 'none');
});

// ==================== PAGE LOAD ANIMATIONS ==================== 

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add staggered animation to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 100);
    });
});

// ==================== PREVENT SPAM CLICKS ==================== 

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== ACCESSIBILITY: KEYBOARD NAVIGATION ==================== 

document.addEventListener('keydown', (e) => {
    // Close menu on ESC key
    if (e.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }
    
    // Skip to main content on Alt+M
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        document.getElementById('about').focus();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== PERFORMANCE: LAZY LOADING IMAGES ==================== 

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ==================== UTILITY: SCROLL TO SECTION ==================== 

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ==================== CONSOLE LOGGING (FOR DEBUGGING) ==================== 

console.log('%c JP Tools And Machine Website Loaded', 
    'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%c Contact: 7016522044 | Email: info@jptools.co.in', 
    'color: #0052CC; font-size: 12px;');
