// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const themeToggle = document.getElementById('theme-toggle');
    console.log('Theme toggle button:', themeToggle);
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    const themeIcon = themeToggle.querySelector('i');
    console.log('Theme icon:', themeIcon);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Saved theme:', savedTheme);
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Toggle theme function
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', currentTheme);
        
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('New theme:', newTheme);
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        console.log('Theme updated to:', newTheme);
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create email body
        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
        
        // Open default email client
        window.location.href = `mailto:saikrishnareddy434@gmail.com?subject=Portfolio Contact Form&body=${emailBody}`;
        
        // Show success message
        alert('Thank you for your message! Your email client will open to send the message.');
        
        // Reset form
        contactForm.reset();
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const originalText = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent = originalText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
});

// Wave Animation
document.addEventListener('DOMContentLoaded', function() {
    const letters = document.querySelectorAll('.wave-letter');
    letters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });
});

// Running Dog Animation
const runningDog = document.querySelector('.running-dog');
let isRunning = false;
let lastScrollY = window.scrollY;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
    
    clearTimeout(scrollTimeout);
    
    if (!isRunning) {
        isRunning = true;
        runningDog.style.display = 'block';
        
        // Set initial position based on scroll direction
        if (scrollDirection > 0) {
            runningDog.style.left = '-100px';
            runningDog.style.transform = 'translateX(100vw)';
        } else {
            runningDog.style.left = '100vw';
            runningDog.style.transform = 'translateX(-100vw)';
        }
        
        scrollTimeout = setTimeout(() => {
            runningDog.style.display = 'none';
            isRunning = false;
        }, 2000);
    }
    
    lastScrollY = currentScrollY;
});

// Experience Seal Animation
const experienceSeal = document.querySelector('.experience-seal');
const heroSection = document.querySelector('.hero');

if (experienceSeal && heroSection) {
    let isDragging = false;
    let startX, startY, currentX = -30, currentY = -30;

    experienceSeal.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        experienceSeal.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        
        experienceSeal.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        experienceSeal.classList.remove('dragging');
        
        // Animate back to original position
        const startTime = performance.now();
        const duration = 500;
        const startX = currentX;
        const startY = currentY;

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const newX = startX + (-30 - startX) * easeProgress;
            const newY = startY + (-30 - startY) * easeProgress;
            
            experienceSeal.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${1 + (0.05 * (1 - progress))})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentX = -30;
                currentY = -30;
                experienceSeal.style.transform = 'translate3d(-30px, -30px, 0) scale(1)';
            }
        }

        requestAnimationFrame(animate);
    });
} 