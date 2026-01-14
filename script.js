// Mobile menu toggle with animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
        }
    });
});

// Contact form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Success message
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}.`);
        contactForm.reset();
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.service-card, .gallery-item, .blog-card').forEach(el => {
    observer.observe(el);
});

// Load blog posts on main page
function loadBlog() {
    const blogGrid = document.getElementById('mainBlogGrid');
    if (!blogGrid) return;

    const posts = BlogManager.getPosts();
    blogGrid.innerHTML = '';

    posts.forEach(post => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <span class="blog-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

// Load gallery images on page load
function loadGallery() {
    const galleryGrid = document.getElementById('mainGalleryGrid');
    if (!galleryGrid) return;

    const images = GalleryManager.getImages();
    galleryGrid.innerHTML = '';

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
                <p>${image.location}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Load gallery and blog when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadBlog();
});

// Staff Panel button - redirect to login page
const staffPanelBtn = document.getElementById('staffPanelBtn');
if (staffPanelBtn) {
    staffPanelBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

// Admin button with password protection
const adminBtn = document.getElementById('adminBtn');
if (adminBtn) {
    adminBtn.addEventListener('click', () => {
        const password = prompt('Enter admin password:');
        if (password === 'storm2026') {
            alert('Admin access granted!\n\nAdmin panel would load here.');
        } else if (password !== null) {
            alert('Incorrect password. Access denied.');
        }
    });
}

// Join a Chase button popup
const joinChaseBtn = document.getElementById('joinChaseBtn');
if (joinChaseBtn) {
    joinChaseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userConfirm = confirm('Apply here to join a storm chase!\n\nClick OK to open the application form.');
        if (userConfirm) {
            window.open('https://forms.gle/SgEcVXZeyCjtZ8Wq7', '_blank');
        }
    });
}
