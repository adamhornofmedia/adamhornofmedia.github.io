// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.width = '32px';
        cursorOutline.style.height = '32px';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.service-card, .portfolio-item, .stat');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Form handling with floating labels
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea, select');

    // Handle floating labels - prevent select from jumping
    formInputs.forEach(input => {
        // Set initial state
        if (input.value && input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }
        
        // On change
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', (e) => {
                if (e.target.value && e.target.value.trim() !== '') {
                    e.target.parentElement.classList.add('filled');
                } else {
                    e.target.parentElement.classList.remove('filled');
                }
            });
        } else {
            input.addEventListener('input', (e) => {
                if (e.target.value && e.target.value.trim() !== '') {
                    e.target.parentElement.classList.add('filled');
                } else {
                    e.target.parentElement.classList.remove('filled');
                }
            });
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            eventType: document.getElementById('event-type').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Děkujeme za vaši zprávu! Ozveme se vám co nejdříve.');
        
        // Reset form
        contactForm.reset();
        
        // Remove filled classes after reset
        formInputs.forEach(input => {
            input.parentElement.classList.remove('filled');
        });
    });
}

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.organic-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navigation background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(248, 246, 241, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.boxShadow = '0 2px 20px rgba(26, 58, 46, 0.1)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, var(--cream) 0%, transparent 100%)';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Portfolio item stagger animation
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add animation class when portfolio section is in view
const portfolioSection = document.querySelector('.portfolio');
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

portfolioItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

if (portfolioSection) {
    portfolioObserver.observe(portfolioSection);
}

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.5 });

const philosophySection = document.querySelector('.philosophy');
if (philosophySection) {
    statsObserver.observe(philosophySection);
}

function animateStats() {
    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const hasKg = text.includes('kg');
        
        let number = parseInt(text);
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let display = Math.floor(current).toString();
            if (hasPercent) display += '%';
            if (hasPlus) display += '+';
            if (hasKg) display += 'kg';
            
            stat.textContent = display;
        }, duration / steps);
    });
}

// Floating leaves animation trigger
const leaves = document.querySelectorAll('.floating-leaf');
leaves.forEach((leaf, index) => {
    leaf.style.animationDelay = `${index * 5}s`;
});

// Mobile menu toggle (if needed in future)
// Add mobile menu functionality here if you want to add a hamburger menu

console.log('🌿 Verdant Studio - Luxury Zero-Waste Events');
console.log('Website loaded successfully');